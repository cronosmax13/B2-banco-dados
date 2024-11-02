<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

include_once '../config/conexao.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
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
