'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [hasActivePlan, setHasActivePlan] = useState(false);
  const [pendingPayments, setPendingPayments] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/'); // Redirect to home if not authenticated
    } else if (status === 'authenticated') {
      fetchPlanStatus();
    }
  }, [status, router]);

  const fetchPlanStatus = async () => {
    try {
      setLoadingPlans(true);
      const res = await fetch('/api/user/plan-status');
      if (res.ok) {
        const data = await res.json();
        setHasActivePlan(data.hasActivePlan);
        setPendingPayments(data.pendingPayments);
      } else {
        console.error('Failed to fetch plan status');
      }
    } catch (error) {
      console.error('Error fetching plan status:', error);
    } finally {
      setLoadingPlans(false);
    }
  };

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

  const handlePlanClick = (plan) => {
    const amount = plan.price === "Grátis" ? 0 : parseFloat(plan.price.replace('.', '').replace(' Kzs', ''));
    router.push(`/checkout?planName=${plan.name}&amount=${amount}`);
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-700">A carregar painel...</p>
      </div>
    );
  }

  const userName = session?.user?.name || 'Utilizador';
  const companyName = "SYS.AO"; // Placeholder for company name

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-green-600">
          {companyName}
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-800 font-medium">{userName}</span>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition"
          >
            Terminar Sessão
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Bem-vindo ao seu Painel, {userName}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Dashboard Cards */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Minhas Subscrições</h2>
            <p className="text-gray-600">Visualize e gerencie seus planos ativos.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Estatísticas de Uso</h2>
            <p className="text-gray-600">Acompanhe seus limites de envio de mensagens.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Configurações da Conta</h2>
            <p className="text-gray-600">Atualize seu perfil e preferências.</p>
          </div>
        </div>

        {loadingPlans ? (
          <div className="text-center py-8">
            <p className="text-lg text-gray-700">A verificar o seu plano...</p>
            {/* Add a simple loader animation here */}
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mt-4"></div>
          </div>
        ) : (
          <>
            {!hasActivePlan && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Escolha o seu Plano</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {plans.map((plan) => (
                    <div
                      key={plan.name}
                      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                      onClick={() => handlePlanClick(plan)}
                    >
                      <h3 className="text-xl font-semibold text-green-600 mb-2">{plan.name}</h3>
                      <p className="text-2xl font-bold text-gray-800 mb-4">{plan.price}</p>
                      <p className="text-gray-600 mb-4">{plan.duration}</p>
                      <ul className="space-y-2 mb-4">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-gray-700">
                            <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition">
                        Comprar Agora
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {pendingPayments.length > 0 && (
              <div className="mt-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Pagamentos Pendentes</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pendingPayments.map((payment) => (
                    <div key={payment.referenceId} className="bg-yellow-100 p-6 rounded-lg shadow-md border border-yellow-300">
                      <h3 className="text-xl font-semibold text-yellow-800 mb-2">Referência de Pagamento</h3>
                      <p className="text-3xl font-bold text-yellow-900 mb-4">{payment.referenceId}</p>
                      <p className="text-gray-700">Plano: {payment.planId}</p>
                      <p className="text-gray-700">Valor: AOA {parseFloat(payment.amount).toFixed(2)}</p>
                      <p className="text-gray-700">Status: <span className="font-semibold text-yellow-700">Pendente</span></p>
                      <p className="text-sm text-gray-500 mt-2">Gerado em: {new Date(payment.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">Aguardando confirmação do pagamento.</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
