import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Nav() {
    const {pathname} = useLocation()
    let subpage = pathname.split('/')?.[2]
    if(subpage === '' || subpage === undefined){
        subpage = 'questions'
    }
    function linkClasses(type = null){
        let classes = ' w-6/12 py-2 inline-block '
        if(subpage === type){
            classes += 'bg-slate-700 text-white'
        }

        return classes
    }
    return (
        <div className='lg:w-6/12 mx-auto shadow-xl rounded-full overflow-hidden text-center font-semibold mb-4 mt-8'>
            <div className='w-12/12'>
                <Link className={linkClasses('questions')} to={'/admin'}>List Soal</Link>
                <Link className={linkClasses('quiz-result')} to={'/admin/quiz-result'}>Quiz Result</Link>
            </div>
        </div>
    )
}
