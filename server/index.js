import cors from 'cors'
import express, { json, request, response } from 'express'

import { download } from './download.js'
import { transcribe } from './transcribe.js'
import { summarize } from "./summarize.js"
import { convert } from './convert.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/summary/:id', async (request, response) => {
  try{
    await download(request.params.id)
    const audioConvertido = await convert()
    const result = await transcribe(audioConvertido)
    
    return response.json({ result })
  
  } catch(error){
    console.log(error)
    return response.json({ error })
  }
})

app.post('/summary', async (request, response) => {
  try{
    const result = await summarize(request.body.text)
    
    return response.json({ result })
  
  }catch(error){
    console.log(error)
    return response.json({ error })
  }
})

app.listen(4444, console.log("Server is running at port 4444"))