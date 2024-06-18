import { useState } from 'react';

export default function OrderStatusForm() {
  const [codigoServicio, setCodigoServicio] = useState('');
  const [estado, setEstado] = useState('');
  const [fechaHora, setFechaHora] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/estado_servicio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          codigoServicio,
          estado,
          fechaHora,
        }),
      });
      
      const data = await response.json();
      console.log('Respuesta del servidor:', data);
    } catch (error) {
      console.error('Error al enviar estado:', error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Actualizar Estado del Pedido</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Código de Servicio:</label>
            <input
              type="number"
              value={codigoServicio}
              onChange={(e) => setCodigoServicio(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Estado:</label>
            <select
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Seleccionar Estado</option>
              <option value="pedido por entregar">Pedido por Entregar</option>
              <option value="pedido en camino">Pedido en Camino</option>
              <option value="pedido entregado">Pedido Entregado</option>
              <option value="pedido retrasado">Pedido Retrasado</option>
              <option value="pedido en espera">Pedido en Espera</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Fecha y Hora:</label>
            <input
              type="datetime-local"
              value={fechaHora}
              onChange={(e) => setFechaHora(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Actualizar Estado
          </button>
        </form>
      </div>
    </div>
  );
}