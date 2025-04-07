import React, { useEffect, useState } from 'react';
import { getQuestionsByTestName } from '../../services/testService';

interface Answer {
  id: number;
  answer: string;
}

interface Question {
  id: number;
  question: string;
  answers?: Answer[];
}

const Entrevista: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const steps = [
    'Datos personales',
    'Grupo familiar',
    'Escolaridad',
    'Elección vocacional',
    'Factores de influencia',
    'Ficha de Situacion vocacional',
    'Necesitas la siguiente información',
    'Tienes las siguientes dificultades'
  ];

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

  const goNext = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const goBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const groupedQuestions: Record<string, Question[]> = {
    'Datos personales': questions.slice(0, 8),
    'Grupo familiar': questions.slice(8, 16),
    'Escolaridad': questions.slice(16, 35),
    'Elección vocacional': questions.slice(35, 49),
    'Factores de influencia': questions.slice(49, 61),
    'Ficha de Situacion vocacional': questions.slice(61,79),
    'Necesitas la siguiente información': questions.slice(79, 84),
    'Tienes las siguientes dificultades': questions.slice(84, 91),
  };

  if (loading) return <p>Cargando preguntas...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Entrevista – {steps[step]}</h2>

      <form>
        {groupedQuestions[steps[step]]?.map((q) => {
          const needsThreeFields =
            (q.question.includes('1º') && q.question.includes('2º') && q.question.includes('3º')) ||
            q.question.toLowerCase().includes('3 respuestas') ||
            q.question.toLowerCase().includes('tres respuestas');

          return (
            <div key={q.id} style={{ marginBottom: '1.5rem' }}>
              <label>{q.question}</label>
              <br />

              {q.answers && q.answers.length > 0 ? (
                <div style={{ display: 'flex', gap: '1rem', marginTop: '5px' }}>
                  {q.answers.map((a) => (
                    <label key={a.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={a.answer}
                      />
                      {a.answer}
                    </label>
                  ))}
                </div>
              ) : needsThreeFields ? (
                <>
                  <textarea placeholder="Respuesta 1" rows={2} style={{ width: '100%', marginBottom: '5px' }} />
                  <textarea placeholder="Respuesta 2" rows={2} style={{ width: '100%', marginBottom: '5px' }} />
                  <textarea placeholder="Respuesta 3" rows={2} style={{ width: '100%' }} />
                </>
              ) : (
                <textarea rows={3} style={{ width: '100%' }} />
              )}
            </div>
          );
        })}
      </form>

      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={goBack} disabled={step === 0}>← Anterior</button>
        <button onClick={goNext} disabled={step === steps.length - 1}>Siguiente →</button>
      </div>
    </div>
  );
};

export default Entrevista;
