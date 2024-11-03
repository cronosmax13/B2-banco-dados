<?php
try {
    require_once __DIR__ . '/../config/conexao.php';

    $dados = json_decode(file_get_contents('php://input'), true);

    if (!isset($dados['produto_id']) || !isset($dados['quantidade'])) {
        throw new Exception("Dados incompletos");
    }

    $stmt = $conn->prepare("CALL sp_atualizar_estoque(:produto_id, :quantidade, @mensagem)");
    $stmt->bindParam(':produto_id', $dados['produto_id']);
    $stmt->bindParam(':quantidade', $dados['quantidade']);
    $stmt->execute();

    $stmt = $conn->query("SELECT @mensagem as mensagem");
    $resultado = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode([
        "erro" => false,
        "mensagem" => $resultado['mensagem']
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "erro" => true,
        "mensagem" => $e->getMessage()
    ]);
}
