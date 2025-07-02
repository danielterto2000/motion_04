
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function seedPayments() {
  console.log('🏦 Seeding payment system data...');

  try {
    // 1. Criar conta bancária principal
    const bankAccount = await prisma.bankAccount.upsert({
      where: { id: 'main-bank-account' },
      update: {},
      create: {
        id: 'main-bank-account',
        bankCode: '001',
        bankName: 'Banco do Brasil',
        agency: '1873',
        agencyDigit: '2',
        account: '23195',
        accountDigit: '9',
        accountType: 'checking',
        holderName: 'Marcos Antonio Magalhaes da Silva',
        holderDocument: '026.815.561-55',
        pixKey: '026.815.561-55',
        pixKeyType: 'cpf',
        isActive: true,
        isDefault: true,
      },
    });

    console.log('✅ Bank account created:', bankAccount.id);

    // 2. Configurações dos gateways de pagamento
    const gatewayConfigs = [
      {
        provider: 'mercadopago',
        isActive: true,
        isTestMode: true,
        config: {
          publicKey: 'TEST-your-public-key',
          accessToken: 'TEST-your-access-token',
          webhookSecret: 'your-webhook-secret',
          baseUrl: 'https://api.mercadopago.com',
        },
        fixedFee: 0.39,
        percentageFee: 3.99,
      },
      {
        provider: 'bb',
        isActive: true,
        isTestMode: true,
        config: {
          clientId: 'your-bb-client-id',
          clientSecret: 'your-bb-client-secret',
          certificatePath: '/path/to/certificate.p12',
          certificatePassword: 'certificate-password',
          baseUrl: 'https://api.hm.bb.com.br',
          pixDict: 'your-pix-dict',
        },
        fixedFee: 0.0,
        percentageFee: 0.0,
      },
      {
        provider: 'pix',
        isActive: true,
        isTestMode: true,
        config: {
          pixKey: '026.815.561-55',
          pixKeyType: 'cpf',
          merchantName: 'Marcos Antonio Magalhaes da Silva',
          merchantCity: 'SAO PAULO',
          txId: 'BM',
        },
        fixedFee: 0.0,
        percentageFee: 0.0,
      },
    ];

    for (const config of gatewayConfigs) {
      await prisma.paymentGatewayConfig.upsert({
        where: { provider: config.provider },
        update: config,
        create: config,
      });
      console.log(`✅ Gateway config created: ${config.provider}`);
    }

    // 3. Configurações do sistema para pagamentos
    const systemSettings = [
      {
        key: 'payment_enabled',
        value: 'true',
        description: 'Enable payment processing',
        type: 'boolean',
        isPublic: true,
      },
      {
        key: 'pix_enabled',
        value: 'true',
        description: 'Enable PIX payments',
        type: 'boolean',
        isPublic: true,
      },
      {
        key: 'credit_card_enabled',
        value: 'true',
        description: 'Enable credit card payments',
        type: 'boolean',
        isPublic: true,
      },
      {
        key: 'boleto_enabled',
        value: 'true',
        description: 'Enable boleto payments',
        type: 'boolean',
        isPublic: true,
      },
      {
        key: 'bank_transfer_enabled',
        value: 'true',
        description: 'Enable bank transfer payments',
        type: 'boolean',
        isPublic: true,
      },
      {
        key: 'minimum_payment_amount',
        value: '10.00',
        description: 'Minimum payment amount in BRL',
        type: 'number',
        isPublic: true,
      },
      {
        key: 'maximum_payment_amount',
        value: '10000.00',
        description: 'Maximum payment amount in BRL',
        type: 'number',
        isPublic: true,
      },
      {
        key: 'pix_expiration_minutes',
        value: '30',
        description: 'PIX payment expiration time in minutes',
        type: 'number',
        isPublic: false,
      },
      {
        key: 'boleto_expiration_days',
        value: '3',
        description: 'Boleto expiration time in days',
        type: 'number',
        isPublic: false,
      },
      {
        key: 'webhook_retry_attempts',
        value: '3',
        description: 'Number of webhook retry attempts',
        type: 'number',
        isPublic: false,
      },
      {
        key: 'notification_email_enabled',
        value: 'true',
        description: 'Enable email notifications for payments',
        type: 'boolean',
        isPublic: false,
      },
      {
        key: 'notification_sms_enabled',
        value: 'false',
        description: 'Enable SMS notifications for payments',
        type: 'boolean',
        isPublic: false,
      },
      {
        key: 'auto_reconciliation_enabled',
        value: 'true',
        description: 'Enable automatic bank reconciliation',
        type: 'boolean',
        isPublic: false,
      },
    ];

    for (const setting of systemSettings) {
      await prisma.systemSettings.upsert({
        where: { key: setting.key },
        update: setting,
        create: setting,
      });
    }

    console.log('✅ System settings created');

    // 4. Criar alguns pagamentos de exemplo
    const user = await prisma.user.findFirst({
      where: { email: 'admin@broadcastmotion.com' },
    });

    if (user) {
      const template = await prisma.template.findFirst();
      
      if (template) {
        const samplePayments = [
          {
            amount: 99.90,
            grossAmount: 99.90,
            feeAmount: 3.99,
            netAmount: 95.91,
            status: 'COMPLETED',
            paymentMethod: 'PIX',
            description: `Compra do template: ${template.title}`,
            payerDocument: '123.456.789-00',
            payerName: 'João Silva',
            payerEmail: 'joao@example.com',
            paidAt: new Date(),
            userId: user.id,
            templateId: template.id,
          },
          {
            amount: 149.90,
            grossAmount: 149.90,
            feeAmount: 5.98,
            netAmount: 143.92,
            status: 'PENDING',
            paymentMethod: 'BOLETO',
            description: `Compra do template: ${template.title}`,
            payerDocument: '987.654.321-00',
            payerName: 'Maria Santos',
            payerEmail: 'maria@example.com',
            dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 dias
            userId: user.id,
            templateId: template.id,
          },
        ];

        for (const payment of samplePayments) {
          await prisma.payment.create({
            data: payment,
          });
        }

        console.log('✅ Sample payments created');
      }
    }

    // 5. Criar relatório financeiro inicial
    const today = new Date();
    const currentMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}`;
    
    await prisma.financialReport.upsert({
      where: {
        type_period: {
          type: 'monthly',
          period: currentMonth,
        },
      },
      update: {},
      create: {
        type: 'monthly',
        period: currentMonth,
        totalRevenue: 249.80,
        totalFees: 9.97,
        netRevenue: 239.83,
        totalPayments: 2,
        successfulPayments: 1,
        failedPayments: 0,
        pixRevenue: 99.90,
        cardRevenue: 0,
        boletoRevenue: 149.90,
        transferRevenue: 0,
      },
    });

    console.log('✅ Financial report created');

    console.log('🎉 Payment system seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding payment data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedPayments()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
