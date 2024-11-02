<?php

/**
 * API de Usuários - Documentação dos Endpoints
 * 
 * Base URL: /back-end/controllers/usuarios.php
 * 
 * ENDPOINTS DISPONÍVEIS:
 * 
 * 1. CRIAR NOVO USUÁRIO
 *    POST /usuarios.php
 *    Implementação: Linhas 13-54
 *    Body: {
 *      "nome": "string",
 *      "email": "string",
 *      "senha": "string"
 *    }
 *    Resposta Sucesso: {
 *      "erro": false,
 *      "mensagem": "Usuário cadastrado com sucesso!"
 *    }
 *    Respostas Erro: {
 *      "erro": true,
 *      "mensagem": "Email já cadastrado!" | "Dados incompletos!" | "Erro ao cadastrar usuário!"
 *    }
 * 
 * 2. LISTAR USUÁRIOS (A ser implementado)
 *    GET /usuarios.php
 * 
 * 3. ATUALIZAR USUÁRIO (A ser implementado)
 *    PUT /usuarios.php?id={id}
 * 
 * 4. DELETAR USUÁRIO (A ser implementado)
 *    DELETE /usuarios.php?id={id}
 * 
 * CONFIGURAÇÕES:
 * - Headers CORS: Linhas 2-5
 * - Conexão com banco: Linha 7
 * 
 * VALIDAÇÕES:
 * - Verificação de email duplicado: Linhas 16-20
 * - Validação de dados obrigatórios: Linhas 14-15
 * 
 * CÓDIGOS DE ERRO:
 * - 200: Sucesso (Todas operações)
 * - 500: Erro interno do servidor
 * 
 * OBSERVAÇÕES:
 * - Em produção, implementar hash para senha
 * - Implementar validação de formato de email
 * - Implementar validação de força da senha
 */

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../config/conexao.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        if (isset($_GET['email'])) {
            $email = $_GET['email'];

            $query = "SELECT nome FROM usuarios WHERE email = :email";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':email', $email);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $usuario = $stmt->fetch(PDO::FETCH_ASSOC);
                $response = [
                    "erro" => false,
                    "nome" => $usuario['nome']
                ];
            } else {
                $response = [
                    "erro" => true,
                    "mensagem" => "Usuário não encontrado"
                ];
            }
        }
        break;

    case 'POST':
        $dados = json_decode(file_get_contents("php://input"));

        if (!empty($dados->nome) && !empty($dados->email) && !empty($dados->senha)) {
            $query_verify = "SELECT id FROM usuarios WHERE email = :email LIMIT 1";
            $result_verify = $conn->prepare($query_verify);
            $result_verify->bindParam(':email', $dados->email);
            $result_verify->execute();

            if ($result_verify->rowCount() > 0) {
                $response = [
                    "erro" => true,
                    "mensagem" => "Email já cadastrado!"
                ];
            } else {
                $query_usuario = "INSERT INTO usuarios (nome, email, senha) VALUES (:nome, :email, :senha)";
                $cad_usuario = $conn->prepare($query_usuario);
                $cad_usuario->bindParam(':nome', $dados->nome);
                $cad_usuario->bindParam(':email', $dados->email);
                $cad_usuario->bindParam(':senha', $dados->senha);

                if ($cad_usuario->execute()) {
                    $response = [
                        "erro" => false,
                        "mensagem" => "Usuário cadastrado com sucesso!"
                    ];
                } else {
                    $response = [
                        "erro" => true,
                        "mensagem" => "Erro ao cadastrar usuário!"
                    ];
                }
            }
        } else {
            $response = [
                "erro" => true,
                "mensagem" => "Dados incompletos!"
            ];
        }
        break;
}

http_response_code(200);
echo json_encode($response);
