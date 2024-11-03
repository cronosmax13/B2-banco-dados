<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

try {
    require_once __DIR__ . '/../config/conexao.php';
    // Início do switch usuarios = controller
    $method = $_SERVER['REQUEST_METHOD'];
    switch ($method) {
        case 'GET':
            // Verifica se foi fornecido um ID
            $id = $_GET['id'] ?? null;

            if ($id) {
                // Visualizar usuário específico
                $stmt = $conn->prepare("SELECT id, nome, email, status FROM usuarios WHERE id = :id");
                $stmt->bindParam(':id', $id);
                $stmt->execute();
                $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($usuario) {
                    echo json_encode([
                        "erro" => false,
                        "usuario" => $usuario
                    ]);
                } else {
                    http_response_code(404);
                    echo json_encode([
                        "erro" => true,
                        "mensagem" => "Usuário não encontrado"
                    ]);
                }
            } else {
                // Listar todos os usuários (código existente)
                $stmt = $conn->prepare("SELECT id, nome, email, status FROM usuarios");
                $stmt->execute();
                $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

                echo json_encode([
                    "erro" => false,
                    "usuarios" => $usuarios
                ]);
            }
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
            $json = file_get_contents('php://input');
            $dados = json_decode($json, true);

            if (!isset($dados['email']) || !isset($dados['nome'])) {
                echo json_encode([
                    "erro" => true,
                    "mensagem" => "Dados incompletos"
                ]);
                exit;
            }

            try {
                // Prepara a query de atualização
                $campos = [];
                $valores = [];

                if (isset($dados['nome']) && !empty($dados['nome'])) {
                    $campos[] = "nome = :nome";
                    $valores[':nome'] = $dados['nome'];
                }

                if (isset($dados['nivel_acesso']) && !empty($dados['nivel_acesso'])) {
                    $campos[] = "nivel_acesso = :nivel_acesso";
                    $valores[':nivel_acesso'] = $dados['nivel_acesso'];
                }

                if (isset($dados['senha']) && !empty($dados['senha'])) {
                    $campos[] = "senha = :senha";
                    $valores[':senha'] = $dados['senha'];
                }

                if (empty($campos)) {
                    echo json_encode([
                        "erro" => true,
                        "mensagem" => "Nenhuma alteração realizada"
                    ]);
                    exit;
                }

                $sql = "UPDATE usuarios SET " . implode(', ', $campos) . " WHERE email = :email";
                $stmt = $conn->prepare($sql);

                $stmt->bindParam(':email', $dados['email']);
                foreach ($valores as $param => $value) {
                    $stmt->bindParam($param, $valores[$param]);
                }

                if ($stmt->execute()) {
                    echo json_encode([
                        "erro" => false,
                        "mensagem" => "Perfil atualizado com sucesso!"
                    ]);
                } else {
                    throw new Exception("Erro ao atualizar perfil");
                }
            } catch (PDOException $e) {
                echo json_encode([
                    "erro" => true,
                    "mensagem" => "Erro ao atualizar perfil: " . $e->getMessage()
                ]);
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

        case 'PATCH':
            $json = file_get_contents('php://input');
            $dados = json_decode($json, true);

            if (!isset($dados['email']) || !isset($dados['senha_atual'])) {
                http_response_code(400);
                echo json_encode([
                    "erro" => true,
                    "mensagem" => "Dados incompletos"
                ]);
                exit;
            }

            // Verifica se o usuário existe e se a senha atual está correta
            $stmt = $conn->prepare("SELECT id FROM usuarios WHERE email = :email AND senha = :senha");
            $stmt->bindParam(':email', $dados['email']);
            $stmt->bindParam(':senha', $dados['senha_atual']);
            $stmt->execute();

            if ($stmt->rowCount() === 0) {
                http_response_code(401);
                echo json_encode([
                    "erro" => true,
                    "mensagem" => "Email ou senha atual incorretos"
                ]);
                exit;
            }

            // Atualiza a senha
            $stmt = $conn->prepare("UPDATE usuarios SET senha = :nova_senha WHERE email = :email");
            $stmt->bindParam(':nova_senha', $dados['nova_senha']);
            $stmt->bindParam(':email', $dados['email']);

            if ($stmt->execute()) {
                echo json_encode([
                    "erro" => false,
                    "mensagem" => "Senha alterada com sucesso"
                ]);
            } else {
                throw new Exception("Erro ao alterar senha");
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
