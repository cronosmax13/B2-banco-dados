<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

try {
    require_once __DIR__ . '/../config/conexao.php';

    $stmt = $conn->prepare("
        SELECT 
            l.*,
            p.titulo as produto_nome,
            p.descricao as produto_descricao
        FROM logs_produtos l
        JOIN produtos p ON p.id = l.produto_id
        ORDER BY l.data_modificacao DESC
        LIMIT 100
    ");
    $stmt->execute();
    $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "erro" => false,
        "logs" => $logs
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "erro" => true,
        "mensagem" => "Erro ao carregar logs: " . $e->getMessage()
    ]);
}
