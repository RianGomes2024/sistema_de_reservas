import controllerUser from"../controller/userController.js"
import controllerSala from"../controller/salaController.js"
import controllerReserva from"../controller/reservaController.js"
import express, { Router } from"express"
import midd from"../middlewares/validarCampos.js"
import autenticar from "../middlewares/auth.js"
import validarCampos from "../middlewares/validarCampos.js"
const rota=Router()


//Rotas user
rota.post("/user",midd.camposVazios,midd.formatos,controllerUser.addUser)
rota.post("/login",midd.camposVazios,controllerUser.realizarLogin)
rota.get("/search/user",autenticar.autenticar,controllerUser.searchUser)
rota.get("/user",autenticar.autenticar,controllerUser.returnUsers)
rota.patch("/update/user",autenticar.autenticar,midd.camposVazios,controllerUser.updateUser)
rota.delete("/user",autenticar.autenticar, controllerUser.deletarUser)


//rota Salas
rota.post("/sala",autenticar.autenticar,midd.camposVazios,controllerSala.addSala)
rota.get("/sala",controllerSala.returnSala)
rota.get("/search/sala",controllerSala.searchSala)
rota.get("/filter/sala",controllerSala.filterSalas)
rota.patch("/sala/update",autenticar.autenticar,controllerSala.updateSala)
rota.delete("/sala/delete",autenticar.autenticar,controllerSala.deleteSala)
rota.post("/sala/bloqueio",autenticar.autenticar,validarCampos.camposVazios,controllerSala.addBloqueio)
rota.delete("/bloqueio",autenticar.autenticar,controllerSala.removeBloqueio)
rota.get("/search/bloqueio",controllerSala.searchBloqueio)


//reservas
rota.post("/reserva",autenticar.autenticar,controllerReserva.addReserva)
rota.get("/reserva/horario",controllerReserva.verifyDisponibilidade)
rota.get("/reserva/user",controllerReserva.userReserva)
rota.get("/reserva/sala",controllerReserva.reservaSala)
rota.get("/search/reserva",controllerReserva.searchReserva)
rota.patch("/reserva/status",autenticar.autenticar,controllerReserva.updateStatus)
rota.delete("/reserva",autenticar.autenticar,controllerReserva.cancelarReserva)
rota.get("/reservas",controllerReserva.returnReservas)
rota.get("/reserva/diaria",controllerReserva.listarReserva)

export default rota