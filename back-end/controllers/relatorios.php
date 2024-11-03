<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

error_log("Controlador de relatórios acionado");

try {
    require_once __DIR__ . '/../config/conexao.php';

    error_log("Executando query de estoque baixo");
    $stmt = $conn->prepare("SELECT * FROM vw_produtos_estoque_baixo");
    $stmt->execute();
    $produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    error_log("Produtos encontrados: " . json_encode($produtos));

    echo json_encode([
        "erro" => false,
        "produtos" => $produtos
    ]);
} catch (Exception $e) {
    error_log("Erro no relatório: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        "erro" => true,
        "mensagem" => "Erro ao carregar relatório: " . $e->getMessage()
    ]);
}
