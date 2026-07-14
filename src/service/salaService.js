import salasModel from"../model/salasModel.js"
import reservaModel from "../model/reservasModel.js"


const addSala=(async(dados,perfil)=>{
    const {codigo,capacidade}=dados
    const verifySala=await salasModel.searchSala(codigo)
    console.log(perfil)
    if(perfil!="admin")throw new Error("Apenas Admins podem cadastar sala!");
    if(verifySala.length>=1)throw new Error("Sala já cadastrada!");
    if(typeof capacidade!="number" || capacidade===0)throw new Error("Digite um número maior que 0!");
    const result=await salasModel.addSala(dados)
    return result
})

const returnSala=(async()=>{
    const salas=await salasModel.returnSalas()
    if(salas.length===0)throw new Error("Não há salas cadastradas!");
    return salas
})

const searchSalas=(async(codigo)=>{
    const sala=await salasModel.searchSala(codigo)
    if(sala.length===0)throw new Error("Sala não encontrada!!");
    return sala  
})

const updatSala=(async(dados)=>{
    const codigo=dados.codigo
    const disponibilidade=dados.disponibilidade
    const verifySala=await salasModel.searchSala(codigo)
    if(verifySala.length===0 || codigo==undefined)throw new Error("Sala não encontrada!!");
    if(disponibilidade!=undefined){
        if(disponibilidade!="Disponivel" && disponibilidade!="Indisponivel")throw new Error("Os Status Disponiveis para uso são (Disponivel , Indisponivel)");
    }

    const key=[]
    const values=[]

    for(let campos in dados){
        key.push(campos+"=?")
        values.push(dados[campos])
    }
    const concat=key.join(",")
    
    const update=await salasModel.updateSala(key,values,codigo)

    return update
})

 const deleteSala=(async(codigo)=>{
    const verifySala=await salasModel.searchSala(codigo)
    const verifyReserva=await reservaModel.reservaSala(codigo)
    if(verifySala.length===0)throw new Error("Sala não encontrada!!");
    if(verifyReserva.length===0)throw new Error("Essa sala não pode ser delatada, por possuir uma reserva ativa!!");
    const deletar=await salasModel.deleteSala(codigo)
    return deletar
 })



 const filterSalas=(async(capacidade)=>{
    const filtrarSalas=await salasModel.filterSalas(capacidade)
    if(filtrarSalas.length===0)throw new Error("Não há salas com essa capacidade!!");
    return filtrarSalas
 })

 const addBloqueios=(async(dados)=>{
    const codigo=dados.codigo_sala
    const verifyBloqueios=await salasModel.searchBloqueios(codigo)
    const verifySala=await salasModel.searchSala(codigo)
    if(verifySala.length===0)throw new Error("Sala não encontrada!");
    if(verifyBloqueios.length>=1)throw new Error("A sala já está bloqueada!");
    const bloquear=await salasModel.bloqueios(dados)
    return bloquear
 })

 const removerBloqueio=(async(codigo)=>{
    const verifyBloqueio=await salasModel.searchBloqueios(codigo)
    if(verifyBloqueio.length===0)throw new Error("Não há bloqueio a essa sala");
    const remover=await salasModel.removeBloqueio(codigo)
    return remover
    
 })

 
const searchBloqueio=(async(codigo)=>{
    const sala=await salasModel.searchBloqueios(codigo)

    if(sala.length===0)throw new Error("Sala não encontrada!!");
    return sala  
})

export default{searchBloqueio,removerBloqueio,addBloqueios,filterSalas,deleteSala,updatSala,searchSalas,returnSala,addSala
}