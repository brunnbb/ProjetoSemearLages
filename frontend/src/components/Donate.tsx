import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { CreditCard, Smartphone, Building2, Heart } from 'lucide-react';
import { toast } from 'sonner';

export interface DonateInfo {
  pix: string;
  bankName: string;
  accountType: string;
  agency: string;
  account: string;
  cnpj: string;
}

export function Donate() {
  // Mock data - will be editable by admin
  const donateInfo: DonateInfo = {
    pix: '46076111000182',
    bankName: 'SICREDI',
    accountType: 'Conta Corrente',
    agency: '0268',
    account: '40570-7',
    cnpj: '46.076.111/0001-82',
  };

  const copyToClipboard = (text: string) => {
    // Try modern clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          toast.success('Chave PIX copiada com sucesso!');
        })
        .catch(() => {
          // Fallback method
          fallbackCopy(text);
        });
    } else {
      // Fallback method for older browsers or restricted contexts
      fallbackCopy(text);
    }
  };

  const fallbackCopy = (text: string) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      toast.success('Chave PIX copiada com sucesso!');
    } catch (err) {
      toast.error('Não foi possível copiar. Por favor, copie manualmente.');
    }
    document.body.removeChild(textArea);
  };

  return (
    <section id="doar" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-[#7cb342] font-bold">Faça uma Doação</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Ao contribuir com o Projeto Semear Lages, você não está apenas doando recursos, você está investindo no potencial de uma vida e em todas as outras que dela repercutem. Já pensou no impacto desta doação?
          </p>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Você pode colaborar doando ao projeto ou pagando diretamente ao parceiro.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* PIX */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#7cb342] rounded-full flex items-center justify-center">
                    <Smartphone className="text-white" size={24} />
                  </div>
                  <h3>PIX</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  A forma mais rápida e prática de doar
                </p>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-500 mb-1">Chave PIX (CNPJ)</p>
                  <p className="break-all">{donateInfo.pix}</p>
                </div>
                <Button 
                  onClick={() => copyToClipboard(donateInfo.pix)}
                  className="w-full bg-[#f4c430] hover:bg-[#e4b420] text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Copiar Chave PIX
                </Button>
              </CardContent>
            </Card>

            {/* Transferência Bancária */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#4a90e2] rounded-full flex items-center justify-center">
                    <Building2 className="text-white" size={24} />
                  </div>
                  <h3>Transferência</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Faça sua doação via transferência bancária
                </p>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">Banco</p>
                    <p>{donateInfo.bankName}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Agência</p>
                      <p>{donateInfo.agency}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-500">Conta</p>
                      <p>{donateInfo.account}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-500">CNPJ</p>
                    <p>{donateInfo.cnpj}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Impact Message */}
          <Card className="bg-[#e74c3c] text-white">
            <CardContent className="p-8">
              <Heart className="mx-auto mb-4" size={48} />
              <h3 className="text-center mb-4">O Impacto da sua Doação - Qualquer valor ajuda</h3>
              <p className="text-center mb-6 text-gray-100">
                Sua doação é o nosso solo fértil e essencial para mantermos a estrutura do projeto:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-3xl mb-2">R$ 35</p>
                  <p className="text-gray-200">Apadrinhamento de um aluno no Qualificar para Transformar</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-3xl mb-2">R$ 240</p>
                  <p className="text-gray-200">Pagar um curso de inglês básico ou intermediário para um aluno por mês</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-3xl mb-2">R$ 300</p>
                  <p className="text-gray-200">Ajuda a pagar um professor para as aulas de sábado</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <p className="text-3xl mb-2">R$ 1200</p>
                  <p className="text-gray-200">Ajuda a pagar o lanche de mais de 100 alunos em um sábado</p>
                </div>
              </div>
              <p className="text-center mt-6 text-gray-100">
                Junte-se a nós para expandir nossas sementes de educação e oportunidade.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}