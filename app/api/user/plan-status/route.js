import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';
import Payment from '../../../../models/Payment';
import { authOptions } from '../../../../lib/auth';

export async function GET(req) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: 'Não autenticado' }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch user to check for active plan (assuming a field like 'hasActivePlan' or similar)
    // For now, we'll assume a user has an active plan if they have any 'paid' payments.
    // This logic might need refinement based on how plans are managed (e.g., expiry dates).
    const user = await User.findById(userId);
    
    // Find pending payments for the user
    const pendingPayments = await Payment.find({ userId, status: 'pending' }).sort({ createdAt: -1 });

    // Determine if user has an active plan based on paid payments
    const activePayments = await Payment.find({ userId, status: 'paid' });
    const hasActivePlan = activePayments.length > 0; // Simple check, refine as needed

    return NextResponse.json({
      hasActivePlan,
      pendingPayments: pendingPayments.map(p => ({
        referenceId: p.referenceId,
        amount: p.amount,
        planId: p.planId,
        status: p.status,
        createdAt: p.createdAt,
      })),
    });

  } catch (error) {
    console.error('Error fetching user plan status:', error);
    return NextResponse.json(
      { error: 'Falha ao buscar status do plano do utilizador' },
      { status: 500 }
    );
  }
}
