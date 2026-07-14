import service from "../service/reservaService.js"


const addReserva=(async(req,res)=>{
    try{
        const dados=req.body
        const reserva=await service.addReserva(dados)
        return res.status(201).json({message:`Reserva da sala ${dados.codigo_sala} realizada com sucesso!`})
    }catch(error){
        return res.status(400).json({error:error.message});
    }
})

const verifyDisponibilidade=(async(req,res)=>{
    try{
        const dados=req.body
        const reserva=await service.verifydisponibilidade(dados)
         return res.status(200).json(reserva)
    }catch(error){
      return res.status(400).json({error:error.message});
    }
})

const userReserva=(async(req,res)=>{
   try{
    const cpf=req.body.cpf
    const reserva=await service.userReserva(cpf)
    return res.status(200).json(reserva)
   }catch(error){
      return res.status(400).json({error:error.message});
    }
})

const reservaSala=(async(req,res)=>{
    try{
    const codigo=req.body.codigo_sala
    const reserva=await service.reservaSala(codigo)
     return res.status(200).json(reserva)
    }catch(error){
      return res.status(400).json({error:error.message});
    }
})

const searchReserva=(async(req,res)=>{
    try{
        const id_reserva=req.body.id_reserva
        const reserva=await service.searchReserva(id_reserva)
         return res.status(200).json(reserva)
    }catch(error){
      return res.status(400).json({error:error.message});
    }
})

const updateStatus=(async(req,res)=>{
    try{
    const status=req.body.status
    const id_reserva=req.body.id_reserva
    const reserva=await service.updateStatus(status,id_reserva)
    return res.status(200).json({message:`Status atualizado com sucesso!`})
    }catch(error){
      return res.status(400).json({error:error.message});
    }

})

const cancelarReserva=(async(req,res)=>{
    try{
        const id_reserva=req.body.id_reserva
        const reserva=await service.cancelarReserva(id_reserva)
        return res.status(200).json({message:`Reserva cancelada com sucesso!`})
    }catch(error){
      return res.status(400).json({error:error.message});
    }
})


const returnReservas=(async(req,res)=>{
    try{
        const perfil=req.usuario.perfil
        const reserva=await service.returnReservas(perfil)
           return res.status(200).json(reserva)
    }catch(error){
      return res.status(400).json({error:error.message});
    }
})

const listarReserva=(async(req,res)=>{
    try{
        const data=req.body.data
        const hora=req.body.hora_inicio
        const reserva=await service.listarReserva(data,hora)
        return res.status(200).json(reserva)

    }catch(error){
      return res.status(400).json({error:error.message});
    }
})


export default{returnReservas,cancelarReserva,updateStatus,searchReserva,reservaSala,userReserva,verifyDisponibilidade,addReserva,listarReserva}