import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function SolicitaServicio() {
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoTransporte, setTipoTransporte] = useState('');
    const [numeroPaquetes, setNumeroPaquetes] = useState('');
    const [estado, setEstado] = useState('');

    const { data: session } = useSession();

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const requestBody = {
        id_usuario: session.user.id, // Replace with the actual user ID
        origen,
        destino,
        ciudad,
        descripcion,
        tipoTransporte,
        numeroPaquetes,
        estado: 'pendiente' // Default value, adjust if necessary
      };
    
      try {
        const response = await fetch('/api/services', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });
    
        if (response.ok) {
          const result = await response.json();
          console.log('Service request created:', result);
          // Handle success (e.g., show a success message, redirect, etc.)
        } else {
          console.error('Failed to create service request:', response.statusText);
          // Handle error (e.g., show an error message)
        }
      } catch (error) {
        console.error('Error creating service request:', error);
        // Handle error (e.g., show an error message)
      }
    };
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Solicitar Servicio</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Origen"
                            value={origen}
                            onChange={(e) => setOrigen(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Destino"
                            value={destino}
                            onChange={(e) => setDestino(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Ciudad"
                            value={ciudad}
                            onChange={(e) => setCiudad(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Descripción"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Tipo de Transporte"
                            value={tipoTransporte}
                            onChange={(e) => setTipoTransporte(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="number"
                            placeholder="Número de Paquetes"
                            value={numeroPaquetes}
                            onChange={(e) => setNumeroPaquetes(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            placeholder="Estado"
                            value={estado}
                            onChange={(e) => setEstado(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                        Solicitar
                    </button>
                </form>
            </div>
        </div>
    );
}