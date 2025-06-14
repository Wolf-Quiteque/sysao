import { NextResponse } from 'next/server';
import axios from 'axios';
import User from '../../../../models/User';
import dbConnect from '../../../../lib/dbConnect';

export async function POST(req) {
  const { amount, userId, planId, license } = await req.json();
  
  try {
    await dbConnect();
    
    // Criar referência de pagamento
    const response = await axios.post(
      `${process.env.PROXYPAY_API_URL}/references`,
      {
        amount: amount * 100,
        expiry_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        custom_data: { userId, planId }
      },
      { headers: { Authorization: `Bearer ${process.env.PROXYPAY_API_KEY}` } }
    );

    // Salvar pagamento no usuário
    await User.findByIdAndUpdate(userId, {
      $push: {
        payments: {
          id: response.data.reference,
          license
        }
      }
    });

    return NextResponse.json({ 
      reference: response.data.reference,
      amount: amount,
      license
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Falha ao criar pagamento' },
      { status: 500 }
    );
  }
}
