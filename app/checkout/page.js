'use client';

import { Suspense } from 'react';
import CheckoutContent from '../../components/CheckoutContent';

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-lg text-gray-700">A carregar...</p>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<Loading />}>
      <CheckoutContent />
    </Suspense>
  );
}
