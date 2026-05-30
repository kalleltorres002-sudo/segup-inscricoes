# SEGUP/PA - Sistema de Inscrições

Sistema de inscrições desenvolvido como teste técnico para a vaga de Desenvolvedor na Secretaria de Segurança Pública e Defesa Social do Pará.

---

## Tecnologias usadas

| Camada     | Tecnologia                                      |
|------------|-------------------------------------------------|
| Backend    | Java 17, Spring Boot 3.2, Spring Web, Spring Data JPA, Bean Validation, Lombok |
| Banco      | MySQL 8 / MariaDB                               |
| Frontend   | React 18, React Router DOM 6, Axios             |

---

## Como rodar o backend

### Pré-requisitos
- Java 17+
- Maven 3.8+
- MySQL 8 rodando na porta 3306

### Passos

```bash
cd backend

# Configure o banco no arquivo:
# src/main/resources/application.properties
# Ajuste usuário/senha do MySQL se necessário

mvn spring-boot:run
```

O backend sobe em: `http://localhost:8080`

---

## Como rodar o frontend

### Pré-requisitos
- Node.js 18+

### Passos

```bash
cd frontend
npm install
npm start
```

O frontend sobe em: `http://localhost:3000`

---

## Como configurar o banco

O Spring Boot cria as tabelas automaticamente com `ddl-auto=update`.

Para criar manualmente, execute o script:
```
backend/src/main/resources/schema.sql
```

Banco usado: `segup_inscricoes`

---

## Endpoints principais

| Método | Endpoint                            | Descrição                    |
|--------|-------------------------------------|------------------------------|
| POST   | `/api/inscricoes`                   | Criar nova inscrição         |
| GET    | `/api/inscricoes`                   | Listar todas as inscrições   |
| GET    | `/api/inscricoes/{id}`              | Buscar por ID                |
| GET    | `/api/inscricoes/protocolo/{prot}`  | Buscar por protocolo         |
| PUT    | `/api/inscricoes/{id}`              | Atualizar inscrição          |
| PATCH  | `/api/inscricoes/{id}/cancelar`     | Cancelar inscrição           |

### Exemplo de payload (POST /api/inscricoes)

```json
{
  "nomeCompleto": "João da Silva",
  "cpf": "12345678901",
  "email": "joao@email.com",
  "telefone": "91999990001",
  "servicoCursoEvento": "Curso de Segurança Pública",
  "observacao": "Nenhuma"
}
```

### Resposta de sucesso

```json
{
  "id": 1,
  "protocolo": "INS-20260530-0001",
  "nomeCompleto": "João da Silva",
  "status": "CONFIRMADA",
  "urlConfirmacao": "http://localhost:3000/confirmacao/INS-20260530-0001"
}
```

---

## Fluxo da inscrição

```
Formulário (React)
   ↓ POST /api/inscricoes
Backend (Spring Boot)
   ↓ Valida campos obrigatórios
   ↓ Gera protocolo automático (INS-YYYYMMDD-XXXX)
   ↓ Persiste no MySQL com status CONFIRMADA
   ↓ Retorna protocolo + URL de confirmação
Frontend
   ↓ Redireciona para /confirmacao/{protocolo}
Página de confirmação exibe: protocolo, nome, status
```

---

## Regras de negócio

- Nome completo, CPF, e-mail e serviço são obrigatórios
- Protocolo gerado automaticamente no formato `INS-YYYYMMDD-XXXX`
- Status inicial: `CONFIRMADA`
- Cancelamento altera status para `CANCELADA` (sem excluir o registro)
- Inscrições canceladas não podem ser editadas nem canceladas novamente
- Erros de validação retornam mensagens claras por campo

---

## Decisões técnicas

- **Spring Data JPA + `ddl-auto=update`**: simplifica o setup sem necessidade de migration manual para avaliação; em produção usaria Flyway/Liquibase.
- **DTO separado do Model**: evita expor a entidade diretamente na API.
- **GlobalExceptionHandler**: tratamento centralizado de erros com respostas padronizadas.
- **CORS configurado no Controller**: permite comunicação local entre frontend (3000) e backend (8080).
- **React Router DOM**: navegação SPA sem recarregar a página.

---

## Candidato

Teste técnico SEGUP/PA — Desenvolvedor
