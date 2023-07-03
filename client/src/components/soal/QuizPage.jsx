import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../contexts/userContext';
import { Navigate } from 'react-router-dom';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [selesai, setSelesai] = useState(false)

  const {user, setUser} = useContext(UserContext)

  useEffect(() => {
    // Mengambil daftar soal dari backend saat komponen dimuat
    axios.get('http://localhost:4000/api/questions')
      .then(response => {
        const initialUserAnswers = {};
        response.data.forEach(question => {
          initialUserAnswers[question._id] = '';
        });
        setUserAnswers(initialUserAnswers);
        setQuestions(response.data);
      })
      .catch(error => {
        console.error('Gagal mengambil daftar soal:', error);
      });
  }, []);

  const handleAnswerSelect = (answer) => {
    const updatedUserAnswers = {
      ...userAnswers,
      [questions[currentQuestionIndex]._id]: answer,
    };
    setUserAnswers(updatedUserAnswers);

  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(prevIndex => prevIndex - 1);
  };

  const handleNextQuestion = () => {
    // Cek apakah jawaban yang dipilih benar
    const currentQuestion = questions[currentQuestionIndex];
    const correctAnswer = currentQuestion.correctAnswer;
    const userAnswer = userAnswers[currentQuestion._id];

    

    // Pindah ke pertanyaan berikutnya jika tersedia
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleSelesai = async() =>{
    axios.post('http://localhost:4000/api/quizSubmit', {userAnswers, questions, user}).then((response)=>{
      setCurrentQuestionIndex(0)
      setUserAnswers('')
      setUser('')
      const {data} = response
      alert("Quiz Selesai. Score Anda : "+data.score)
      setSelesai(true)
    }).catch((err)=>{
      console.error(err)
    })
  }

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  if (selesai){
    return <Navigate to={'/'}/>
  }

  if (user === ''){
    return <Navigate to={'/'}/>
  }

  const currentQuestion = questions[currentQuestionIndex];
  const options = currentQuestion.options.map((option, index) => (
    <div key={index}>
      <label>
        <input
          type="radio"
          value={option}
          checked={userAnswers[currentQuestion._id] === option}
          onChange={() => handleAnswerSelect(option)}
        /> 
        {option}
      </label>
    </div>
  ));

  return (
    <div className='container grid grid-cols-12 gap-4 mt-20 '>
      <div className='lg:col-start-4 md:col-start-3 col-start-2 lg:col-end-10 md:col-end-11 col-end-12 py-10 rounded-lg shadow-xl hover:shadow-red-400/50 transition duration-200'>
        <h2 className='text-4xl mb-5 font-bold font-sans text-center'>Soal {currentQuestionIndex + 1}</h2>
        <h3 className='text-xl mb-2 font-sans text-center'>{currentQuestion.question}</h3>
        <div className='flex justify-center gap-8'>
          {options}
        </div>
        <div className='flex justify-center gap-5 mt-5'>
          <button disabled={currentQuestionIndex === 0} className='primary px-3 py-1 rounded-full hover:shadow-md' onClick={handlePreviousQuestion}>
            Sebelumnya
          </button>
          {currentQuestionIndex === questions.length - 1 ? 
            <button onClick={handleSelesai} className='primary px-7 py-1 rounded-full hover:shadow-md'>
              Selesai
            </button>
          : 
            <button onClick={handleNextQuestion} className='primary px-3 py-1 rounded-full hover:shadow-md'>
              Selanjutnya
            </button>
          }
          
        </div>
      </div>     
    </div>
  );
};

export default QuizPage;
