// Importa las librerías necesarias para interactuar con la base de datos

import client from "../../../postgres/db";


// Handler de la ruta API
export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { codigoServicio, estado, fechaHora, codigoMensajero } = req.body;

    console.log("REQUEST BODY: ",req.body)

    try {
      // Insertar el estado del servicio en la tabla estado_servicio
      const result = await client.query(
        'INSERT INTO estado_servicio (codigo_servicio, estado, fecha_hora, mensajero) VALUES ($1, $2, $3, $4) RETURNING *',
        [codigoServicio, estado, fechaHora, codigoMensajero]
      );

      // Envía una respuesta de éxito con los datos insertados
      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Error al insertar estado:', error);
      res.status(500).json({ error: 'Error al insertar estado del servicio' });
    }
  } else {
    // Método no permitido
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

