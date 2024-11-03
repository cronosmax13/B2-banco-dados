<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

try {
    require_once __DIR__ . '/../config/conexao.php';

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            $stmt = $conn->prepare("
                SELECT 
                    id,
                    nome,
                    email,
                    nivel_acesso,
                    created_at,
                    updated_at
                FROM usuarios
                ORDER BY id
            ");
            $stmt->execute();
            $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode([
                "erro" => false,
                "usuarios" => $usuarios
            ]);
            break;

        default:
            http_response_code(405);
            echo json_encode([
                "erro" => true,
                "mensagem" => "Método não permitido"
            ]);
            break;
    }
} catch (Exception $e) {
    error_log("Erro no controlador de usuários: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        "erro" => true,
        "mensagem" => "Erro ao processar requisição: " . $e->getMessage()
    ]);
}
