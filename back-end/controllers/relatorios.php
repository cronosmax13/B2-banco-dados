<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

error_log("Controlador de relatórios acionado");

try {
    require_once __DIR__ . '/../config/conexao.php';

    $uri = $_SERVER['REQUEST_URI'];

    if (strpos($uri, 'relatorios/financeiro') !== false) {
        // Relatório Financeiro
        $stmt = $conn->prepare("
            SELECT 
                p.id,
                p.titulo,
                p.quantidade,
                p.valor,
                (p.quantidade * p.valor) as valor_total_estoque
            FROM produtos p
            ORDER BY p.id
        ");
        $stmt->execute();
        $relatorio = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Calcular total geral
        $total_geral = array_reduce($relatorio, function ($carry, $item) {
            return $carry + $item['valor_total_estoque'];
        }, 0);

        echo json_encode([
            "erro" => false,
            "relatorio" => $relatorio,
            "total_geral" => $total_geral
        ]);
    } elseif (strpos($uri, 'relatorios/estoque-baixo') !== false) {
        // Relatório de Estoque Baixo
        $stmt = $conn->prepare("SELECT * FROM vw_produtos_estoque_baixo");
        $stmt->execute();
        $produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "erro" => false,
            "produtos" => $produtos
        ]);
    } else {
        http_response_code(404);
        echo json_encode([
            "erro" => true,
            "mensagem" => "Tipo de relatório não encontrado"
        ]);
    }
} catch (Exception $e) {
    error_log("Erro no relatório: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        "erro" => true,
        "mensagem" => "Erro ao carregar relatório: " . $e->getMessage()
    ]);
}
