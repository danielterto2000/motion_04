
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

export function formatCPF(cpf: string): string {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

export function formatPhone(phone: string): string {
  return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}

export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, '');
  
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cpf.charAt(10))) return false;

  return true;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function calculatePaymentFees(amount: number, method: string): { feeAmount: number; netAmount: number } {
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

export function getPaymentExpirationDate(method: string): Date {
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

export function generatePixQRCode(data: {
  pixKey: string;
  merchantName: string;
  merchantCity: string;
  amount: number;
  txId: string;
}): { qrCode: string; qrCodeBase64: string; txId: string } {
  // Simular geração de QR Code PIX
  const qrCode = `00020126580014br.gov.bcb.pix0136${data.pixKey}0208${data.txId}5204000053039865802BR5925${data.merchantName}6009${data.merchantCity}62070503***6304`;
  const qrCodeBase64 = Buffer.from(`QR_CODE_${data.txId}`).toString('base64');
  
  return {
    qrCode,
    qrCodeBase64,
    txId: data.txId,
  };
}

export function generateBoletoBarcode(amount: number, dueDate: Date): string {
  // Simular geração de código de barras do boleto
  const amountStr = Math.round(amount * 100).toString().padStart(10, '0');
  const dueDateStr = Math.floor(dueDate.getTime() / 1000).toString();
  return `00190000090${amountStr}${dueDateStr}`;
}

export const PAYMENT_STATUS_LABELS = {
  PENDING: 'Aguardando Pagamento',
  PROCESSING: 'Processando',
  COMPLETED: 'Pago',
  FAILED: 'Falhou',
  CANCELLED: 'Cancelado',
  EXPIRED: 'Expirado',
  REFUNDED: 'Reembolsado',
  CHARGEBACK: 'Chargeback',
};

export const PAYMENT_METHOD_LABELS = {
  PIX: 'PIX',
  CREDIT_CARD: 'Cartão de Crédito',
  DEBIT_CARD: 'Cartão de Débito',
  BOLETO: 'Boleto Bancário',
  BANK_TRANSFER: 'Transferência Bancária',
  MERCADO_PAGO: 'Mercado Pago',
};
