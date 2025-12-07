# Backend - Projeto Semear Lages

API FastAPI para gerenciamento do Projeto Semear Lages.

## Instalação

1. **Instale o PostgreSQL 18** (veja `DATABASE_SETUP.md` para instruções detalhadas)

2. **Crie o banco de dados:**
```bash
psql -U postgres
CREATE DATABASE semear;
```

3. **Instale as dependências Python:**
```bash
pip install -r requirements.txt
```

4. **Configure o arquivo `.env`** com a URL do PostgreSQL:
```env
DATABASE_URL=postgresql://postgres:sua_senha@localhost:5432/semear
```

5. **Execute o servidor:**
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

As tabelas serão criadas automaticamente na primeira execução.

O servidor estará disponível em `http://localhost:8000`

## Testes

Para testar a API, você pode usar o script de teste:

```bash
python test_api.py
```

Ou usar o Swagger UI em `http://localhost:8000/docs`

## Endpoints

### Autenticação
- `POST /api/auth/login` - Login (retorna token em cookie httponly)
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Informações do usuário autenticado

### Notícias
- `GET /api/news` - Lista todas as notícias (público)
- `GET /api/news/{id}` - Obtém uma notícia específica (público)
- `POST /api/news` - Cria uma nova notícia (requer autenticação)
- `PUT /api/news/{id}` - Atualiza uma notícia (requer autenticação)
- `DELETE /api/news/{id}` - Remove uma notícia (requer autenticação)

## Segurança

- Autenticação via JWT armazenado em cookie httponly
- Senhas hasheadas com bcrypt
- Validação de dados de entrada
- CORS configurado para desenvolvimento

