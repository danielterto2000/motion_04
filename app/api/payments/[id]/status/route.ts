
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payment = await prisma.payment.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        status: true,
        paymentMethod: true,
        paidAt: true,
        expiresAt: true,
        amount: true,
        externalId: true,
      },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Verificar se o pagamento expirou
    if (payment.expiresAt && new Date() > payment.expiresAt && payment.status === 'PENDING') {
      await prisma.payment.update({
        where: { id: params.id },
        data: { status: 'EXPIRED' },
      });
      payment.status = 'EXPIRED';
    }

    // Simular consulta de status em APIs externas
    if (payment.status === 'PENDING' || payment.status === 'PROCESSING') {
      const updatedStatus = await checkExternalPaymentStatus(payment);
      if (updatedStatus && updatedStatus !== payment.status) {
        const updatedPayment = await prisma.payment.update({
          where: { id: params.id },
          data: {
            status: updatedStatus,
            ...(updatedStatus === 'COMPLETED' && { paidAt: new Date() }),
          },
        });
        payment.status = updatedPayment.status;
        payment.paidAt = updatedPayment.paidAt;
      }
    }

    return NextResponse.json({
      id: payment.id,
      status: payment.status,
      paidAt: payment.paidAt,
      expiresAt: payment.expiresAt,
    });

  } catch (error) {
    console.error('Error checking payment status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function checkExternalPaymentStatus(payment: any) {
  // Simular consulta de status em APIs externas
  // Em produção, aqui seria feita a consulta real nas APIs do Mercado Pago, BB, etc.
  
  const random = Math.random();
  
  // 10% de chance de pagamento ser aprovado (simulação)
  if (random < 0.1) {
    return 'COMPLETED';
  }
  
  // 5% de chance de pagamento falhar
  if (random < 0.15) {
    return 'FAILED';
  }
  
  // Manter status atual
  return payment.status;
}
