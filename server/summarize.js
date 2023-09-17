import { pipeline } from '@xenova/transformers'

export async function summarize(texto){
  try {
    //return summaryExample
    console.log("Realizando o resumo")

    const generator = await pipeline("summarization", "Xenova/distilbart-cnn-12-6")

    const output = await generator(texto)
    
    console.log("Resumo concluído com sucesso")
    
    return output[0].summary_text
  
  } catch (error) {
   console.log("Não foi possível realizar o resumo do vídeo")
    throw new Error(error)
  }
}
