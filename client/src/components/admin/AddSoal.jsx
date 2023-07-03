import React, { useState } from 'react'
import axios from 'axios'
import { Link} from 'react-router-dom'

export default function AddSoal() {
  const [question, setQuestion] = useState('')
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleAddOption = () => {
    setOptions(prevOptions => [...prevOptions, '']);
  };

  const handleOptionChange = (index, value) => {
    setOptions(prevOptions => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = value;
      return updatedOptions;
    });
  };

  const handleCorrectAnswerChange = (e) => {
    setCorrectAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!options.includes(correctAnswer)) {
      console.error('Jawaban yang benar harus termasuk dalam pilihan jawaban');
      return;
    }

    const newQuestion = {
      question,
      options,
      correctAnswer: correctAnswer.toString()
    };

    axios.post('http://localhost:4000/api/questions', newQuestion)
      .then(response => {
        console.log('Pertanyaan berhasil dibuat:', response.data);
        // Reset form atau lakukan tindakan lainnya
        setQuestion('');
        setOptions([]);
        setCorrectAnswer('');
      })
      .catch(error => {
        console.error('Gagal membuat pertanyaan:', error);
        // Tampilkan pesan error atau lakukan tindakan lainnya
      });
  }

  return (
    <div className='container'>
      <form className='mt-8 p-4 mx-auto w-5/12 min-w-fit' onSubmit={handleSubmit}>
        <Link to={'/admin'}>
          <button className='primary px-3 py-1 rounded-full mb-5'>Kembali</button>
        </Link>
        <div>
          <h1 className='font-semibold text-xl'>Pertanyaan</h1>
          <input type="text" className='w-6/12' value={question} onChange={(e) => setQuestion(e.target.value)} />
        </div>

        <div className='mt-4'>
          <h1 className='font-semibold text-xl inline-block'>Pilihan Jawaban</h1>
          <button type="button" onClick={handleAddOption} className='ml-2 primary px-4 py-0 mt-2 rounded-full font-semibold'>+</button>
          {options.map((option, index) => (
            <div key={index}>
              <input type="text" value={option} onChange={(e) => handleOptionChange(index, e.target.value)} required />
            </div>
          ))}

        </div>

        <div className='my-4'>
          <h1 className='font-semibold text-xl'>Jawaban yang Benar</h1>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                className="default:ring-3"
                id={`correctAnswer-${index}`}
                name="correctAnswer"
                value={option}
                checked={correctAnswer === option}
                onChange={handleCorrectAnswerChange}
                required
              />
              <label htmlFor={option} className='ml-2'>{option}</label>
            </div>
          ))}
        </div>

        <button className='primary px-3 py-1 rounded-full' type='submit'>Submit</button>
      </form>
    </div>
  )
}
