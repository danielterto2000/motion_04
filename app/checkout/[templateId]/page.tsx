
'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CreditCard, Smartphone, FileText, Building2, Shield, Lock } from 'lucide-react';
import { toast } from 'sonner';

interface Template {
  id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  category: string;
  software: string[];
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: any;
  description: string;
  fee: string;
  processingTime: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'PIX',
    name: 'PIX',
    icon: Smartphone,
    description: 'Pagamento instantâneo via PIX',
    fee: 'Grátis',
    processingTime: 'Imediato',
  },
  {
    id: 'CREDIT_CARD',
    name: 'Cartão de Crédito',
    icon: CreditCard,
    description: 'Visa, Mastercard, Elo',
    fee: '3,99% + R$ 0,39',
    processingTime: '1-2 dias úteis',
  },
  {
    id: 'BOLETO',
    name: 'Boleto Bancário',
    icon: FileText,
    description: 'Pagamento via boleto',
    fee: 'R$ 2,99',
    processingTime: '1-3 dias úteis',
  },
  {
    id: 'BANK_TRANSFER',
    name: 'Transferência Bancária',
    icon: Building2,
    description: 'TED/DOC para nossa conta',
    fee: 'Grátis',
    processingTime: '1-2 dias úteis',
  },
];

export default function CheckoutPage({ params }: { params: { templateId: string } }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('PIX');
  const [formData, setFormData] = useState({
    payerName: '',
    payerEmail: '',
    payerDocument: '',
    payerPhone: '',
  });

  useEffect(() => {
    fetchTemplate();
  }, [params.templateId]);

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        payerName: session.user.name || '',
        payerEmail: session.user.email || '',
      }));
    }
  }, [session]);

  const fetchTemplate = async () => {
    try {
      const response = await fetch(`/api/templates/${params.templateId}`);
      if (response.ok) {
        const data = await response.json();
        setTemplate(data.template);
      } else {
        toast.error('Template não encontrado');
        router.push('/marketplace');
      }
    } catch (error) {
      console.error('Error fetching template:', error);
      toast.error('Erro ao carregar template');
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!template) return 0;
    
    let fee = 0;
    switch (selectedMethod) {
      case 'CREDIT_CARD':
        fee = template.price * 0.0399 + 0.39;
        break;
      case 'BOLETO':
        fee = 2.99;
        break;
      default:
        fee = 0;
    }
    
    return template.price + fee;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session) {
      toast.error('Você precisa estar logado para fazer uma compra');
      router.push('/auth/signin');
      return;
    }

    if (!formData.payerName || !formData.payerEmail || !formData.payerDocument) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    setProcessing(true);

    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          templateId: params.templateId,
          paymentMethod: selectedMethod,
          amount: calculateTotal(),
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Pagamento criado com sucesso!');
        router.push(`/payment/${data.payment.id}`);
      } else {
        toast.error(data.error || 'Erro ao processar pagamento');
      }
    } catch (error) {
      console.error('Error creating payment:', error);
      toast.error('Erro ao processar pagamento');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Template não encontrado</h1>
          <Button onClick={() => router.push('/marketplace')}>
            Voltar ao Marketplace
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Informações do Produto */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Resumo do Pedido
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-200">
                    {template.thumbnailUrl && (
                      <Image
                        src={template.thumbnailUrl}
                        alt={template.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{template.title}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {template.description}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary">{template.category}</Badge>
                      {template.software.slice(0, 2).map((software) => (
                        <Badge key={software} variant="outline">
                          {software}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Valor do template:</span>
                    <span>R$ {template.price.toFixed(2)}</span>
                  </div>
                  {selectedMethod === 'CREDIT_CARD' && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Taxa do cartão:</span>
                      <span>R$ {(template.price * 0.0399 + 0.39).toFixed(2)}</span>
                    </div>
                  )}
                  {selectedMethod === 'BOLETO' && (
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Taxa do boleto:</span>
                      <span>R$ 2,99</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>R$ {calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações Legais */}
            <Alert>
              <Lock className="h-4 w-4" />
              <AlertDescription className="text-sm">
                <strong>Segurança e Conformidade:</strong><br />
                • Seus dados são protegidos com criptografia SSL<br />
                • Processamento seguro via gateways certificados<br />
                • Política de reembolso de 7 dias<br />
                • Suporte técnico especializado<br />
                • Conformidade com LGPD e regulamentações bancárias
              </AlertDescription>
            </Alert>
          </div>

          {/* Formulário de Pagamento */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados do Comprador</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="payerName">Nome Completo *</Label>
                      <Input
                        id="payerName"
                        value={formData.payerName}
                        onChange={(e) => setFormData(prev => ({ ...prev, payerName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="payerEmail">E-mail *</Label>
                      <Input
                        id="payerEmail"
                        type="email"
                        value={formData.payerEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, payerEmail: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="payerDocument">CPF/CNPJ *</Label>
                      <Input
                        id="payerDocument"
                        value={formData.payerDocument}
                        onChange={(e) => setFormData(prev => ({ ...prev, payerDocument: e.target.value }))}
                        placeholder="000.000.000-00"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="payerPhone">Telefone</Label>
                      <Input
                        id="payerPhone"
                        value={formData.payerPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, payerPhone: e.target.value }))}
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Método de Pagamento</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod}>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value={method.id} id={method.id} />
                        <div className="flex items-center gap-3 flex-1">
                          <method.icon className="h-6 w-6 text-gray-600" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <Label htmlFor={method.id} className="font-medium cursor-pointer">
                                {method.name}
                              </Label>
                              <div className="text-right text-sm">
                                <div className="text-green-600 font-medium">{method.fee}</div>
                                <div className="text-gray-500">{method.processingTime}</div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            <Button 
              onClick={handleSubmit}
              disabled={processing}
              className="w-full h-12 text-lg"
              size="lg"
            >
              {processing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processando...
                </>
              ) : (
                `Finalizar Compra - R$ ${calculateTotal().toFixed(2)}`
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              Ao finalizar a compra, você concorda com nossos{' '}
              <a href="/termos" className="text-blue-600 hover:underline">Termos de Uso</a>{' '}
              e{' '}
              <a href="/privacidade" className="text-blue-600 hover:underline">Política de Privacidade</a>.
              O processamento é realizado de forma segura e seus dados são protegidos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
