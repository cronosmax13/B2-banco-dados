<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

try {
    require_once __DIR__ . '/../config/conexao.php';

    $stmt = $conn->prepare("
        SELECT 
            l.*,
            u.nome as usuario_nome,
            u.email as usuario_email
        FROM logs_usuarios l
        JOIN usuarios u ON u.id = l.usuario_id
        ORDER BY l.data_registro DESC
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
