import { useEffect, useState } from 'react';

export default function ReadClients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/cliente');
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        } else {
          console.error('Error al obtener los clientes');
        }
      } catch (error) {
        console.error('Error inesperado:', error);
      }
    };

    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/cliente/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setClients(clients.filter(client => client.id !== id));
        console.log('Cliente eliminado');
      } else {
        console.error('Error al eliminar el cliente');
      }
    } catch (error) {
      console.error('Error inesperado:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Lista de Clientes</h1>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Identificación</th>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Dirección</th>
              <th className="px-4 py-2">Ciudad</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td className="border px-4 py-2">{client.identificacion}</td>
                <td className="border px-4 py-2">{client.nombre}</td>
                <td className="border px-4 py-2">{client.direccion}</td>
                <td className="border px-4 py-2">{client.ciudad}</td>
                <td className="border px-4 py-2">{client.email}</td>
                <td className="border px-4 py-2">{client.telefono}</td>
                <td className="border px-4 py-2">
                  <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-200 mr-2" onClick={() => handleEdit(client)}>Editar</button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200" onClick={() => handleDelete(client.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const handleEdit = (client) => {
    // Handle edit logic here
  };
}
