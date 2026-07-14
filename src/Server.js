import rota from"./routes/rotas.js"
import express from"express"
import dotenv from "dotenv";
dotenv.config();
const app=express()
app.use(express.json());
app.use("/",rota)

app.listen(3000,(()=>{
    console.log("Server rodando")
}))
