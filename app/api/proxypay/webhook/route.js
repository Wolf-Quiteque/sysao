import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import Payment from '../../../../models/Payment';
import crypto from 'crypto';

export async function POST(req) {
  try {
    await dbConnect();

    const signature = req.headers.get('x-signature');
    const rawBody = await req.text(); // Get raw body for signature validation
    const payload = JSON.parse(rawBody);

    // Validate signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.PROXYPAY_API_KEY)
      .update(rawBody, 'utf8')
      .digest('hex');

    if (signature !== expectedSignature) {
      console.warn('Webhook signature mismatch:', { received: signature, expected: expectedSignature });
      return NextResponse.json({ message: 'Assinatura inválida' }, { status: 403 });
    }

    const { reference_id, amount, datetime, custom_fields } = payload;

    // Find the payment in our database
    const payment = await Payment.findOne({ referenceId: reference_id });

    if (!payment) {
      console.warn('Payment not found for reference ID:', reference_id);
      return NextResponse.json({ message: 'Pagamento não encontrado' }, { status: 404 });
    }

    // Update payment status
    payment.status = 'paid';
    payment.amount = amount; // Update amount in case of partial payment or discrepancy
    payment.updatedAt = new Date();
    await payment.save();

    // Optionally, update user's active plan status here
    // For example:
    // const user = await User.findById(payment.userId);
    // if (user) {
    //   user.hasActivePlan = true; // Or set specific plan details
    //   await user.save();
    // }

    console.log('Payment webhook processed successfully for reference:', reference_id);
    return NextResponse.json({ message: 'Pagamento processado com sucesso' }, { status: 200 });

  } catch (error) {
    console.error('Error processing ProxyPay webhook:', error);
    return NextResponse.json(
      { error: 'Falha ao processar webhook de pagamento' },
      { status: 500 }
    );
  }
}
