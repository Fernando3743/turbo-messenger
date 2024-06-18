import client from '../../../postgres/db'

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const result = await client.query('SELECT * FROM cliente');
        res.status(200).json(result.rows);
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes' });
      }
      break;
    case 'POST':
      try {
        const { identificacion, nombre, direccion, ciudad, email, telefono } = req.body;
        console.log("BODY: ",req.body)
        const result = await client.query(
          'INSERT INTO cliente (identificacion, nombre, direccion, ciudad, email, telefono_contacto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
          [identificacion, nombre, direccion, ciudad, email, telefono]
        );
        res.status(201).json(result.rows[0]);
      } catch (error) {
        res.status(500).json({ error: 'Error al crear el cliente' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Método ${method} no permitido`);
      break;
  }
};