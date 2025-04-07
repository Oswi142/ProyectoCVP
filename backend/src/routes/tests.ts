import { Request, Response, Router } from 'express';
import pool from '../config/db';

const router = Router();

router.get('/:testName/questions', async (req: Request<{ testName: string }>, res: Response): Promise<void> => {
  const { testName } = req.params;

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

    const questionsResult = await pool.query(
      'SELECT id, question FROM questions WHERE idtest = $1 ORDER BY id',
      [testId]
    );

    const questions = questionsResult.rows;

    // Obtener las respuestas posibles para las preguntas
    const questionIds = questions.map((q) => q.id);
    const answersResult = await pool.query(
      'SELECT id, id_question, answer FROM answers WHERE id_question = ANY($1)',
      [questionIds]
    );

    const answersByQuestion: Record<number, { id: number; answer: string }[]> = {};

    for (const answer of answersResult.rows) {
      if (!answersByQuestion[answer.id_question]) {
        answersByQuestion[answer.id_question] = [];
      }
      answersByQuestion[answer.id_question].push({
        id: answer.id,
        answer: answer.answer
      });
    }

    const questionsWithAnswers = questions.map((q) => ({
      ...q,
      answers: answersByQuestion[q.id] || []
    }));

    res.json(questionsWithAnswers);
  } catch (error) {
    console.error('Error al obtener preguntas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;
