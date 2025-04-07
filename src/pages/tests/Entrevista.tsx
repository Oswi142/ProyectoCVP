import React, { useEffect, useState } from 'react';
import { getQuestionsByTestName } from '../../services/testService.ts';

interface Question {
  id: number;
  question: string;
}

const Entrevista: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getQuestionsByTestName('Entrevista');
        setQuestions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) return <p>Cargando preguntas...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Entrevista</h2>
      <form>
        {questions.map((q) => (
          <div key={q.id} style={{ marginBottom: '1rem' }}>
            <label>{q.question}</label>
            <br />
            <textarea rows={3} style={{ width: '100%' }} />
          </div>
        ))}
      </form>
    </div>
  );
};

export default Entrevista;
