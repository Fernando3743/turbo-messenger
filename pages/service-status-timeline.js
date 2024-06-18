import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ServiceStatusTimeline() {
  const [statuses, setStatuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { serviceId } = router.query; // Get the service ID from the URL query

  useEffect(() => {
    if (!serviceId) return;

    const fetchStatuses = async () => {
      try {
        const response = await fetch(`/api/estado_servicio/${serviceId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch statuses');
        }
        const data = await response.json();
        setStatuses(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatuses();
  }, [serviceId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Timeline de Estado del Servicio</h1>
        {statuses.length === 0 ? (
          <p className="text-center text-gray-600">No hay estados disponibles para este servicio.</p>
        ) : (
          <ul className="timeline">
            {statuses.map((status) => (
              <li key={status.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
                <p><strong>Estado:</strong> {status.estado}</p>
                <p><strong>Fecha y Hora:</strong> {new Date(status.fecha_hora).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
