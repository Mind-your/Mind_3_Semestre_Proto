# Mind 3º Semestre - Protótipo

Este repositório contém o código-fonte do protótipo do projeto Mind, dividido em um backend Spring Boot (Java) e um frontend React (Vite).

## Bug Encontrado e Correções Aplicadas

O problema reportado era que **usuários recém-cadastrados não conseguiam fazer login**. A análise e os testes identificaram as seguintes causas e correções:

### 1. Correção do Bug de Login (Causa Principal)

**Problema:** No momento do cadastro, o campo `login` do modelo `Paciente` não estava sendo preenchido, resultando em falha na busca do usuário pelo Spring Security durante o login.

**Correção:** Adicionada lógica no `PacienteController` para preencher o campo `login` com o `email` do usuário, garantindo que o Spring Security consiga encontrar o registro.

*   **Arquivo:** `backend/src/main/java/com/mind_your/mind/controllers/PacienteController.java`
*   **Detalhe:** Adicionada verificação e atribuição do `email` ao `login` no método `cadastrar`.

### 2. Correção de Comunicação (CORS)

**Problema:** O backend estava configurado para aceitar requisições apenas de `localhost`, o que impedia a comunicação com o frontend quando rodando em ambientes de proxy (como o sandbox ou outros ambientes de desenvolvimento).

**Correção:** Atualizado o filtro CORS para aceitar requisições de `localhost` e de qualquer subdomínio do proxy do sandbox (`*.manus.computer`).

*   **Arquivo:** `backend/src/main/java/com/mind_your/mind/config/CustomCorsFilter.java`

### 3. Correção de Inicialização do Backend

**Problema:** O servidor backend não estava iniciando corretamente devido a uma incompatibilidade entre a versão do Java configurada no projeto e a versão disponível no ambiente.

**Correção:** A versão do Java no `pom.xml` foi atualizada para `21`, garantindo a correta inicialização do servidor Spring Boot.

*   **Arquivo:** `backend/pom.xml`
*   **Detalhe:** `<java.version>21</java.version>`

### 4. Correção de Inicialização do Frontend

**Problema:** O servidor de desenvolvimento Vite (frontend) não permitia acesso via proxy.

**Correção:** Adicionada a configuração `server.allowedHosts` no `vite.config.js`.

*   **Arquivo:** `frontend/vite.config.js`

## Como Executar o Projeto

Para rodar o projeto localmente, siga os passos abaixo:

### Pré-requisitos

1.  **Java Development Kit (JDK):** Versão 21 ou superior.
2.  **Node.js:** Versão LTS (recomendado).
3.  **MongoDB:** Servidor MongoDB rodando na porta padrão (27017).

### 1. Iniciar o Backend (Spring Boot)

1.  Navegue até o diretório `backend`.
2.  Execute o comando para iniciar o servidor:
    ```bash
    ./mvnw spring-boot:run
    ```
    O servidor estará acessível em `http://localhost:8080`.

### 2. Iniciar o Frontend (React/Vite)

1.  Navegue até o diretório `frontend`.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
    O frontend estará acessível em `http://localhost:5173`.

Após a inicialização de ambos, o fluxo de cadastro e login deve funcionar corretamente.
