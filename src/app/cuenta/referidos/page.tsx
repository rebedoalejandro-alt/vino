'use client';

import React, { useState } from 'react';
import {
  Users,
  Copy,
  Check,
  Mail,
  MessageCircle,
  Gift,
  TrendingUp,
} from 'lucide-react';

export default function ReferidosPage() {
  const [copied, setCopied] = useState(false);
  const referralCode = 'CDV-XXXX5K9P';

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stats = [
    {
      label: 'Amigos invitados',
      value: '3',
      icon: Users,
    },
    {
      label: 'Crédito acumulado',
      value: '30€',
      icon: Gift,
    },
    {
      label: 'Compras completadas',
      value: '2',
      icon: TrendingUp,
    },
  ];

  const shareLinks = [
    {
      label: 'Facebook',
      icon: null,
      iconText: 'f',
      color: 'bg-blue-500 hover:bg-blue-600',
    },
    {
      label: 'Email',
      icon: Mail,
      color: 'bg-red-500 hover:bg-red-600',
    },
    {
      label: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
    },
  ];

  const referrals = [
    {
      id: '1',
      name: 'Carlos López',
      email: 'carlos@example.com',
      status: 'Compra completada',
      date: '15 de marzo, 2024',
      reward: '10€',
    },
    {
      id: '2',
      name: 'María Fernández',
      email: 'maria@example.com',
      status: 'Pendiente de compra',
      date: '10 de marzo, 2024',
      reward: '-',
    },
    {
      id: '3',
      name: 'Pedro Sánchez',
      email: 'pedro@example.com',
      status: 'Compra completada',
      date: '5 de marzo, 2024',
      reward: '10€',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Programa de referidos</h1>
          <p className="text-gray-600">
            Invita a tus amigos y ambos recibiréis 10€ en crédito.
          </p>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg shadow-md p-8 mb-8 border border-yellow-200">
          <div className="mb-6">
            <p className="text-gray-700 text-sm font-semibold mb-3">TU CÓDIGO DE REFERIDO</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-white border-2 border-yellow-500 rounded-lg px-6 py-4">
                <p className="text-2xl font-bold text-gray-900 font-mono tracking-wider">
                  {referralCode}
                </p>
              </div>
              <button
                onClick={handleCopyCode}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-4 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-5 w-5" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-5 w-5" />
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {shareLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.label}
                  className={`${link.color} text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2`}
                >
                  {Icon ? (
                    <Icon className="h-5 w-5" />
                  ) : (
                    <span className="h-5 w-5 flex items-center justify-center text-sm font-bold">{link.iconText}</span>
                  )}
                  Compartir por {link.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <Icon className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            );
          })}
        </div>

        <section className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Cómo funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-yellow-100 text-yellow-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Comparte tu código</h3>
              <p className="text-sm text-gray-600">
                Envía tu código personal a tus amigos a través de redes sociales,
                email o WhatsApp.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 text-yellow-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Tu amigo compra</h3>
              <p className="text-sm text-gray-600">
                Tu amigo usa tu código durante el checkout y realiza una compra
                de mínimo 30€.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 text-yellow-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ambos ganáis 10€</h3>
              <p className="text-sm text-gray-600">
                Una vez confirmada la compra, ambos recibís 10€ de crédito en
                vuestra cuenta.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold">Mis referidos</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
                    Nombre
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
                    Estado
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
                    Fecha
                  </th>
                  <th className="px-8 py-4 text-left text-sm font-semibold text-gray-900">
                    Recompensa
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {referrals.map((referral) => (
                  <tr key={referral.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-4">
                      <span className="font-semibold text-gray-900">
                        {referral.name}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-gray-600">{referral.email}</td>
                    <td className="px-8 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          referral.status === 'Compra completada'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {referral.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-gray-600">{referral.date}</td>
                    <td className="px-8 py-4">
                      <span className="font-semibold text-gray-900">
                        {referral.reward}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
