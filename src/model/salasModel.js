import db from"../database/Conexao.js"

const addSala=(async(dados)=>{
    const {nome_sala,capacidade,localizacao,descricao,disponibilidade,codigo}=dados;
    const sql="INSERT INTO salas (nome_sala,capacidade,localizacao,descricao,disponibilidade,codigo) VALUES (?,?,?,?,?,?)";
    const sala=await db.query(sql,[nome_sala,capacidade,localizacao,descricao,disponibilidade,codigo]);
    return sala;
});

const returnSalas=(async()=>{
    const sql="SELECT*FROM salas";
    const [salas]=await db.query(sql);
    return salas;
});

const searchSala=(async(codigo)=>{
    const sql="SELECT * FROM salas where codigo=?";
    const [sala]=await db.query(sql,[codigo]);
    return sala;
});

const updateSala=(async(chaves,valores,codigo)=>{

   const sql=`UPDATE salas SET ${chaves} WHERE codigo=?`;
   const update=await db.query(sql,[...valores,codigo]);
   return update;
});

const deleteSala=(async(id)=>{
    const sql="DELETE FROM salas WHERE id_sala=?";
    const deletar=await db.query(sql,[id]);
    return deletar;
});

const filterSalas=(async(capacidade)=>{
    const sql="SELECT*FROM salas WHERE disponibilidade='Disponivel' AND capacidade=?";
    const [filtragem]=await db.query(sql,[capacidade]);
    return filtragem;
});


const bloqueios=(async(dados)=>{
    const {codigo_sala,data_inicio,data_fim,motivo}=dados
    const sql="INSERT INTO bloqueios (codigo_sala,data_inicio,data_fim,motivo) VALUES(?,?,?,?)"
    const result=await db.query(sql,[codigo_sala,data_inicio,data_fim,motivo])
    return result
})

const searchBloqueios=(async(codigo_sala)=>{
    const sql="select BLOQUEIOS.codigo_sala, BLOQUEIOS.data_inicio,BLOQUEIOS.data_fim,motivo from BLOQUEIOS JOIN salas on salas.codigo=bloqueios.codigo_sala WHERE codigo_sala=?"
    const [result]=await db.query(sql,[codigo_sala])
    return result

})

const removeBloqueio=(async(codigo)=>{
    const sql="delete from bloqueios where codigo_sala=?"
    const remover=await db.query(sql,[codigo])
    return remover
})

export default{addSala,returnSalas,searchSala,deleteSala,bloqueios,filterSalas,updateSala,searchBloqueios,removeBloqueio};

