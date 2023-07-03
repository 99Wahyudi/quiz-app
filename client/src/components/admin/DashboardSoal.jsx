import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'


export default function DashboardSoal() {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/api/questions').then(response => {
            const { data: listQuestion } = response
            setQuestions(listQuestion)
        })

    }, [])

    const deleteQuestion = (id)=>{
        axios.delete('http://localhost:4000/api/questions/'+id).then(response => {
            const { data: listQuestion } = response
            setQuestions(listQuestion)
        })
    }
    return (
        <div className=' mx-auto lg:w-6/12 w-10/12'>
            <Nav/>
            <h1 className='text-2xl font-semibold mt-4 mb-4'>List Soal</h1>
            <Link to={'/admin/add-soal'}>
                <button className='primary px-3 py-1 rounded-full'>Tambah Soal</button>
            </Link>
            {questions.map((question, index) => {
                return (
                    <div className='py-8 shadow-lg my-4 rounded-md relative' key={index}>
                        <p className='text-red-500 font-bold absolute right-4 top-6'>
                            <button onClick={()=>deleteQuestion(question._id)}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>

                        </p>
                        <p className='text-center mb-4 font-medium'>{question.question}</p>
                        <div className='flex justify-center gap-20'>
                            {question.options.map((option, index) => {
                                return (
                                    <label key={index}>
                                        <input
                                            type="radio"
                                            value={option}
                                            checked={option === question.correctAnswer}
                                            readOnly
                                        />
                                        {option}
                                    </label>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
