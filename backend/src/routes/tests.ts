import { Request, Response, Router } from 'express';
import pool from '../config/db';

const router = Router();

router.get('/:testName/questions', async (req: Request<{ testName: string }>, res: Response):Promise<void> => {
  const { testName } = req.params;

  console.log('Petición recibida con testName:', testName);

  try {
    const testResult = await pool.query(
      'SELECT id FROM tests WHERE testname ILIKE $1',
      [testName]
    );

    if (testResult.rowCount === 0) {
        res.status(404).json({ error: 'Test no encontrado' });
        return;
      }

    const testId = testResult.rows[0].id;

    // Obtener todas las preguntas asociadas
    const questionsResult = await pool.query(
      'SELECT id, question FROM questions WHERE idtest = $1 ORDER BY id',
      [testId]
    );

    res.json(questionsResult.rows);
  } catch (error) {
    console.error('Error al obtener preguntas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
