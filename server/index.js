require('./utils/db')
const express = require('express')
const Question = require('./model/Question')
const Result = require('./model/Result')
const cors = require('cors')
const app = express()
const port = 4000

app.use(express.json())

app.use(cors());

app.get('/', (req, res) => res.send('Hello World!'))


app.post('/api/questions', async (req, res) => {
    try {
        const { question, options, correctAnswer } = req.body;

        // Validasi apakah jawaban yang benar termasuk dalam daftar pilihan jawaban
        if (!options.includes(correctAnswer)) {
            return res.status(400).json({ error: 'Jawaban yang benar harus termasuk dalam pilihan jawaban' });
        }

        const newQuestion = await Question.create({ question, options, correctAnswer });
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create question' });
    }
})


app.get('/api/questions', async (req,res)=>{
    res.json(await Question.find())
})


app.delete('/api/questions/:idQuestion', async (req,res)=>{
    const idQuestion = req.params.idQuestion
    await Question.findByIdAndDelete(idQuestion)
    res.json(await Question.find())
})


app.get('/api/result', async (req,res)=>{
    const quizResult = await Result.find()
    res.json(quizResult) 
})


app.get('/api/resultDetail/:id', async (req,res)=>{
    const id = req.params.id
    const detail = await Result.find({_id:id}).populate('quiz.question')
    res.json(detail)
})


app.delete('/api/result/:idResult', async (req,res)=>{
    const idResult = req.params.idResult
    await Result.findByIdAndDelete(idResult)
    res.json(await Result.find())
})


app.post('/api/quizSubmit', async (req,res)=>{
    try{
        const {userAnswers, questions, user} = req.body
        let quiz = []
        let nilai = 0
        questions.map((question, index)=>{
            quiz.push({question:question._id, userAnswer:userAnswers[question._id]})
            if(question.correctAnswer === userAnswers[question._id]){
                nilai+=1;
            }
        })
        nilai = nilai / questions.length * 100;
        console.log(userAnswers)

        const result = await Result.create({score:nilai, quiz:quiz, user})

        res.json(result)
    } catch(err){
        res.status(500).json({ error: 'Failed' });

    }
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))