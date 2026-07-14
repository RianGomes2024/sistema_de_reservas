# Sistema de Reservas de Salas

API REST para gerenciamento de reservas de salas, desenvolvida com Node.js, Express e MySQL. O sistema conta com autenticação JWT, controle de acesso por perfil, gerenciamento de salas, bloqueios por período e lógica de conflito de horário.

## Tecnologias

- Node.js
- Express
- MySQL
- JWT (jsonwebtoken)
- Bcrypt
- Dotenv

## Como rodar

1. Clone o repositório
```bash
git clone https://github.com/RianGomes2024/sistema_de_reservas.git
```

2. Instale as dependências
```bash
npm install
npm instal jsonwebtoken
npm install bcrypt
npm install mysql2
npm install express
npm install dotenv
```

3. Configure o `.env` com base no `.env.example`
```env
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_DATABASE=
SEGREDO=
EXPIRACAO=
```

4. Rode o servidor
```bash
npm start
```

---

## Rotas

### Usuários

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /user | Cadastrar usuário | ❌ |
| POST | /login | Realizar login | ❌ |
| GET | /user | Listar usuários | ✅ |
| GET | /search/user | Buscar usuário | ✅ |
| PATCH | /update/user | Atualizar dados do usuário | ✅ |
| DELETE | /user | Deletar usuário | ✅ |

### Salas

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /sala | Cadastrar sala | ✅ Admin |
| GET | /sala | Listar salas | ❌ |
| GET | /search/sala | Buscar sala | ❌ |
| GET | /filter/sala | Filtrar salas disponíveis | ❌ |
| PATCH | /sala/update | Atualizar sala | ✅ Admin |
| DELETE | /sala/delete | Deletar sala | ✅ Admin |

### Bloqueios

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /sala/bloqueio | Bloquear sala por período | ✅ Admin |
| DELETE | /bloqueio | Remover bloqueio | ✅ Admin |
| GET | /search/bloqueio | Buscar bloqueio | ❌ |

### Reservas

| Método | Rota | Descrição | Auth |
|--------|------|-----------|------|
| POST | /reserva | Criar reserva | ✅  |
| GET | /reservas | Listar todas as reservas | ✅ Admin|
| GET | /reserva/user | Reservas de um usuário | ✅ Admin |
| GET | /reserva/sala | Reservas de uma sala | ✅ |
| GET | /reserva/horario | Verificar disponibilidade de horário | ✅ |
| GET | /reserva/diaria | Listar reservas do dia | ✅ |
| GET | /search/reserva | Buscar reserva por ID | ✅ |
| PATCH | /reserva/status | Atualizar status da reserva | ✅ Admin |
| DELETE | /reserva | Cancelar reserva | ✅ |

---

## Lógica de conflito de horário

Antes de criar uma reserva, o sistema verifica se já existe outra reserva na mesma sala e data que sobreponha o horário solicitado. Duas reservas conflitam quando:

```
horario_inicio_existente <= horario_fim_novo
E
horario_fim_existente >= horario_inicio_novo
```

Se houver conflito, a reserva é bloqueada automaticamente.

---

## Autor

Rian — [GitHub](https://github.com/RianGomes2024)
