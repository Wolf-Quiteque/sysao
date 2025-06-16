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
      router.push('/');
    } else if (status === 'authenticated') {
      fetchPlanStatus();
    }
  }, [status]);

  const fetchPlanStatus = async () => {
    try {
      setLoadingPlans(true);
      const res = await fetch('/api/user/plan-status');
      if (res.ok) {
        const data = await res.json();
        setHasActivePlan(data.hasActivePlan);
        setPendingPayments(data.pendingPayments || []);
      }
    } catch (error) {
      console.error('Erro ao buscar plano:', error);
    } finally {
      setLoadingPlans(false);
    }
  };

  const plans = [
    {
      id: 'free',
      name: 'Licença GRATUITA',
      price: 0,
      duration: 'Licença gratuita para teste',
      features: ['Envio de 5 mensagens em massa por dia'],
    },
    {
      id: 'premium_1',
      name: '1 Licença Premium',
      price: 129900,
      duration: 'Licença válida por 12 meses',
      features: ['Mensagens em massa sem limitações'],
    },
    {
      id: 'premium_2',
      name: '2 Licenças Premium',
      price: 249900,
      duration: 'Licenças válidas por 12 meses',
      features: ['Mensagens em massa sem limitações'],
    }
  ];

  const handlePlanClick = (plan) => {
  router.push(`/checkout?planId=${plan.id}&amount=${plan.price}&planName=${encodeURIComponent(plan.name)}`);
};

  if (status === 'loading') {
    return <div className="min-h-screen flex justify-center items-center">A carregar...</div>;
  }

  if (status === 'unauthenticated') return null;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-green-600">SYS.AO</div>
        <div className="flex items-center space-x-4">
          <span>{session?.user?.name || 'Utilizador'}</span>
          <button onClick={() => signOut({ callbackUrl: '/' })} className="bg-red-500 text-white px-4 py-2 rounded-full">Sair</button>
        </div>
      </nav>

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Escolha o seu Plano</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan.id} onClick={() => handlePlanClick(plan)} className="cursor-pointer p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-xl font-bold text-green-600">{plan.name}</h2>
              <p className="text-gray-800 text-2xl my-2">{plan.price === 0 ? 'Grátis' : `${plan.price.toLocaleString('pt-AO')} Kzs`}</p>
              <p className="text-gray-600">{plan.duration}</p>
              <ul className="mt-4 text-sm text-gray-700 list-disc ml-5">
                {plan.features.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
              <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-full">Comprar Agora</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}