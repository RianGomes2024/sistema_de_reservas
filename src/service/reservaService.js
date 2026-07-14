import reservaModel from "../model/reservasModel.js"
import salasModel from"../model/salasModel.js"
import userModel from"../model/userModel.js"

const addReserva=(async(dados)=>{
    const sala=dados.codigo_sala;
    const status=dados.status_reserva
    const horaInicio=dados.horario_inicio+":00"
    const horaFim=dados.horario_fim+":00"
    dados.horario_inicio=horaInicio
    dados.horario_fim=horaFim
   
    const verifyReserva=await reservaModel.verifyDisponibilidade(dados);

    const verifySala=await salasModel.searchSala(sala);
    if(status !="confirmado" && status!="cancelado" && status!="concluido")throw new Error("Os status Disponiveis para reservas são ( confirmado, cancelado, concluido)");
    if(verifySala.length===0)throw new Error("Sala não encontrada!");
    if(verifyReserva.length>=1)throw new Error("Sala ocupada !!");
    const reserva=await reservaModel.addReserva(dados);
    return reserva;
});


const verifydisponibilidade=(async(dados)=>{
    const verifyReservas=await reservaModel.verifyDisponibilidade(dados);
    if(verifyReservas.length===0)throw new Error("Não há reservas cadastradas a essa sala na data e horários especificado!!");
    return verifyReservas
});

const userReserva=(async(cpf)=>{
    const verifyUser=await userModel.searchUser(cpf)
    const reservaUsuario=await reservaModel.userReserva(cpf)
    if(verifyUser.length===0)throw new Error("Usuário não cadastrado!!");
    if(reservaUsuario.length===0)throw new Error("O usuário não possui reservas!!");
    return reservaUsuario;    
});


const reservaSala=(async(codigo)=>{
    const verifySala=await salasModel.searchSala(codigo)
    const reservaSala=await reservaModel.reservaSala(codigo)
    if(verifySala.length===0)throw new Error("Sala não cadastrada!");
    if(reservaSala.length===0)throw new Error("A sala não possui reservas ativas!");
    return reservaSala
})


const searchReserva=(async(id_reserva)=>{
    const verifyReserva=await reservaModel.seacrhReserva(id_reserva)
    if(verifyReserva.length===0)throw new Error("Reserva não encontrada!");
    return verifyReserva
})

const updateStatus=(async(status,id_reserva)=>{
    const verifyReserva=await reservaModel.seacrhReserva(id_reserva)
    if(verifyReserva.length===0)throw new Error("Reserva não encontrada!");
    if(status !="confirmado" && status!="cancelado" && status!="concluido")throw new Error("Os status Disponiveis para reservas são ( confirmado, cancelado, concluido)");
    const reserva=await reservaModel.updateStatus(status,id_reserva)
    return reserva    
})

const cancelarReserva=(async(id_reserva)=>{
    const verifyReserva=await reservaModel.seacrhReserva(id_reserva)
    if(verifyReserva.length===0)throw new Error("Reserva não encontrada");
    const reserva=await reservaModel.cancelarReserva(id_reserva)
    return reserva
})

const listarReserva=(async(data,hora)=>{
    const reservas=await reservaModel.listarReservas(data,hora)
    if(reservas.length===0)throw new Error("Não há reservas para esse dia e horário");
    return reservas
    
})

const returnReservas=(async()=>{
    const reservas=await reservaModel.returnreservas()
    if(reservas.length===0)throw new Error("Não há reservas cadastradas!!");
    return reservas
})


export default {addReserva,returnReservas,listarReserva,cancelarReserva,updateStatus,searchReserva,reservaSala,verifydisponibilidade,userReserva}
