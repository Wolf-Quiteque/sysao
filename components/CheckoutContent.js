'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const planId = searchParams.get('planId');
  const amount = parseFloat(searchParams.get('amount'));
  const planName = searchParams.get('planName');

  const [loading, setLoading] = useState(false);
  const [paymentReference, setPaymentReference] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleGeneratePayment = async () => {
    if (!session?.user?.id) {
      setError('Utilizador não autenticado.');
      return;
    }

    setLoading(true);
    setError(null);
    setPaymentReference(null);

    try {
      // Generate a creative license code (example: random string)
      const license = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      const res = await fetch('/api/proxypay/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          userId: session.user.id,
          planId,
          license,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setPaymentReference(data.reference);
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Falha ao gerar referência de pagamento.');
      }
    } catch (err) {
      console.error('Error generating payment:', err);
      setError('Ocorreu um erro inesperado ao gerar o pagamento.');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg text-gray-700">A carregar...</p>
      </div>
    );
  }

  if (!planId || isNaN(amount) || !planName) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Erro: Plano não encontrado</h1>
        <p className="text-gray-700 mb-6">Por favor, selecione um plano válido no painel.</p>
        <button
          onClick={() => router.push('/dashboard')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg transition"
        >
          Voltar ao Painel
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Finalizar Compra</h1>

        {!paymentReference ? (
          <>
            <div className="mb-6 text-left">
              <p className="text-lg text-gray-700 mb-2">Você selecionou:</p>
              <p className="text-2xl font-semibold text-green-600">{planName}</p>
              <p className="text-xl text-gray-800 mt-2">Valor: <span className="font-bold">AOA {amount.toFixed(2)}</span></p>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Erro!</strong>
                <span className="block sm:inline"> {error}</span>
              </div>
            )}

            <button
              onClick={handleGeneratePayment}
              disabled={loading}
              className={`w-full px-6 py-3 rounded-full text-lg font-semibold transition ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  Gerando Referência...
                </div>
              ) : (
                'Gerar Referência de Pagamento'
              )}
            </button>
          </>
        ) : (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-green-700 mb-4">Referência Gerada com Sucesso!</h2>
            <p className="text-gray-700 mb-2">Por favor, use a seguinte referência para efetuar o pagamento:</p>
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6">
              <p className="text-4xl font-extrabold text-blue-800 tracking-wider">{paymentReference}</p>
            </div>
            <p className="text-gray-600 mb-4">
              O seu pagamento está <span className="font-bold text-yellow-700">Pendente</span>. Assim que o pagamento for confirmado, o seu plano será ativado.
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg transition"
            >
              Voltar ao Painel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
