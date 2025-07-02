
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payment = await prisma.payment.findUnique({
      where: { id: params.id },
      include: {
        template: {
          select: {
            id: true,
            title: true,
            thumbnailUrl: true,
            price: true,
          },
        },
        transactions: {
          orderBy: { createdAt: 'desc' },
        },
        webhookLogs: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    // Verificar se o usuário tem acesso ao pagamento
    if (payment.userId !== session.user.id && session.user.userType !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({ payment });

  } catch (error) {
    console.error('Error fetching payment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || session.user.userType !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status, notes } = body;

    const payment = await prisma.payment.findUnique({
      where: { id: params.id },
    });

    if (!payment) {
      return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
    }

    const updatedPayment = await prisma.payment.update({
      where: { id: params.id },
      data: {
        status,
        updatedAt: new Date(),
        ...(status === 'COMPLETED' && !payment.paidAt && { paidAt: new Date() }),
      },
    });

    // Criar transação de atualização
    await prisma.transaction.create({
      data: {
        type: status === 'COMPLETED' ? 'PURCHASE' : 'REFUND',
        amount: payment.amount,
        description: `Status atualizado para ${status} - ${notes || 'Atualização manual'}`,
        paymentId: payment.id,
        userId: payment.userId,
      },
    });

    // Log da atividade
    await prisma.activityLog.create({
      data: {
        type: 'PAYMENT_RECEIVED',
        description: `Pagamento ${payment.id} atualizado para ${status}`,
        userId: session.user.id,
        metadata: {
          paymentId: payment.id,
          oldStatus: payment.status,
          newStatus: status,
          notes,
        },
      },
    });

    return NextResponse.json({ payment: updatedPayment });

  } catch (error) {
    console.error('Error updating payment:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
