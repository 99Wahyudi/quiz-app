import React, { useEffect, useState } from 'react'
import Nav from './Nav'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function QuizResult() {
    const [result, setResult] = useState([])
    useEffect(() => {
        axios.get('http://localhost:4000/api/result').then(response => {
            setResult(response.data)
        })
    }, [])

    function deleteResult(id){
        axios.delete('http://localhost:4000/api/result/'+id).then(response => {
            const { data: listResult } = response
            setResult(listResult)
        })
    }
    return (
        <div className='mx-auto lg:w-6/12 w-10/12'>
            <Nav />
            <div className='mt-4 px-8 py-4 shadow-xl rounded-md '>
                <div className='grid grid-cols-3 font-semibold mb-3'>
                    <div>Name</div>
                    <div>Score</div>
                    <div>Option</div>
                </div>
                {result.map((r,index) => {
                    return (
                        <div key={index} className='grid grid-cols-3 my-2'>
                            <div>{r.user}</div>
                            <div>{r.score}</div>
                            <div className='flex gap-2'>
                                <Link to={'/admin/quiz-result/'+r._id} className='text-blue-500'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </Link>
                                
                                <button onClick={()=>deleteResult(r._id)} className='text-red-500'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
