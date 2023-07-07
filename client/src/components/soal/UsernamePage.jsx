import React, { useContext } from 'react'
import { UserContext } from '../../contexts/userContext'
import { Navigate } from 'react-router-dom';
import {useState} from 'react'

export default function UsernamePage() {
    const {user, setUser} = useContext(UserContext)
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = ()=>{
        setSubmitted(true)
    }

    if(submitted){
        return <Navigate to={'/quiz'}/>
    }
    return (
        <div className='lg:w-6/12 w-10/12 shadow-xl px-8 py-10 mx-auto mt-20 rounded-lg'>
            <h1 className='font-bold text-2xl mb-3'>Masukkan Nama</h1>
            <form onSubmit={handleSubmit}>
                <input type='text'required value={user} onChange={(e)=>setUser(e.target.value)}/>
                <button className='bg-slate-700 text-white px-3 py-1 rounded-full font-medium' type='submit'>Kerjakan Soal</button>
            </form>
        </div>
    )
}
