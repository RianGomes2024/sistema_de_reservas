import model from "../model/userModel.js"
import modelReserva from "../model/reservasModel.js"
import bcy from "bcrypt"

import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

const addUser=(async(dados)=>{
    const verifyCpf=await model.searchUser(dados.cpf)
    const verifyEmail=await model.searchUserEmail(dados.email)
    const senhaHash=await bcy.hash(dados.senha,10)
    if(verifyCpf.length>=1)throw new Error("O CPF já está cadastrado");
    if(verifyEmail.length>=1)throw new Error("O EMAIL já está cadastrado");
    dados.senha=senhaHash
    const user=await model.addUser(dados)
    return user
})


const searchUser=(async(cpf)=>{
    const usuario=await model.searchUser(cpf)
    if(usuario.length===0)throw new Error("Usuário não encontrado!!")
    return usuario
})



const returnUsers=(async(perfil)=>{
    const usuarios=await model.returnUsers()
    if(usuarios.length===0)throw new Error("Não há usuários cadastrados em sistema!!!");
    if(perfil!="admin")throw new Error("Apenas Admins podem retornar todos usuários!");
    
    return usuarios
})


const deletarUser=(async(cpf,perfil)=>{
    const userReserva=await modelReserva.userReserva(cpf)
    const verifyUser=await model.searchUser(cpf)

     if(verifyUser.length===0)throw new Error("Usuário não encontrado!!");
    
    if(userReserva.length>=1)throw new Error("O Usuário não pode ser deletado porque possui reservas ativas!!");
    if(perfil.toLowerCase()!="admin")throw new Error("È necessario ser Admin para deletar usuário");
    
    const usuario=await model.deleteUser(cpf)
    return usuario
}) 


const updateUser=await(async(dados)=>{
    const cpf=dados.cpf

    const verifyCpf=await model.searchUser(cpf)
    if(verifyCpf.length===0) throw new Error("Usuário não encontrado!!");
    const values=[]
    const keys=[]

    for(let campos in dados){
        keys.push(campos+"=?")
        values.push(dados[campos])
    }
    
    const parse=keys.join(",")
    const update=await model.updateUser(cpf,values,parse)
    return update


})

const realizarLogin=(async(email,senha)=>{
    const verifyEmail=await model.searchUserEmail(email)
    if(verifyEmail.length===0)throw new Error("Email não encontrado em base de dados, realizar cadastro!");
      
      const index0=verifyEmail[0]
      const senhaDb=index0.senha
      const senhaHash=await bcy.compare(senha,senhaDb)
     
    if(!senhaHash)throw new Error("Senha incorreta!!");
    
    const result=await model.realizarLogin(email,senha);

    const token=await jwt.sign({cpf:index0.cpf,email:index0.email,perfil:index0.perfil},process.env.SEGREDO,{expiresIn:process.env.EXPIRACAO})
    
    return {usuario : index0.email ,
            
            token : token}
})





//parei treminando controller de tudo, so testei addUser e login o resto so fiz sem testar começar daqui

export default {addUser,realizarLogin,searchUser,returnUsers,updateUser,deletarUser}