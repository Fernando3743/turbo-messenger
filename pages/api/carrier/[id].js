import client from '../../../postgres/db';

export default async (req, res) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const result = await client.query('SELECT * FROM mensajero WHERE id = $1', [id]);
        if (result.rows.length === 0) {
          res.status(404).json({ error: 'Mensajero no encontrado' });
        } else {
          res.status(200).json(result.rows[0]);
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al obtener el mensajero' });
      }
      break;
    case 'PUT':
      try {
        const { identificacion, nombre, direccion, email, telefono_contacto } = req.body;
        const result = await client.query(
          'UPDATE mensajero SET identificacion = $1, nombre = $2, direccion = $3, email = $4, telefono_contacto = $5 WHERE id = $6 RETURNING *',
          [identificacion, nombre, direccion, email, telefono_contacto, id]
        );
        if (result.rows.length === 0) {
          res.status(404).json({ error: 'Mensajero no encontrado' });
        } else {
          res.status(200).json(result.rows[0]);
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el mensajero' });
      }
      break;
    case 'DELETE':
      try {
        const result = await client.query('DELETE FROM mensajero WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
          res.status(404).json({ error: 'Mensajero no encontrado' });
        } else {
          res.status(200).json({ message: 'Mensajero eliminado correctamente' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el mensajero' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Método ${method} no permitido`);
      break;
  }
};
