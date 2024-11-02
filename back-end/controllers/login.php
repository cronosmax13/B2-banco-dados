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
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Max-Age: 3600");
header("Content-Type: application/json; charset=UTF-8");

// Log para debug
error_log("Requisição recebida: " . $_SERVER['REQUEST_METHOD']);

// Tratamento especial para requisições OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Inclui arquivo de conexão
require_once __DIR__ . '/../config/conexao.php';

// Início do POST login = controller
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    error_log("Dados recebidos: " . $json);

    $dados = json_decode($json);

    if (!empty($dados->email) && !empty($dados->senha)) {
        try {
            $query = "SELECT * FROM usuarios WHERE email = :email AND senha = :senha";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':email', $dados->email);
            $stmt->bindParam(':senha', $dados->senha);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
                echo json_encode([
                    "erro" => false,
                    "mensagem" => "Login realizado com sucesso",
                    "usuario" => [
                        "nome" => $usuario['nome'],
                        "email" => $usuario['email']
                    ]
                ]);
            } else {
                echo json_encode([
                    "erro" => true,
                    "mensagem" => "Email ou senha incorretos"
                ]);
            }
        } catch (PDOException $e) {
            error_log("Erro no banco: " . $e->getMessage());
            echo json_encode([
                "erro" => true,
                "mensagem" => "Erro ao realizar login"
            ]);
        }
    } else {
        echo json_encode([
            "erro" => true,
            "mensagem" => "Email e senha são obrigatórios"
        ]);
    }
} else {
    echo json_encode([
        "erro" => true,
        "mensagem" => "Método não permitido"
    ]);
}
