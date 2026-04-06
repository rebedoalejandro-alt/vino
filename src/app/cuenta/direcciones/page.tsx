'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Edit2,
  Trash2,
  Plus,
  X,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export default function DireccionesPage() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Casa',
      firstName: 'Juan',
      lastName: 'García',
      street: 'Calle Principal 123, 3º Izquierda',
      city: 'Madrid',
      postalCode: '28001',
      country: 'España',
      phone: '+34 912 345 678',
      isDefault: true,
    },
    {
      id: '2',
      label: 'Trabajo',
      firstName: 'Juan',
      lastName: 'García',
      street: 'Avenida de la Paz 456',
      city: 'Madrid',
      postalCode: '28002',
      country: 'España',
      phone: '+34 912 345 678',
      isDefault: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    label: '',
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    postalCode: '',
    country: 'España',
    phone: '',
  });

  const handleEdit = (address: Address) => {
    setEditingId(address.id);
    setFormData({
      label: address.label,
      firstName: address.firstName,
      lastName: address.lastName,
      street: address.street,
      city: address.city,
      postalCode: address.postalCode,
      country: address.country,
      phone: address.phone,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  const handleSave = () => {
    if (editingId) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingId
            ? {
                ...addr,
                ...formData,
              }
            : addr
        )
      );
    } else {
      setAddresses([
        ...addresses,
        {
          id: Date.now().toString(),
          ...formData,
          isDefault: addresses.length === 0,
        },
      ]);
    }
    resetForm();
  };

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      label: '',
      firstName: '',
      lastName: '',
      street: '',
      city: '',
      postalCode: '',
      country: 'España',
      phone: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Mis direcciones</h1>
            <p className="text-gray-600">
              Gestiona tus direcciones de envío y facturación.
            </p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setShowForm(true);
            }}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Añadir dirección
          </Button>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {editingId ? 'Editar dirección' : 'Nueva dirección'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Etiqueta (Ej: Casa, Trabajo)
                </label>
                <input
                  type="text"
                  placeholder="Casa"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                  value={formData.label}
                  onChange={(e) =>
                    setFormData({ ...formData, label: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  País
                </label>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                >
                  <option>España</option>
                  <option>Portugal</option>
                  <option>Francia</option>
                  <option>Italia</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Nombre
                </label>
                <input
                  type="text"
                  placeholder="Juan"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Apellido
                </label>
                <input
                  type="text"
                  placeholder="García"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Dirección
                </label>
                <input
                  type="text"
                  placeholder="Calle Principal 123, 3º Izquierda"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                  value={formData.street}
                  onChange={(e) =>
                    setFormData({ ...formData, street: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Ciudad
                </label>
                <input
                  type="text"
                  placeholder="Madrid"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Código postal
                </label>
                <input
                  type="text"
                  placeholder="28001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData({ ...formData, postalCode: e.target.value })
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  placeholder="+34 912 345 678"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-yellow-500"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={handleSave}>
                <Check className="h-4 w-4 mr-2" />
                {editingId ? 'Guardar cambios' : 'Añadir dirección'}
              </Button>
              <Button variant="outline" onClick={resetForm}>
                Cancelar
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white rounded-lg shadow-md p-6 relative"
            >
              {address.isDefault && (
                <div className="absolute top-3 right-3">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                    Por defecto
                  </span>
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {address.label}
                </h3>
                <p className="text-sm text-gray-600">
                  {address.firstName} {address.lastName}
                </p>
              </div>

              <div className="space-y-2 mb-6 text-sm text-gray-700">
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                  <span>{address.street}</span>
                </p>
                <p>
                  {address.postalCode} {address.city}, {address.country}
                </p>
                <p>{address.phone}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(address)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Edit2 className="h-4 w-4" />
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="flex-1 px-4 py-2 border border-red-300 rounded-lg text-red-700 hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar
                </button>
              </div>

              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="w-full mt-3 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-lg hover:bg-yellow-100 transition-colors text-sm font-semibold"
                >
                  Establecer como predeterminada
                </button>
              )}
            </div>
          ))}
        </div>

        {addresses.length === 0 && !showForm && (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <MapPin className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes direcciones guardadas
            </h2>
            <p className="text-gray-600 mb-6">
              Añade tus direcciones para acelerar tus compras.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
