import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();


const autenticar=(async(req,res,next)=>{
  const authHeader= req.headers.authorization

  if(!authHeader){
    return res.status(400).json({message:"È necessário realizar Login!!"})
  }

  const token=authHeader.split(" ")[1]

  try{
    const playload=jwt.verify(token,process.env.SEGREDO)
   
    req.usuario=playload

    next()
  }catch(error)
  {
     return res.status(403).json({ erro: 'È necessário realizar Login!!' });
  }
})

export default {autenticar}