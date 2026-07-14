
import  service from"../service/userService.js"


const addUser=(async(req,res)=>{
    try{
    const dados=req.body
    const user=await service.addUser(dados)  
    return res.status(201).json({message:`${dados.nome} Foi cadastrado com sucesso!`})
  }catch(error){
        return res.status(400).json({error:error.message});
        }
    }
);


const searchUser=(async(req,res)=>{
     try{
        const cpf=req.body.cpf
        const user=await service.searchUser(cpf)
        return res.status(200).json(user)
  }catch(error){
        return res.status(400).json({error:error.message});
        }
})


const returnUsers=(async(req,res)=>{
    try{
        const user=await service.returnUsers()
        return res.status(200).json(user)
  }catch(error){
        return res.status(400).json({error:error.message});
        }
})

const deletarUser=(async(req,res)=>{
    try{
        const cpf=req.body.cpf
        const perfil=req.usuario.perfil
        const user=await service.deletarUser(cpf,perfil)

        return res.status(200).json({message:"O usuário foi deletado com sucesso!!"})

    }catch(error){
        return res.status(400).json({error:error.message});
        }
})


const updateUser=(async(req,res)=>{
    try{
        const dados=req.body
        const user = await service.updateUser(dados)
        return res.status(200).json({message:"Usuário atualizado com sucesso "})
    }catch(error){
        return res.status(400).json({error:error.message});
        }
})


const realizarLogin=(async(req,res)=>{
    try{
        const email=req.body.email
        const senha=req.body.senha
        const login=await service.realizarLogin(email,senha)
    
        return res.status(201).json(login)
    }catch(error){
        return res.status(400).json({error:error.message});
        }
    }
)

export default {addUser,realizarLogin,updateUser,deletarUser,returnUsers,searchUser}