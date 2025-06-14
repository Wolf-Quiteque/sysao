import { NextResponse } from 'next/server';
import User from '../../../../models/User';
import dbConnect from '../../../../lib/dbConnect';

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, mobilePhone, password } = await req.json();
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 400 }
      );
    }

    const user = new User({ name, email, mobilePhone, password });
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Signup API Error:', error); // Log the actual error
    return NextResponse.json(
      { error: 'Erro no servidor' },
      { status: 500 }
    );
  }
}
