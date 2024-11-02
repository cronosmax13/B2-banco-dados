<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/conexao.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dados = json_decode(file_get_contents("php://input"));

    if (!empty($dados->email) && !empty($dados->senha_atual) && !empty($dados->nova_senha)) {
        try {
            // Verifica se o usuário está bloqueado
            $query_bloqueio = "SELECT bloqueado, tentativas FROM login_tentativas 
                             WHERE email = ? AND bloqueado = TRUE";
            $stmt_bloqueio = $conn->prepare($query_bloqueio);
            $stmt_bloqueio->execute([$dados->email]);

            if ($stmt_bloqueio->rowCount() > 0) {
                throw new Exception("Conta bloqueada. Entre em contato com o suporte.");
            }

            // Verifica senha atual
            $query_senha = "SELECT id FROM usuarios 
                          WHERE email = ? AND senha = ? AND status = 'ativo'";
            $stmt_senha = $conn->prepare($query_senha);
            $stmt_senha->execute([$dados->email, $dados->senha_atual]);

            if ($stmt_senha->rowCount() === 0) {
                // Incrementa tentativas
                $conn->beginTransaction();

                // Verifica se já existe registro para o email
                $query_check = "SELECT id, tentativas FROM login_tentativas WHERE email = ?";
                $stmt_check = $conn->prepare($query_check);
                $stmt_check->execute([$dados->email]);
                $registro = $stmt_check->fetch(PDO::FETCH_ASSOC);

                if ($registro) {
                    // Atualiza tentativas existentes
                    $novas_tentativas = $registro['tentativas'] + 1;
                    $query_update = "UPDATE login_tentativas 
                                   SET tentativas = ?, 
                                       ultimo_erro = CURRENT_TIMESTAMP,
                                       bloqueado = IF(? >= 3, TRUE, FALSE),
                                       data_bloqueio = IF(? >= 3, CURRENT_TIMESTAMP, NULL)
                                   WHERE email = ?";
                    $stmt_update = $conn->prepare($query_update);
                    $stmt_update->execute([$novas_tentativas, $novas_tentativas, $novas_tentativas, $dados->email]);

                    if ($novas_tentativas >= 3) {
                        // Atualiza status do usuário
                        $query_usuario = "UPDATE usuarios SET status = 'inativo' WHERE email = ?";
                        $stmt_usuario = $conn->prepare($query_usuario);
                        $stmt_usuario->execute([$dados->email]);

                        $conn->commit();
                        throw new Exception("Conta bloqueada após múltiplas tentativas.");
                    }
                } else {
                    // Insere novo registro
                    $query_insert = "INSERT INTO login_tentativas 
                                   (email, tentativas, ultimo_erro) 
                                   VALUES (?, 1, CURRENT_TIMESTAMP)";
                    $stmt_insert = $conn->prepare($query_insert);
                    $stmt_insert->execute([$dados->email]);
                }

                $conn->commit();
                throw new Exception("Senha atual incorreta.");
            }

            // Atualiza senha
            $query_update = "UPDATE usuarios SET senha = ? WHERE email = ?";
            $stmt_update = $conn->prepare($query_update);

            if ($stmt_update->execute([$dados->nova_senha, $dados->email])) {
                // Limpa tentativas de login
                $query_limpa = "UPDATE login_tentativas 
                               SET tentativas = 0, 
                                   bloqueado = FALSE, 
                                   data_bloqueio = NULL 
                               WHERE email = ?";
                $stmt_limpa = $conn->prepare($query_limpa);
                $stmt_limpa->execute([$dados->email]);

                // Reativa o usuário
                $query_reativa = "UPDATE usuarios SET status = 'ativo' WHERE email = ?";
                $stmt_reativa = $conn->prepare($query_reativa);
                $stmt_reativa->execute([$dados->email]);

                echo json_encode([
                    "erro" => false,
                    "mensagem" => "Senha alterada com sucesso!"
                ]);
            } else {
                throw new Exception("Erro ao atualizar senha");
            }
        } catch (Exception $e) {
            if ($conn->inTransaction()) {
                $conn->rollBack();
            }
            echo json_encode([
                "erro" => true,
                "mensagem" => $e->getMessage()
            ]);
        }
    } else {
        echo json_encode([
            "erro" => true,
            "mensagem" => "Dados incompletos!"
        ]);
    }
}
