<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

try {
    require_once __DIR__ . '/../config/conexao.php';

    $method = $_SERVER['REQUEST_METHOD'];

    switch ($method) {
        case 'GET':
            // Listar usuários
            $stmt = $conn->prepare("SELECT id, nome, email, status FROM usuarios");
            $stmt->execute();
            $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode([
                "erro" => false,
                "usuarios" => $usuarios
            ]);
            break;

        case 'POST':
            // Recebe os dados do corpo da requisição
            $json = file_get_contents('php://input');
            $dados = json_decode($json, true);

            // Verifica se todos os campos necessários foram enviados
            if (!isset($dados['nome']) || !isset($dados['email']) || !isset($dados['senha'])) {
                http_response_code(400);
                echo json_encode([
                    "erro" => true,
                    "mensagem" => "Dados incompletos!"
                ]);
                exit;
            }

            // Verifica se o email já existe
            $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = :email");
            $stmt->bindParam(':email', $dados['email']);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                http_response_code(400);
                echo json_encode([
                    "erro" => true,
                    "mensagem" => "Email já cadastrado!"
                ]);
                exit;
            }

            // Insere o novo usuário (sem criptografia)
            $stmt = $conn->prepare("INSERT INTO usuarios (nome, email, senha, status) VALUES (:nome, :email, :senha, 'ativo')");
            $stmt->bindParam(':nome', $dados['nome']);
            $stmt->bindParam(':email', $dados['email']);
            $stmt->bindParam(':senha', $dados['senha']);

            if ($stmt->execute()) {
                http_response_code(201);
                echo json_encode([
                    "erro" => false,
                    "mensagem" => "Usuário cadastrado com sucesso!"
                ]);
            } else {
                throw new Exception("Erro ao cadastrar usuário");
            }
            break;

        case 'PUT':
            $id = $_GET['id'] ?? null;
            if (!$id) {
                http_response_code(400);
                echo json_encode([
                    "erro" => true,
                    "mensagem" => "ID não fornecido"
                ]);
                exit;
            }

            $json = file_get_contents('php://input');
            $dados = json_decode($json, true);

            $stmt = $conn->prepare("UPDATE usuarios SET nome = :nome, email = :email WHERE id = :id");
            $stmt->bindParam(':nome', $dados['nome']);
            $stmt->bindParam(':email', $dados['email']);
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                echo json_encode([
                    "erro" => false,
                    "mensagem" => "Usuário atualizado com sucesso!"
                ]);
            } else {
                throw new Exception("Erro ao atualizar usuário");
            }
            break;

        case 'DELETE':
            $id = $_GET['id'] ?? null;
            if (!$id) {
                http_response_code(400);
                echo json_encode([
                    "erro" => true,
                    "mensagem" => "ID não fornecido"
                ]);
                exit;
            }

            $stmt = $conn->prepare("DELETE FROM usuarios WHERE id = :id");
            $stmt->bindParam(':id', $id);

            if ($stmt->execute()) {
                echo json_encode([
                    "erro" => false,
                    "mensagem" => "Usuário excluído com sucesso!"
                ]);
            } else {
                throw new Exception("Erro ao excluir usuário");
            }
            break;

        default:
            http_response_code(405);
            echo json_encode([
                "erro" => true,
                "mensagem" => "Método não permitido"
            ]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "erro" => true,
        "mensagem" => "Erro no banco de dados: " . $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "erro" => true,
        "mensagem" => $e->getMessage()
    ]);
}
