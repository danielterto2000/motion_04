
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Loader2, 
  CheckCircle, 
  Clock, 
  XCircle, 
  Copy, 
  Download,
  Smartphone,
  CreditCard,
  FileText,
  Building2,
  RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';

interface Payment {
  id: string;
  amount: number;
  status: string;
  paymentMethod: string;
  description: string;
  createdAt: string;
  expiresAt?: string;
  paidAt?: string;
  pixQrCode?: string;
  pixKey?: string;
  boletoUrl?: string;
  boletoBarcode?: string;
  dueDate?: string;
  bankData?: {
    bankName: string;
    bankCode: string;
    agency: string;
    account: string;
    holderName: string;
    holderDocument: string;
  };
  template?: {
    id: string;
    title: string;
    thumbnailUrl: string;
  };
}

const statusConfig = {
  PENDING: {
    label: 'Aguardando Pagamento',
    color: 'bg-yellow-100 text-yellow-800',
    icon: Clock,
  },
  PROCESSING: {
    label: 'Processando',
    color: 'bg-blue-100 text-blue-800',
    icon: Loader2,
  },
  COMPLETED: {
    label: 'Pago',
    color: 'bg-green-100 text-green-800',
    icon: CheckCircle,
  },
  FAILED: {
    label: 'Falhou',
    color: 'bg-red-100 text-red-800',
    icon: XCircle,
  },
  EXPIRED: {
    label: 'Expirado',
    color: 'bg-gray-100 text-gray-800',
    icon: XCircle,
  },
};

const methodIcons = {
  PIX: Smartphone,
  CREDIT_CARD: CreditCard,
  DEBIT_CARD: CreditCard,
  BOLETO: FileText,
  BANK_TRANSFER: Building2,
};

export default function PaymentPage({ params }: { params: { paymentId: string } }) {
  const router = useRouter();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    fetchPayment();
    
    // Verificar status a cada 30 segundos se pendente
    const interval = setInterval(() => {
      if (payment?.status === 'PENDING' || payment?.status === 'PROCESSING') {
        checkPaymentStatus();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [params.paymentId, payment?.status]);

  const fetchPayment = async () => {
    try {
      const response = await fetch(`/api/payments/${params.paymentId}`);
      if (response.ok) {
        const data = await response.json();
        setPayment(data.payment);
      } else {
        toast.error('Pagamento não encontrado');
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error fetching payment:', error);
      toast.error('Erro ao carregar pagamento');
    } finally {
      setLoading(false);
    }
  };

  const checkPaymentStatus = async () => {
    if (checking) return;
    
    setChecking(true);
    try {
      const response = await fetch(`/api/payments/${params.paymentId}/status`);
      if (response.ok) {
        const data = await response.json();
        if (data.status !== payment?.status) {
          setPayment(prev => prev ? { ...prev, status: data.status, paidAt: data.paidAt } : null);
          if (data.status === 'COMPLETED') {
            toast.success('Pagamento confirmado!');
          }
        }
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
    } finally {
      setChecking(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copiado para a área de transferência!');
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Pagamento não encontrado</h1>
          <Button onClick={() => router.push('/dashboard')}>
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const StatusIcon = statusConfig[payment.status as keyof typeof statusConfig]?.icon || Clock;
  const MethodIcon = methodIcons[payment.paymentMethod as keyof typeof methodIcons] || CreditCard;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Detalhes do Pagamento</h1>
            <p className="text-gray-600">ID: {payment.id}</p>
          </div>

          {/* Status Card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-gray-100">
                    <MethodIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{payment.description}</h3>
                    <p className="text-gray-600">{formatCurrency(payment.amount)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={statusConfig[payment.status as keyof typeof statusConfig]?.color}>
                    <StatusIcon className="h-4 w-4 mr-1" />
                    {statusConfig[payment.status as keyof typeof statusConfig]?.label}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatDate(payment.createdAt)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Specific Content */}
          {payment.paymentMethod === 'PIX' && payment.pixQrCode && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Pagamento via PIX</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={checkPaymentStatus}
                    disabled={checking}
                  >
                    {checking ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <RefreshCw className="h-4 w-4 mr-2" />
                    )}
                    Verificar Status
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Smartphone className="h-4 w-4" />
                  <AlertDescription>
                    Escaneie o QR Code com seu app bancário ou copie a chave PIX abaixo.
                    {payment.expiresAt && (
                      <span className="block mt-1 font-medium">
                        Expira em: {formatDate(payment.expiresAt)}
                      </span>
                    )}
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="inline-block p-4 bg-white rounded-lg border">
                      <QRCodeSVG value={payment.pixQrCode} size={200} />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">QR Code PIX</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Chave PIX:</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="flex-1 p-2 bg-gray-100 rounded text-sm">
                          {payment.pixKey}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(payment.pixKey!)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Código PIX Copia e Cola:</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <textarea
                          className="flex-1 p-2 bg-gray-100 rounded text-sm resize-none"
                          rows={3}
                          readOnly
                          value={payment.pixQrCode}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(payment.pixQrCode!)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {payment.paymentMethod === 'BOLETO' && payment.boletoUrl && (
            <Card>
              <CardHeader>
                <CardTitle>Boleto Bancário</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <FileText className="h-4 w-4" />
                  <AlertDescription>
                    Clique no botão abaixo para baixar seu boleto bancário.
                    {payment.dueDate && (
                      <span className="block mt-1 font-medium">
                        Vencimento: {formatDate(payment.dueDate)}
                      </span>
                    )}
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <Button asChild className="w-full">
                    <a href={payment.boletoUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4 mr-2" />
                      Baixar Boleto
                    </a>
                  </Button>

                  {payment.boletoBarcode && (
                    <div>
                      <Label className="text-sm font-medium">Código de Barras:</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="flex-1 p-2 bg-gray-100 rounded text-sm">
                          {payment.boletoBarcode}
                        </code>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(payment.boletoBarcode!)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {payment.paymentMethod === 'BANK_TRANSFER' && payment.bankData && (
            <Card>
              <CardHeader>
                <CardTitle>Transferência Bancária</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <Building2 className="h-4 w-4" />
                  <AlertDescription>
                    Faça a transferência para os dados bancários abaixo e envie o comprovante.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Banco:</Label>
                      <p className="text-sm">{payment.bankData.bankName} ({payment.bankData.bankCode})</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Agência:</Label>
                      <p className="text-sm">{payment.bankData.agency}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Conta:</Label>
                      <p className="text-sm">{payment.bankData.account}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-medium">Titular:</Label>
                      <p className="text-sm">{payment.bankData.holderName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">CPF:</Label>
                      <p className="text-sm">{payment.bankData.holderDocument}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Valor:</Label>
                      <p className="text-sm font-bold">{formatCurrency(payment.amount)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Template Info */}
          {payment.template && (
            <Card>
              <CardHeader>
                <CardTitle>Template Adquirido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-200">
                    {payment.template.thumbnailUrl && (
                      <Image
                        src={payment.template.thumbnailUrl}
                        alt={payment.template.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{payment.template.title}</h3>
                    {payment.status === 'COMPLETED' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => router.push('/dashboard')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Acessar Downloads
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex justify-center">
            <Button variant="outline" onClick={() => router.push('/dashboard')}>
              Voltar ao Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children, className, ...props }: any) {
  return (
    <label className={`block text-sm font-medium text-gray-700 ${className}`} {...props}>
      {children}
    </label>
  );
}
