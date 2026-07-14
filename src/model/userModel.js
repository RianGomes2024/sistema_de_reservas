import db from "../database/Conexao.js"

const addUser=(async(dados)=>{
    const {cpf,nome,email,senha,perfil}=dados;
    const sql="INSERT INTO users (cpf,nome,email,senha,perfil) VALUES(?,?,?,?,?)";
    const usuarios=await db.query(sql,[cpf,nome,email,senha,perfil]);
    return usuarios;
});

const searchUser=(async(cpf)=>{
    const sql="SELECT nome,email,senha,perfil FROM users WHERE cpf=?";
    const [usuario]=await db.query(sql,[cpf]);
    return usuario;
});

const returnUsers=(async()=>{
    const sql="SELECT*FROM users";
    const [usuarios]=await db.query(sql);
    return usuarios;
});


const deleteUser=(async(cpf)=>{
    const sql="DELETE FROM USERS WHERE cpf=?";
    const usuario=await db.query(sql,[cpf]);
    return usuario;
});

const updateUser=(async(cpf,valores,chaves)=>{
      const sql=`UPDATE users SET ${chaves} WHERE cpf=?`;
      const update=await db.query(sql,[...valores,cpf]);
      return update;
});

const searchUserEmail=(async(email)=>{
    const sql="SELECT * FROM users WHERE email=?";
    const [usuario]=await db.query(sql,[email]);
    return usuario;
});

const realizarLogin=(async(email,senha)=>{
    const sql="INSERT INTO login (email,senha) VALUES(?,?)";
    const result=await db.query(sql,[email,senha]);
    return result
})

export default{addUser,searchUser,returnUsers,deleteUser,updateUser,searchUserEmail,realizarLogin}

