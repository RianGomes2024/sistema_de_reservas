
import db from"../database/Conexao.js" 


const addReserva=(async(dados)=>{
    const {codigo_sala,cpf,data_reserva,horario_inicio,horario_fim,status_reserva}=dados;
    const sql="INSERT INTO reserva_sala (codigo_sala,cpf,data_reserva,horario_inicio,horario_fim,status_reserva) VALUES(?,?,?,?,?,?)";
    const sala=await db.query(sql,[codigo_sala,cpf,data_reserva,horario_inicio,horario_fim,status_reserva]);
    return sala;
});

const returnreservas=(async()=>{
    const sql="SELECT*FROM reserva_sala"
    const [result]=await db.query(sql)
    return result
})

const verifyDisponibilidade=(async(dados)=>{
    const {codigo_sala,data_reserva,horario_inicio,horario_fim}=dados
    const sql="SELECT * FROM reserva_sala WHERE codigo_sala=? AND data_reserva=? AND horario_inicio<=? AND horario_fim>=?"
    const [verifyReserva]=await db.query(sql,[codigo_sala,data_reserva,horario_inicio,horario_fim]);

    return verifyReserva;
});

const userReserva=(async(cpf)=>{ 
    const sql="SELECT reserva_sala.*FROM reserva_sala JOIN users ON reserva_sala.cpf=users.cpf WHERE reserva_sala.cpf=?";
    const [reserva]=await db.query(sql,[cpf]);
    return reserva;
});
 
 

const reservaSala=(async(codigo)=>{
    const sql="SELECT reserva_sala.* FROM reserva_sala JOIN salas ON reserva_sala.codigo_sala=salas.codigo WHERE reserva_sala.codigo_sala=?"
    const [reservaSala]=await db.query(sql,[codigo]);
    return reservaSala
})


const seacrhReserva=(async(id_reserva)=>{
    const sql="SELECT * FROM reserva_sala WHERE id_reserva=?";
    const [reserva]=await db.query(sql,[id_reserva]);
    return reserva;
});


const updateStatus=(async(status,id_reserva)=>{
    const sql="UPDATE reserva_sala SET status_reserva=? WHERE id_reserva=?";
    const update=await db.query(sql,[status,id_reserva]);
    return update;
});



const cancelarReserva=(async(id_reserva)=>{
    const sql="DELETE FROM reserva_sala WHERE id_reserva=?";
    const cancelar=await db.query(sql,[id_reserva]);
    return cancelar; 
});

const listarReservas=(async(data, hora)=>{
    const sql="SELECT*FROM reserva_sala WHERE data_reserva=? and horario_inicio>=?"
    const [reserva]=await db.query(sql,[data,hora]);
    return reserva;
});


export default {addReserva,cancelarReserva,listarReservas,updateStatus,seacrhReserva,userReserva,verifyDisponibilidade,reservaSala,returnreservas}


 