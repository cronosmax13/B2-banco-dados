<?php

/**
 * API de Produtos - Documentação dos Endpoints
 * 
 * Base URL: /back-end/controllers/produtos.php
 * 
 * ENDPOINTS DISPONÍVEIS:
 * 
 * 1. LISTAR TODOS OS PRODUTOS
 *    GET /produtos.php
 *    Implementação: Linhas 89-99
 *    Retorna: Lista de todos os produtos ordenados por ID decrescente
 *    Resposta: {
 *      "erro": false,
 *      "records": [{ id, titulo, descricao }, ...]
 *    }
 * 
 * 2. BUSCAR PRODUTO ESPECÍFICO
 *    GET /produtos.php?id={id}
 *    Implementação: Linhas 65-87
 *    Retorna: Detalhes de um produto específico
 *    Resposta: {
 *      "erro": false,
 *      "produto": { id, titulo, descricao }
 *    }
 * 
 * 3. CRIAR NOVO PRODUTO
 *    POST /produtos.php
 *    Implementação: Linhas 147-170
 *    Body: {
 *      "titulo": "string",
 *      "descricao": "string",
 *      "valor": "decimal",
 *      "quantidade": "integer"
 *    }
 *    Resposta: {
 *      "erro": false,
 *      "mensagem": "Produto cadastrado com sucesso"
 *    }
 * 
 * 4. ATUALIZAR PRODUTO
 *    PUT /produtos.php?id={id}
 *    Implementação: Linhas 114-145
 *    Body: {
 *      "titulo": "string",
 *      "descricao": "string",
 *      "valor": "decimal",
 *      "quantidade": "integer"
 *    }
 *    Resposta: {
 *      "erro": false,
 *      "mensagem": "Produto atualizado com sucesso"
 *    }
 * 
 * 5. DELETAR PRODUTO
 *    DELETE /produtos.php?id={id}
 *    Implementação: Linhas 101-112
 *    Resposta: {
 *      "erro": false,
 *      "mensagem": "Produto excluído com sucesso"
 *    }
 * 
 * CÓDIGOS DE ERRO:
 * - 200: Sucesso (Todas operações bem-sucedidas)
 * - 404: Produto não encontrado (GET com ID inválido)
 * - 500: Erro interno do servidor (Tratamento de exceções: Linhas 173-182)
 * 
 * Configuração Inicial:
 * - Conexão com banco de dados: Linha 56
 * - Configuração do método e ID: Linhas 59-60
 */
try {
    // Inclui o arquivo de configuração da conexão com o banco de dados
    require_once __DIR__ . '/../config/conexao.php';

    // Obtém o método HTTP da requisição e o ID do produto (se fornecido)
    $method = $_SERVER['REQUEST_METHOD'];
    $id = $_REQUEST['id'] ?? null;

    error_log("Método: $method, ID: $id");

    // Início do switch produtos = controller
    switch ($method) {
        case 'GET':
            // Início do GET produtos
            if ($id) {
                // ENDPOINT 2: Buscar produto específico
                $stmt = $conn->prepare("SELECT * FROM produtos WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $stmt->execute();
                // Verifica se o produto foi encontrado
                if ($stmt->rowCount() > 0) {
                    $produto = $stmt->fetch(PDO::FETCH_ASSOC);
                    echo json_encode([
                        "erro" => false,
                        "produto" => $produto
                    ]);
                } else {
                    // Retorna um erro 404 se o produto não foi encontrado
                    http_response_code(404);
                    echo json_encode([
                        "erro" => true,
                        "mensagem" => "Produto não encontrado"
                    ]);
                }
                // Final do GET produtos com ID
            } else {
                // ENDPOINT 1: Listar todos os produtos
                $stmt = $conn->prepare("SELECT * FROM produtos");
                $stmt->execute();
                $produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

                echo json_encode([
                    "erro" => false,
                    "produtos" => $produtos
                ]);
            }
            // Final do GET produtos
            break;

        case 'DELETE':
            // Início do DELETE produtos
            if (!$id) {
                throw new Exception("ID não fornecido");
            }

            error_log("Tentando deletar produto ID: $id");

            $stmt = $conn->prepare("DELETE FROM produtos WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                echo json_encode([
                    "erro" => false,
                    "mensagem" => "Produto excluído com sucesso"
                ]);
            } else {
                throw new Exception("Produto não encontrado");
            }
            // Final do DELETE produtos
            break;

        case 'PUT':
            // Início do PUT produtos
            if (!$id) {
                throw new Exception("ID não fornecido");
            }

            // Pega o corpo da requisição
            $dados = json_decode(file_get_contents('php://input'), true);

            if (!$dados || !isset($dados['titulo']) || !isset($dados['descricao'])) {
                throw new Exception("Dados inválidos");
            }

            error_log("Atualizando produto ID: $id");
            error_log("Dados recebidos: " . json_encode($dados));

            $stmt = $conn->prepare("UPDATE produtos SET titulo = :titulo, descricao = :descricao, valor = :valor, quantidade = :quantidade WHERE id = :id");
            $stmt->bindParam(':titulo', $dados['titulo']);
            $stmt->bindParam(':descricao', $dados['descricao']);
            $stmt->bindParam(':valor', $dados['valor']);
            $stmt->bindParam(':quantidade', $dados['quantidade']);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                echo json_encode([
                    "erro" => false,
                    "mensagem" => "Produto atualizado com sucesso"
                ]);
            } else {
                throw new Exception("Erro ao atualizar produto");
            }
            // Final do PUT produtos
            break;

        case 'POST':
            // Início do POST produtos
            $dados = json_decode(file_get_contents('php://input'), true);

            if (!$dados || !isset($dados['titulo']) || !isset($dados['descricao'])) {
                throw new Exception("Dados inválidos");
            }

            try {
                // Inicia a transação
                $conn->beginTransaction();

                // Cadastra o produto diretamente
                $stmt = $conn->prepare("INSERT INTO produtos (titulo, descricao, valor, quantidade) VALUES (:titulo, :descricao, :valor, :quantidade)");
                $stmt->bindParam(':titulo', $dados['titulo']);
                $stmt->bindParam(':descricao', $dados['descricao']);
                $stmt->bindParam(':valor', $dados['valor']);
                $stmt->bindParam(':quantidade', $dados['quantidade']);
                $stmt->execute();

                // Pega o ID do produto inserido
                $produto_id = $conn->lastInsertId();

                // Insere o log
                $stmt_log = $conn->prepare("
                    INSERT INTO logs_produtos 
                    (produto_id, acao, quantidade_anterior, quantidade_nova) 
                    VALUES 
                    (:produto_id, 'INSERT', 0, :quantidade)
                ");
                $stmt_log->bindParam(':produto_id', $produto_id);
                $stmt_log->bindParam(':quantidade', $dados['quantidade']);
                $stmt_log->execute();

                // Confirma a transação
                $conn->commit();

                echo json_encode([
                    "erro" => false,
                    "mensagem" => "Produto cadastrado com sucesso"
                ]);
            } catch (PDOException $e) {
                // Desfaz a transação em caso de erro
                $conn->rollBack();
                throw $e;
            }
            // Final do POST produtos
            break;

        default:
            throw new Exception("Método não permitido");
    }
} catch (Exception $e) {
    // Manipulação centralizada de erros
    // Registra o erro e retorna uma resposta JSON apropriada
    error_log("Erro: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        "erro" => true,
        "mensagem" => $e->getMessage()
    ]);
}
