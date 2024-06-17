import client from '../../../postgres/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id_usuario, origen, destino, ciudad, descripcion, tipoTransporte, numeroPaquetes, estado } = req.body;

    try {
      const queryText = `
        INSERT INTO servicio (
          id_usuario, origen, destino, ciudad, descripcion, tipo_transporte, numero_paquetes, estado
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;
      `;

      const values = [
        id_usuario, 
        origen, 
        destino, 
        ciudad, 
        descripcion, 
        tipoTransporte, 
        numeroPaquetes, 
        estado || 'pendiente' // Default to 'pendiente' if not provided
      ];

      console.log("queryText: ", queryText)
      console.log("Values: ", values)

      const result = await client.query(queryText, values);

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error inserting data into servicio table:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'GET') {
    try {
      const queryText = 'SELECT * FROM servicio;';
      const result = await client.query(queryText);

      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error retrieving data from servicio table:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST', 'GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}