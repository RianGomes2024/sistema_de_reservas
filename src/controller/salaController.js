import service from "../service/salaService.js"

const addSala=(async(req,res)=>{
    try{
    const dados=req.body;
    const perfil=req.usuario.perfil

    const sala=await service.addSala(dados,perfil);
    return res.status(201).json({message:"Sala cadastrada com Sucesso!"});
    }catch(error){
        
     return res.status(400).json({error:error.message});
    }
});


const returnSala=(async(req,res)=>{
    try{
        const salas=await service.returnSala();
        return res.status(200).json(salas);
    }catch(error){
        return res.status(400).json({error:error.message});
    }
});


const searchSala=(async(req,res)=>{
    try{
        const codigo=req.body.codigo;
        const sala=await service.searchSalas(codigo);
        return res.status(200).json(sala);
    }catch(error){
        return res.status(400).json({error:error.message});
    }
});


const updateSala=(async(req,res)=>{
    try{
        const dados=req.body;
        const sala=await service.updatSala(dados);
        const codigo=sala.codigo;
        return res.status(200).json(`A sala ${codigo} foi atualizada!`);
    }catch(error){
        return res.status(400).json({error:error.message});
    }
});


const deleteSala=(async(req,res)=>{
    try{
        const codigo=req.body.codigo;
        const sala=await service.deleteSala(codigo);
        return res.status(200).json(sala);
    }catch(error){
        return res.status(400).json({error:error.message});
    }
});


const filterSalas=(async(req,res)=>{
    try{
        const capacidade=req.body.capacidade;
        const sala=await service.filterSalas(capacidade);
    
        return res.status(200).json({sala});
    }catch(error){
        return res.status(400).json({error:error.message});
    }
});


const addBloqueio=(async(req,res)=>{
    try{
        const dados=req.body;
        const bloqueio=await service.addBloqueios(dados);
        const sala=dados.codigo_sala
        return res.status(201).json({message:`A sala ${sala} foi colocada em manutenção`});
    }catch(error){
        return res.status(400).json({error:error.message});
    }
});


const removeBloqueio=(async(req,res)=>{
    try{
        const codigo=req.body.codigo_sala;
        const bloqueio=await service.removerBloqueio(codigo);
        return res.status(200).json({message:`A sala ${codigo} foi removida de manutenções!`});
    }catch(error){
        return res.status(400).json({error:error.message});
    }
});


const searchBloqueio=(async(req,res)=>{
    try{
        const codigo=req.body.codigo_sala;
        const bloqueio=await service.searchBloqueio(codigo);
        return res.status(200).json(bloqueio);
    }catch(error){
        return res.status(400).json({error:error.message});
    }
});


export default{addSala,addBloqueio,searchBloqueio,removeBloqueio,filterSalas,deleteSala,updateSala,searchSala,returnSala}


