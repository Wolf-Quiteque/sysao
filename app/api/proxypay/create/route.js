import { NextResponse } from 'next/server';
import axios from 'axios';
import User from '../../../../models/User'; // Keep User import for now, might be needed for other things
import Payment from '../../../../models/Payment';
import dbConnect from '../../../../lib/dbConnect';

export async function POST(req) {
  const { amount, userId, planId, license } = await req.json();
  
  try {
    await dbConnect();
    
    // 1. Gerar um ID de referência único
    const referenceIdResponse = await axios.post(
      `${process.env.PROXYPAY_API_URL}/reference_ids`,
      {},
      {
        headers: {
          Authorization: `Token ${process.env.PROXYPAY_API_KEY}`,
          Accept: 'application/vnd.proxypay.v2+json',
        },
      }
    );
    const referenceId = referenceIdResponse.data;

    // 2. Criar ou atualizar a referência de pagamento com o ID gerado
    const expiryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 3 days from now
    await axios.put(
      `${process.env.PROXYPAY_API_URL}/references/${referenceId}`,
      {
        amount: amount.toFixed(2), // Ensure amount is a string with 2 decimal places
        end_datetime: expiryDate,
        custom_fields: { userId, planId, license } // Pass custom fields
      },
      {
        headers: {
          Authorization: `Token ${process.env.PROXYPAY_API_KEY}`,
          Accept: 'application/vnd.proxypay.v2+json',
          'Content-Type': 'application/json',
        },
      }
    );
    
    const response = { data: { reference: referenceId } }; // Mimic original response structure

    // Salvar pagamento na coleção de pagamentos
    await Payment.create({
      userId,
      referenceId: response.data.reference,
      amount: amount.toFixed(2),
      planId,
      license,
      status: 'pending', // Initial status
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
