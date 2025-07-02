
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const createPaymentSchema = z.object({
  templateId: z.string(),
  paymentMethod: z.enum(['PIX', 'CREDIT_CARD', 'DEBIT_CARD', 'BOLETO', 'BANK_TRANSFER']),
  amount: z.number().min(10).max(10000),
  payerName: z.string().min(2),
  payerEmail: z.string().email(),
  payerDocument: z.string().min(11),
  payerPhone: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = createPaymentSchema.parse(body);

    // Verificar se o template existe
    const template = await prisma.template.findUnique({
      where: { id: validatedData.templateId },
    });

    if (!template) {
      return NextResponse.json({ error: 'Template not found' }, { status: 404 });
    }

    // Calcular taxas baseado no método de pagamento
    const { feeAmount, netAmount } = calculateFees(validatedData.amount, validatedData.paymentMethod);

    // Criar o pagamento
    const payment = await prisma.payment.create({
      data: {
        amount: validatedData.amount,
        grossAmount: validatedData.amount,
        feeAmount,
        netAmount,
        paymentMethod: validatedData.paymentMethod,
        description: `Compra do template: ${template.title}`,
        payerName: validatedData.payerName,
        payerEmail: validatedData.payerEmail,
        payerDocument: validatedData.payerDocument,
        userId: session.user.id,
        templateId: validatedData.templateId,
        expiresAt: getExpirationDate(validatedData.paymentMethod),
      },
    });

    // Processar pagamento baseado no método
    let paymentData;
    switch (validatedData.paymentMethod) {
      case 'PIX':
        paymentData = await processPixPayment(payment);
        break;
      case 'CREDIT_CARD':
      case 'DEBIT_CARD':
        paymentData = await processMercadoPagoPayment(payment, validatedData.paymentMethod);
        break;
      case 'BOLETO':
        paymentData = await processBoletoPayment(payment);
        break;
      case 'BANK_TRANSFER':
        paymentData = await processBankTransferPayment(payment);
        break;
      default:
        throw new Error('Invalid payment method');
    }

    // Atualizar pagamento com dados do processamento
    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: paymentData.updateData,
    });

    // Criar transação
    await prisma.transaction.create({
      data: {
        type: 'PURCHASE',
        amount: validatedData.amount,
        description: `Pagamento criado - ${validatedData.paymentMethod}`,
        paymentId: payment.id,
        userId: session.user.id,
      },
    });

    return NextResponse.json({
      payment: updatedPayment,
      ...paymentData.responseData,
    });

  } catch (error) {
    console.error('Error creating payment:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const method = searchParams.get('method');

    const where: any = {
      userId: session.user.id,
    };

    if (status) where.status = status;
    if (method) where.paymentMethod = method;

    const [payments, total] = await Promise.all([
      prisma.payment.findMany({
        where,
        include: {
          template: {
            select: {
              id: true,
              title: true,
              thumbnailUrl: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.payment.count({ where }),
    ]);

    return NextResponse.json({
      payments,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Funções auxiliares
function calculateFees(amount: number, method: string) {
  let feeAmount = 0;
  
  switch (method) {
    case 'CREDIT_CARD':
    case 'DEBIT_CARD':
      feeAmount = amount * 0.0399 + 0.39; // 3.99% + R$ 0,39
      break;
    case 'PIX':
      feeAmount = 0; // PIX gratuito
      break;
    case 'BOLETO':
      feeAmount = 2.99; // Taxa fixa
      break;
    case 'BANK_TRANSFER':
      feeAmount = 0; // Transferência gratuita
      break;
  }

  return {
    feeAmount: Math.round(feeAmount * 100) / 100,
    netAmount: Math.round((amount - feeAmount) * 100) / 100,
  };
}

function getExpirationDate(method: string): Date {
  const now = new Date();
  switch (method) {
    case 'PIX':
      return new Date(now.getTime() + 30 * 60 * 1000); // 30 minutos
    case 'BOLETO':
      return new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000); // 3 dias
    default:
      return new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 horas
  }
}

async function processPixPayment(payment: any) {
  // Simular geração de PIX
  const pixData = generatePixQRCode({
    pixKey: '026.815.561-55',
    merchantName: 'Marcos Antonio Magalhaes da Silva',
    merchantCity: 'SAO PAULO',
    amount: payment.amount,
    txId: `BM${payment.id.slice(-8)}`,
  });

  return {
    updateData: {
      status: 'PENDING' as const,
      pixKey: '026.815.561-55',
      pixQrCode: pixData.qrCode,
      pixQrCodeBase64: pixData.qrCodeBase64,
      externalId: pixData.txId,
    },
    responseData: {
      pixQrCode: pixData.qrCode,
      pixQrCodeBase64: pixData.qrCodeBase64,
      pixKey: '026.815.561-55',
      expiresAt: payment.expiresAt,
    },
  };
}

async function processMercadoPagoPayment(payment: any, method: string) {
  // Simular integração com Mercado Pago
  const mpPaymentId = `MP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  return {
    updateData: {
      status: 'PROCESSING' as const,
      externalId: mpPaymentId,
    },
    responseData: {
      mercadoPagoId: mpPaymentId,
      redirectUrl: `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${mpPaymentId}`,
    },
  };
}

async function processBoletoPayment(payment: any) {
  // Simular geração de boleto
  const boletoId = `BB_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const barcode = generateBoletoBarcode(payment.amount, payment.dueDate);
  
  return {
    updateData: {
      status: 'PENDING' as const,
      externalId: boletoId,
      boletoBarcode: barcode,
      boletoUrl: `https://api.bb.com.br/boleto/${boletoId}.pdf`,
    },
    responseData: {
      boletoUrl: `https://api.bb.com.br/boleto/${boletoId}.pdf`,
      boletoBarcode: barcode,
      dueDate: payment.dueDate,
    },
  };
}

async function processBankTransferPayment(payment: any) {
  return {
    updateData: {
      status: 'PENDING' as const,
    },
    responseData: {
      bankData: {
        bankName: 'Banco do Brasil',
        bankCode: '001',
        agency: '1873-2',
        account: '23195-9',
        holderName: 'Marcos Antonio Magalhaes da Silva',
        holderDocument: '026.815.561-55',
      },
    },
  };
}

function generatePixQRCode(data: any) {
  // Simular geração de QR Code PIX
  const qrCode = `00020126580014br.gov.bcb.pix0136${data.pixKey}0208${data.txId}5204000053039865802BR5925${data.merchantName}6009${data.merchantCity}62070503***6304`;
  const qrCodeBase64 = Buffer.from(`QR_CODE_${data.txId}`).toString('base64');
  
  return {
    qrCode,
    qrCodeBase64,
    txId: data.txId,
  };
}

function generateBoletoBarcode(amount: number, dueDate: Date) {
  // Simular geração de código de barras do boleto
  const amountStr = Math.round(amount * 100).toString().padStart(10, '0');
  const dueDateStr = Math.floor(dueDate.getTime() / 1000).toString();
  return `00190000090${amountStr}${dueDateStr}`;
}
