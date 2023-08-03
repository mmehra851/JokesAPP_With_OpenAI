const express = require("express")

require("dotenv").config()
const app = express()
app.use(express.json())
const  cors = require("cors")
app.use(cors())
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  app.post("/jokes",async(req,res)=>{
    try {
        const {prompt,language}= req.body
        const question= { role: "user", content: `provide me joke on ${prompt}  in ${language} language and do not translate in english ` }
        
         const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [question],
            max_tokens: 1000
          });
          const reply = response.data.choices[0].message.content.trim().split("\n").join(" ")
          const sayariData = [{ role: "assistant", content: reply }];
          res.send(sayariData);
    } catch (error) {
        console.log(error.message)
    }
})
app.get("/", (req,res)=>{
    res.send("this is home page")
})

app.listen(process.env.PORT, ()=>{
    console.log(`server is running at PORT ${process.env.PORT}`)
})