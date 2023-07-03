import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Nav from './Nav'
import axios from 'axios'

export default function ResultDetail() {
    const [resultDetail, setResultDetail] = useState([])
    const [user, setUser] = useState('')
    const [score, setScore] = useState(0)
    const {id} = useParams()
    useEffect(()=>{
        axios.get('http://localhost:4000/api/resultDetail/'+id).then(response=>{
            const { data: result } = response
            setUser(result[0].user)
            setScore(result[0].score)
            setResultDetail(result[0].quiz)
        })
    },[])
    console.log('p')

    if(resultDetail){
        return (
            <div className='mx-auto lg:w-6/12 w-10/12'>
                <Nav/>
                <p className='text-lg mt-4'>Nama : <span className='font-semibold'>{user}</span></p>
                <p className='text-lg'>Score : <span className='font-semibold'>{score}</span></p>
                {resultDetail.map(r=>{
                    const options = r.question.options
                    return(
                        <div className='p-4 shadow mb-4 mt-8'>
                            <p className='mb-6 text-center text-lg'>{r.question.question}</p>
                            <div className='flex justify-around'>
                                {options.map(option=>{
                                    return(
                                        <span className={option===r.question.correctAnswer?'px-2 py-1 rounded-md bg-green-300':''}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value={option}
                                                    checked={option === r.userAnswer}
                                                    readOnly
                                                />
                                                {option}
                                            </label>
                                        </span>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}
