import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const [searchParams] = useSearchParams();
  const [order, setOrder] = useState(null);
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    if (orderId) {
      // Update order status to completed
      supabase
        .from('orders')
        .update({ status: 'completed' })
        .eq('id', orderId)
        .then(() => {
          setOrder({ id: orderId });
        });
    }
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center p-8">
      <div className="max-w-md w-full text-center">
        <div className="bg-white/20 rounded-2xl p-8 border border-white/20 shadow-lg">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Betaling succesvol!</h2>
          <p className="text-white/80 mb-6">
            Je hebt succesvol betaald voor de Professional Plan. Je ontvangt binnenkort een bevestiging per email.
          </p>
          <button
            onClick={() => window.location.href = '/dashboard'}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold"
          >
            Ga naar Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
