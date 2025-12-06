# Backend - Projeto Semear Lages

API FastAPI para gerenciamento do Projeto Semear Lages.

## Instalação

1. Instale as dependências:
```bash
pip install -r requirements.txt
```

2. Configure o arquivo `.env` (já criado com valores padrão)

3. Execute o servidor:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

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

