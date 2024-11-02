<?php

/**
 * API de Login - Documentação do Endpoint
 * 
 * Base URL: /back-end/controllers/login.php
 * 
 * ENDPOINT DISPONÍVEL:
 * 
 * 1. REALIZAR LOGIN
 *    POST /login.php
 *    Implementação: Linhas 22-42
 *    Body: {
 *      "email": "string",
 *      "senha": "string"
 *    }
 *    Resposta Sucesso: {
 *      "erro": false,
 *      "mensagem": "Login realizado com sucesso",
 *      "usuario": { id, nome, email }
 *    }
 *    Resposta Erro: {
 *      "erro": true,
 *      "mensagem": "Email ou senha incorretos"
 *    }
 * 
 * CONFIGURAÇÕES:
 * - Headers CORS: Linhas 2-5
 * - Tratamento OPTIONS: Linhas 7-11
 * - Conexão com banco: Linha 24
 * 
 * VALIDAÇÕES:
 * - Método HTTP: Linhas 13-16
 * - Dados do request: Linhas 19-21
 * 
 * CÓDIGOS DE ERRO:
 * - 200: Sucesso (Login realizado)
 * - 401: Não autorizado (Credenciais inválidas)
 * - 500: Erro interno do servidor (Tratamento de exceções: Linhas 43-51)
 * 
 * OBSERVAÇÕES:
 * - Em produção, implementar hash para senha
 * - Implementar token JWT para autenticação
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Se for uma requisição OPTIONS, retorna sucesso imediatamente
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    // Verifica se é POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Método não permitido');
    }

    // Pega o corpo da requisição
    $json = file_get_contents('php://input');
    $dados = json_decode($json, true);

    if (!$dados || !isset($dados['email']) || !isset($dados['senha'])) {
        throw new Exception('Dados inválidos');
    }

    require_once __DIR__ . '/../config/conexao.php';

    $email = $dados['email'];
    $senha = $dados['senha'];

    // Query para buscar usuário
    $query = "SELECT id, nome, email FROM usuarios WHERE email = ? AND senha = ?";
    $stmt = $conn->prepare($query);
    $stmt->execute([$email, $senha]); // Nota: Em produção, use hash para senha!

    if ($stmt->rowCount() > 0) {
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode([
            "erro" => false,
            "mensagem" => "Login realizado com sucesso",
            "usuario" => $usuario
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            "erro" => true,
            "mensagem" => "Email ou senha incorretos"
        ]);
    }
} catch (Exception $e) {
    error_log("Erro no login: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        "erro" => true,
        "mensagem" => "Erro ao realizar login: " . $e->getMessage()
    ]);
}
