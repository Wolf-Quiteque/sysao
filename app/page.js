"use client";

import { ArrowUpRight, Check, CheckCircle, ChevronDown, Chrome, Lock, MessageSquare, PlayCircle, Smartphone, Zap } from 'lucide-react';
import Head from 'next/head';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import AuthModal from '../components/AuthModal';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { data: session } = useSession();

  const handlePlanSelect = (plan) => {
    if (!session) {
      setSelectedPlan(plan);
      setShowAuthModal(true);
      return;
    }
    // Processar pagamento...
  };
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Head>
        <title>SYS.AO - Sistema de Atendimento Online</title>
        <meta name="description" content="Transforme conversas em vendas com nossa extensão para WhatsApp" />
      </Head>

      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="https://sys.ao/wp-content/uploads/2025/01/entry-file-f56848e4a7fb69f0d2ee07763e78516c-1.png" 
              alt="SYS.AO Logo" 
              className="h-16 w-16 border-none ring-0"
            />
            <span className="ml-2 text-xl font-bold text-green-600">SYS.AO</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <a href="#inicio" className="text-green-600 font-medium">Início</a>
            <a href="#funcionalidades" className="hover:text-green-600 transition">Funcionalidades</a>
            <a href="#comousar" className="hover:text-green-600 transition">Como Usar</a>
            <a href="#precos" className="hover:text-green-600 transition">Preços</a>
            <a href="#faq" className="hover:text-green-600 transition">FAQ</a>
          </nav>
          
          {session ? (
  <div className="flex items-center space-x-4">
    <div 
      className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white font-bold cursor-pointer"
      onClick={() => router.push('/dashboard')}
    >
      {session.user?.name
        ? `${session.user.name.split(' ')[0][0]}${session.user.name.split(' ').length > 1 ? session.user.name.split(' ')[session.user.name.split(' ').length - 1][0] : ''}`.toUpperCase()
        : 'U'}
    </div>
    <button 
      onClick={() => signOut({ callbackUrl: '/' })}
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full flex items-center transition cursor-pointer text-sm sm:text-base"
    >
      Logout
    </button>
  </div>
) : (
  <button 
    className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full flex items-center transition cursor-pointer text-sm sm:text-base max-w-[180px] sm:max-w-none overflow-hidden whitespace-nowrap text-ellipsis"
  >
    <span className="truncate">Faça um teste grátis</span>
    <ArrowUpRight size={18} className="ml-1 shrink-0" />
  </button>
)}
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="py-16 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex space-x-4 mb-6">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">+ Controlo</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">+ Rapidez</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">+ Vendas</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              TRANSFORME CONVERSAS EM OPORTUNIDADS
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-6">
              FAÇA DO WHATSAPP O SEU MELHOR VENDEDOR
            </h2>
            
            <p className="text-lg mb-8 max-w-2xl">
              Milhões usam o WhatsApp, mas só quem conhece as ferramentas certas transforma 
              mensagens em negócios lucrativos.
            </p>
            
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium text-lg flex items-center transition animate-pulse">
              BAIXE GRATUITAMENTE
            </button>
          </div>
          
          <div>
            <img 
              src="https://sys.ao/wp-content/uploads/2025/01/Main-1024x853.png" 
              alt="SYS.AO Interface" 
              className="rounded-xl "
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="funcionalidades" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Descubra como o SYS.AO funciona na prática</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Nossa solução integra-se com o WhatsApp, adicionando funcionalidades avançadas e intuitivas 
              sem que precise de aprender a usar um novo sistema.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-green-50 p-8 rounded-xl">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Chrome className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Extensão do Chrome</h3>
              <p>
                O SYS.AO funciona como uma extensão integrada ao navegador Google Chrome, 
                conectando-se diretamente ao WhatsApp Web.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-green-50 p-8 rounded-xl">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Lock className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Segurança Blindada</h3>
              <p>
                Aprovado pelo Google e disponível em seu repositório oficial, cumprindo com os 
                mais altos padrões de segurança.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-green-50 p-8 rounded-xl">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <MessageSquare className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Suporte no WhatsApp</h3>
              <p>
                Atendimento próximo e eficiente via WhatsApp de segunda a sexta-feira, 
                das 08h às 17h.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-green-50 p-8 rounded-xl">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Zap className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Acesso Imediato</h3>
              <p>
                Após a compra, acesso imediato à ferramenta com licença de 12 meses 
                e todas as atualizações.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-green-50 p-8 rounded-xl">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Smartphone className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Prático e intuitivo</h3>
              <p>
                Experiência de utilização intuitiva e agradável, desenhada para alcançar 
                resultados superiores.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-green-50 p-8 rounded-xl">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <PlayCircle className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Treinamento em vídeo</h3>
              <p>
                Vídeos formativos para ensinar como utilizar as ferramentas para transformar 
                contactos em clientes fiéis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="precos" className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Planos</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Escolha o plano ideal para transformar seu WhatsApp em uma máquina de vendas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-green-100 p-6">
                <h3 className="text-2xl font-bold text-center">Licença GRATUITA</h3>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" size={18} />
                      <span>Envio de 5 mensagens em massa por dia</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">Grátis</div>
                  <p className="text-sm text-gray-500 mb-6">Licença gratuita para teste</p>
                  <button 
                    onClick={() => handlePlanSelect(plans[0])}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition cursor-pointer"
                  >
                    TESTAR agora
                  </button>
                </div>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border-2 border-green-500 transform scale-105">
              <div className="bg-green-500 p-6 text-white">
                <h3 className="text-2xl font-bold text-center">1 Licença Premium</h3>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" size={18} />
                      <span>Mensagens em massa sem limitações</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">129.900 Kzs</div>
                  <p className="text-sm text-gray-500 mb-6">Licença válida para 12 meses</p>
                  <button 
                    onClick={() => handlePlanSelect(plans[1])}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition cursor-pointer"
                  >
                    Comprar agora
                  </button>
                </div>
              </div>
            </div>

            {/* Premium x2 Plan */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-green-100 p-6">
                <h3 className="text-2xl font-bold text-center">2 Licenças Premium</h3>
              </div>
              <div className="p-8">
                <ul className="space-y-4 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" size={18} />
                      <span>Mensagens em massa sem limitações</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">249.900 Kzs</div>
                  <p className="text-sm text-gray-500 mb-6">Licenças válidas para 12 meses</p>
                  <button 
                    onClick={() => handlePlanSelect(plans[2])}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition cursor-pointer"
                  >
                    Comprar agora
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showAuthModal && (
        <AuthModal 
          onClose={() => setShowAuthModal(false)}
          plan={selectedPlan}
        />
      )}

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full mb-6">
              <CheckCircle className="mr-2" size={20} />
              <span>Perguntas Frequentes</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Precisa de mais informações?</h2>
            <p className="text-lg max-w-3xl mx-auto">
              Estamos disponíveis para esclarecer as suas dúvidas
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div key={index} className="border rounded-xl overflow-hidden">
                <button className="flex justify-between items-center w-full p-6 text-left font-medium">
                  <span>{item.question}</span>
                  <ChevronDown className="text-green-600" size={20} />
                </button>
                <div className="px-6 pb-6 pt-2 border-t">
                  <p>{item.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-medium flex items-center mx-auto transition">
              <MessageSquare className="mr-2" size={20} />
              Fale connosco pelo WhatsApp
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <img 
              src="https://sys.ao/wp-content/uploads/2025/01/Logo-Sys-1024x1024.png" 
              alt="SYS.AO Logo" 
              className="h-16 w-16"
            />
          </div>
          <p className="max-w-2xl mx-auto mb-6">
            O SYS.AO não é um produto associado ao WhatsApp INC, Facebook INC, META ou qualquer 
            uma de suas empresas e não possui qualquer relação comercial.
          </p>
          <p className="text-gray-400">
            Copyright © 2025. SYS.AO - Ao fazer o seu cadastro no nosso site, concorda com os nossos 
            Termos de Uso e Política de Privacidade.
          </p>
        </div>
      </footer>
    </div>
  );
}

const plans = [
  {
    name: "Licença GRATUITA",
    price: "Grátis",
    duration: "Licença gratuita para teste",
    features: ["Envio de 5 mensagens em massa por dia"]
  },
  {
    name: "1 Licença Premium",
    price: "129.900 Kzs",
    duration: "Licença válida para 12 meses",
    features: ["Mensagens em massa sem limitações"]
  },
  {
    name: "2 Licenças Premium",
    price: "249.900 Kzs",
    duration: "Licenças válidas para 12 meses",
    features: ["Mensagens em massa sem limitações"]
  }
];

const faqData = [
  {
    question: "O que é o SYS.AO e como funciona?",
    answer: "O SYS.AO é uma extensão para o navegador Chrome que adiciona funcionalidades ao WhatsApp Web. Não é necessário usar plataformas externas; todas as operações são realizadas diretamente no navegador."
  },
  {
    question: "Preciso pagar para testar a ferramenta?",
    answer: "Não, o SYS.AO oferece uma versão gratuita com funcionalidades limitadas para que possa explorar a ferramenta antes de optar pela versão premium."
  },
  {
    question: "É seguro utilizar o SYS.AO?",
    answer: "Sim, é completamente seguro. A extensão está disponível no repositório oficial do Google Chrome, cumprindo com todas as normas de privacidade e segurança exigidas pelo Google."
  },
  {
    question: "O SYS.AO armazena os meus dados?",
    answer: "Não, o SYS.AO não recolhe nem armazena informações. Todo o funcionamento acontece localmente no seu computador."
  },
  {
    question: "Como adquirir a versão completa?",
    answer: "Os pagamentos são feitos via Multicaixa Express ou Referência Bancária, garantindo 12 meses de uso com direito a actualizações futuras."
  },
  {
    question: "Como posso obter suporte?",
    answer: "Entre em contacto connosco por e-mail (suporte@sys.ao) ou através do WhatsApp para assistência personalizada."
  }
];
