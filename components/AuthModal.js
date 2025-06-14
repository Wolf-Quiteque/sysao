'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import axios from 'axios';

export default function AuthModal({ onClose, plan }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobilePhone: '',
    password: ''
  });
  const [isLogin, setIsLogin] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/signup', formData);
      await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      });
      onClose();
      toast.success('Cadastro realizado com sucesso!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Erro no cadastro');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {isLogin ? 'Login' : 'Cadastrar-se'}
        </h2>
        {!isLogin && (
          <p className="mb-4 text-sm text-gray-600">
            Para adquirir o plano {plan?.name}, complete seu cadastro
          </p>
        )}
        <form onSubmit={isLogin ? handleSubmit : handleSignUp}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Nome Completo</label>
                <input
                  name="name"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Telefone</label>
                <input
                  name="mobilePhone"
                  type="tel"
                  className="w-full px-3 py-2 border rounded"
                  value={formData.mobilePhone}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              name="email"
              type="email"
              className="w-full px-3 py-2 border rounded"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Senha</label>
            <input
              name="password"
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            {isLogin ? 'Entrar' : 'Cadastrar e Continuar'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 hover:underline"
          >
            {isLogin ? 'Criar nova conta' : 'Já tem conta? Entrar'}
          </button>
        </div>
      </div>
    </div>
  );
}
