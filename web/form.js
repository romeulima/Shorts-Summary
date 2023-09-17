import { server } from './server.js'

const form = document.querySelector('#form')
const input = document.querySelector('#url')
const paragrafo = document.querySelector('#content')

form.addEventListener("submit", async (event) => {
  paragrafo.classList.add("placeholder")
  event.preventDefault()
  const url = input.value

  if(!url.includes("shorts")){
    return paragrafo.textContent = "Esse vídeo não é um shorts"
  }
  const [_, params] = url.split("/shorts/")
  const [videoId] = params.split("?si")

  paragrafo.textContent = "Obtendo a transcrição do vídeo..."
  
  const transcription = await server.get("/summary/" + videoId)

  paragrafo.textContent = "Obtendo o resumo do vídeo..."

  const summary = await server.post('/summary', {
    text: transcription.data.result,
  })

  paragrafo.textContent = summary.data.result
  
  paragrafo.classList.remove('placeholder')
})