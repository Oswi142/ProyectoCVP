export const getQuestionsByTestName = async (testName: string) => {
    const response = await fetch(`http://localhost:3000/api/tests/${testName}/questions`);
    if (!response.ok) throw new Error('Error al cargar preguntas');
    return await response.json();
  };