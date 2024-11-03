<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
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

        case 'POST':
            $dados = json_decode(file_get_contents('php://input'), true);

            if (!empty($dados['nome']) && !empty($dados['email']) && !empty($dados['senha'])) {
                // Verifica se o email já existe
                $stmt_check = $conn->prepare("SELECT id FROM usuarios WHERE email = ?");
                $stmt_check->execute([$dados['email']]);

                if ($stmt_check->rowCount() > 0) {
                    http_response_code(400);
                    echo json_encode([
                        "erro" => true,
                        "mensagem" => "Este email já está cadastrado"
                    ]);
                    break;
                }

                $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)");
                $resultado = $stmt->execute([$dados['nome'], $dados['email'], $dados['senha']]);

                if ($resultado) {
                    echo json_encode([
                        "erro" => false,
                        "mensagem" => "Usuário cadastrado com sucesso"
                    ]);
                } else {
                    throw new Exception("Erro ao cadastrar usuário");
                }
            } else {
                throw new Exception("Dados incompletos");
            }
            break;

        case 'PATCH':
            $dados = json_decode(file_get_contents('php://input'), true);

            if (!empty($dados['email']) && !empty($dados['senha_atual']) && !empty($dados['nova_senha'])) {
                // Verifica senha atual
                $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = ? AND senha = ?");
                $stmt->execute([$dados['email'], $dados['senha_atual']]);

                if ($stmt->rowCount() > 0) {
                    // Atualiza senha
                    $stmt = $conn->prepare("UPDATE usuarios SET senha = ? WHERE email = ?");
                    $resultado = $stmt->execute([$dados['nova_senha'], $dados['email']]);

                    if ($resultado) {
                        echo json_encode([
                            "erro" => false,
                            "mensagem" => "Senha alterada com sucesso"
                        ]);
                    } else {
                        throw new Exception("Erro ao alterar senha");
                    }
                } else {
                    throw new Exception("Senha atual incorreta");
                }
            } else {
                throw new Exception("Dados incompletos");
            }
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
    http_response_code(500);
    echo json_encode([
        "erro" => true,
        "mensagem" => $e->getMessage()
    ]);
}
