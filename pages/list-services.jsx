import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ListServices() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('/api/services');
                if (!response.ok) {
                    throw new Error('Failed to fetch services');
                }
                const data = await response.json();
                setServices(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl">
                <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Lista de Servicios</h1>
                {services.length === 0 ? (
                    <p className="text-center text-gray-600">No hay servicios disponibles.</p>
                ) : (
                    <ul>
                        {services.map((service) => (
                            <li key={service.id} className="mb-4 p-4 border border-gray-300 rounded-lg">
                                <p><strong>Origen:</strong> {service.origen}</p>
                                <p><strong>Destino:</strong> {service.destino}</p>
                                <p><strong>Ciudad:</strong> {service.ciudad}</p>
                                <p><strong>Descripción:</strong> {service.descripcion}</p>
                                <p><strong>Tipo de Transporte:</strong> {service.tipo_transporte}</p>
                                <p><strong>Número de Paquetes:</strong> {service.numero_paquetes}</p>
                                <p><strong>Estado:</strong> {service.estado}</p>
                                <Link legacyBehavior href={`/service-status-timeline?serviceId=${service.codigo_servicio}`}>
                                    <a className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 text-center block">
                                        Trazabilidad
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}