const camposVazios=((req,res,next)=>{
    const dados=req.body
    for(let campos in dados){
        if(!dados[campos] || dados[campos].length===0 || dados[campos]===undefined ){
            return res.status(400).json({message:`O campo ${campos} está vazio`})
        }
    }
    next()
})

const formatos=((req,res,next)=>{
    const email=req.body.email.toLowerCase().trim()
   
    
 const cpfUser=req.body.cpf.toString()
    const senha=req.body.senha
    const perfil=req.body.perfil.toLocaleLowerCase().trim()

    if(!email.includes("@")){
        throw new Error("Formato de e-mail incorreto!");
    }
    if(!senha.length<8 && !/[A-Z]/.test(senha)){
        throw new Error("A senha deve conter no mínimo 8 caracteres e uma letra maiúscula!!");
    }
    if(cpfUser.length!=11){
        throw new Error("O campo CPF deve conter 11 caracteres!!");
    }
    if(perfil!="admin" && perfil!="cliente"){
        throw new Error("Perfis Disponiveis ( Admin ou Cliente)");
    }
    next()
})  


export default {camposVazios,formatos}