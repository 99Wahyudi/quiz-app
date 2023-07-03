import {Route, Routes} from 'react-router-dom'
import Index from './components/home/Index';
import { useState } from 'react';
import AddSoal from './components/admin/AddSoal';
import QuizPage from './components/soal/QuizPage';
import DashboardSoal from './components/admin/DashboardSoal';
import UsernamePage from './components/soal/UsernamePage';
import { UserContextProvider } from './contexts/userContext';
import QuizResult from './components/admin/QuizResult';
import ResultDetail from './components/admin/ResultDetail';

function App() {
  
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<UsernamePage/>}/>
        <Route path='/quiz' element={<QuizPage/>}/>
        <Route path='/admin/' element={<DashboardSoal/>}/>
        <Route path='/admin/quiz-result' element={<QuizResult/>}/>
        <Route path='/admin/quiz-result/:id' element={<ResultDetail/>}/>
        <Route path='/admin/add-soal' element={<AddSoal/>}/>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
