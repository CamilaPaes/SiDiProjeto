# 📋 Projeto SIDI API - Módulo de Visitantes

API REST para gerenciamento de visitantes do Sistema Integrado de Dados e Informações.

---

## 🚀 Tecnologias

| Tecnologia | Versão | Finalidade |
|------------|--------|------------|
| Java | 17 | Linguagem de programação |
| Spring Boot | 4.0.5 | Framework principal |
| Spring Data JPA | - | Persistência de dados |
| MySQL | 8.0 | Banco de dados relacional |
| Maven | 3.8+ | Gerenciador de dependências |
| Google Gemini API | - | Inteligência Artificial |

---

## 📥 Instalação e Execução

### 1. Clonar o repositório
```bash
git clone https://github.com/claudiodev175/projeto-sidi.git
cd projeto-sidi/projeto-sidi-api

2. Criar o banco de dados
bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS projeto_sidi_db;"

3. Configurar o banco e a chave da IA
Edite src/main/resources/application.properties:

Propriedade	Valor	Descrição
spring.datasource.url	jdbc:mysql://localhost:3306/projeto_sidi_db	URL do banco
spring.datasource.username	root	Usuário do MySQL
spring.datasource.password	root	Senha do MySQL
gemini.api.key	AIzaSy...	Chave da API Gemini
properties
spring.application.name=projeto-sidi-api
spring.jpa.hibernate.ddl-auto=update
spring.datasource.url=jdbc:mysql://localhost:3306/projeto_sidi_db
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# ⚠️ OBRIGATÓRIO: Adicione sua chave da API Gemini

gemini.api.key=AIzaSySUA-CHAVE-AQUI

4. Obter a chave da API Gemini (IA)
Passo	Ação
1	Acesse: https://aistudio.google.com/apikey
2	Faça login com sua conta Google
3	Clique em "Create API Key"
4	Copie a chave gerada (começa com AIzaSy)
5	Cole no campo gemini.api.key do application.properties
Importante: Sem a chave, o assistente virtual não funcionará. A chave é gratuita.

5. Compilar e executar
Comando	Descrição
mvn clean compile	Compilar o projeto
mvn spring-boot:run	Executar a aplicação
A API estará disponível em: http://localhost:8080

🤖 Assistente Virtual (IA)
O sistema possui um assistente virtual integrado que auxilia no preenchimento do formulário de pré-cadastro.

Perguntar ao Assistente
POST http://localhost:8080/ia

Campo	Tipo	Descrição
mensagem	String	Pergunta do usuário
Requisição:

json
{
    "mensagem": "Como devo preencher o campo CPF?"
}
Resposta:

json
{
    "resposta": "Digite apenas os 11 números do CPF, sem pontos, traços ou espaços."
}
Exemplos de perguntas suportadas:
Pergunta	Resposta esperada
"Qual setor escolher?"	Lista os setores disponíveis
"Posso deixar a placa em branco?"	Informa que o campo é opcional
"Como funciona o cadastro?"	Explica o fluxo de cadastro
"Preciso preencher todos os campos?"	Explica campos obrigatórios

🧪 Testando com Postman
Fluxo Completo de Teste
Etapa	Método	URL	Ação
1	POST	/api/visitantes	Cadastrar visitante
2	GET	/api/visitantes/pendentes	Listar pendentes
3	PUT	/api/visitantes/1/status	Aprovar visitante
4	PUT	/api/visitantes/1/status	Check-in
5	PUT	/api/visitantes/1/status	Check-out

1. Cadastrar um visitante
POST http://localhost:8080/api/visitantes

json
{
    "nome": "João Silva",
    "email": "joao@email.com",
    "cpf": "12345678900",
    "telefone": "(11) 99999-9999",
    "empresa": "Tech Solutions",
    "quemConvidou": "Maria Santos",
    "setor": "TI",
    "qntdVisitantes": 1,
    "data": "2026-05-25",
    "horario": "14:00",
    "tipoVisitante": "ENTREVISTA",
    "observacao": "Candidato a vaga de Desenvolvedor"
}
2. Verificar no banco de dados
sql
SELECT * FROM projeto_sidi_db.tb_visitante;
3. Listar pendentes (Colaborador)
GET http://localhost:8080/api/visitantes/pendentes

4. Aprovar visitante
PUT http://localhost:8080/api/visitantes/1/status

json
{ "status": "APROVADO" }
5. Check-in (Recepção)
PUT http://localhost:8080/api/visitantes/1/status

json
{ "status": "PRESENTE" }

6. Check-out (Recepção)
PUT http://localhost:8080/api/visitantes/1/status

json
{ "status": "FINALIZADO" }
📡 Todos os Endpoints
Método	URL	Descrição	Body
POST	/api/visitantes	Cadastrar visitante	JSON com dados do visitante
GET	/api/visitantes	Listar todos	-
GET	/api/visitantes/{id}	Buscar por ID	-
GET	/api/visitantes/pendentes	Listar pendentes	-
GET	/api/visitantes/setor/{setor}	Filtrar por setor	-
PUT	/api/visitantes/{id}/status	Atualizar status	{"status": "APROVADO"}
POST	/ia	Perguntar ao assistente	{"mensagem": "..."}

📦 Enums

StatusCadastro
Valor	Descrição	Quem Altera
PENDENTE	Aguardando aprovação	Estado inicial
APROVADO	Aprovado pelo colaborador	Colaborador
RECUSADO	Recusado pelo colaborador	Colaborador
AGUARDANDO	Aguardando check-in	Sistema (automático)
ATRASADO	Passou do horário	Sistema (automático)
PRESENTE	Check-in realizado	Recepção
FINALIZADO	Check-out realizado	Recepção
Setor
Valor	Descrição
TI	Tecnologia da Informação
RECURSOS_HUMANOS	Recursos Humanos
FINANCEIRO	Financeiro
COMERCIAL	Comercial
OPERACOES	Operações
DIRETORIA	Diretoria
TipoVisitante
Valor	Descrição
ENTREVISTA	Candidato a vaga de emprego
FORNECEDOR	Fornecedor de produtos/serviços
PRESTADOR_SERVICO	Prestador de serviço terceirizado
VISITANTE	Visitante comum

🔄 Fluxo de Status
PENDENTE ──→ APROVADO ──→ PRESENTE ──→ FINALIZADO
    │            │
    └──→ RECUSADO│
                 │
                 └──→ (atrasado) ──→ ATRASADO ──→ PRESENTE ──→ FINALIZADO
Transições permitidas:
Status Atual	Próximo Status	Responsável
PENDENTE	APROVADO	Colaborador
PENDENTE	RECUSADO	Colaborador
APROVADO	AGUARDANDO	Sistema (automático)
AGUARDANDO	ATRASADO	Sistema (automático)
AGUARDANDO	PRESENTE	Recepção
ATRASADO	PRESENTE	Recepção
PRESENTE	FINALIZADO	Recepção

🗄️ Estrutura da Tabela

tb_visitante
Coluna	Tipo	Restrições	Descrição
id	BIGINT	PK, AUTO_INCREMENT	Identificador único
nome	VARCHAR(255)	NOT NULL	Nome completo
email	VARCHAR(255)	NOT NULL	Email do visitante
empresa	VARCHAR(255)	-	Empresa que representa
cpf	VARCHAR(11)	NOT NULL, UNIQUE	CPF (apenas números)
telefone	VARCHAR(255)	-	Telefone para contato
quem_convidou	VARCHAR(255)	-	Colaborador que convidou
setor	ENUM	NOT NULL	Setor da visita
qntd_visitantes	INT	-	Acompanhantes
data	VARCHAR(255)	-	Data da visita
horario	VARCHAR(255)	-	Horário da visita
tipo_perfil	ENUM	DEFAULT 'VISITANTE'	Perfil do usuário
status	ENUM	DEFAULT 'PENDENTE'	Status do cadastro
tipo_visitante	ENUM	-	Categoria do visitante
placa_veiculo	VARCHAR(255)	-	Placa do veículo
observacao	VARCHAR(1000)	-	Observações

🔧 Comandos Úteis

Verificar dados
Comando	Descrição
SELECT * FROM projeto_sidi_db.tb_visitante;	Listar todos os visitantes
SELECT * FROM projeto_sidi_db.tb_visitante WHERE status = 'PENDENTE';	Listar pendentes
SELECT status, COUNT(*) FROM projeto_sidi_db.tb_visitante GROUP BY status;	Contar por status
Corrigir ENUM do banco
sql
SET SQL_SAFE_UPDATES = 0;
UPDATE tb_visitante SET status = 'PENDENTE' WHERE status NOT IN ('AGUARDANDO','ATRASADO','PRESENTE','PENDENTE','APROVADO','RECUSADO','FINALIZADO');
ALTER TABLE tb_visitante MODIFY COLUMN status ENUM('AGUARDANDO','ATRASADO','PRESENTE','PENDENTE','APROVADO','RECUSADO','FINALIZADO') NOT NULL DEFAULT 'PENDENTE';
SET SQL_SAFE_UPDATES = 1;
Recriar o banco
Comando	Descrição
DROP DATABASE IF EXISTS projeto_sidi_db;	Remove o banco
CREATE DATABASE projeto_sidi_db;	Cria novo banco
mvn spring-boot:run	Recria tabelas automaticamente
