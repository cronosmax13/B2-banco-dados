<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

/**
 * Controlador de Relatórios - Documentação
 * 
 * Base Path: /back-end/controllers/relatorios.php
 * 
 * ENDPOINTS:
 * 
 * 1. RELATÓRIO FINANCEIRO
 *    GET /relatorios/financeiro
 *    Utiliza: vw_relatorio_financeiro
 *    Retorna: {
 *      "erro": false,
 *      "relatorio": [{ id, titulo, quantidade, valor, valor_total_estoque }],
 *      "total_geral": "decimal"
 *    }
 * 
 * 2. RELATÓRIO DE ESTOQUE BAIXO
 *    GET /relatorios/estoque-baixo
 *    Utiliza: vw_produtos_estoque_baixo
 *    Retorna: {
 *      "erro": false,
 *      "produtos": [{ id, titulo, quantidade, status_estoque }]
 *    }
 * 
 * VIEWS UTILIZADAS:
 * - vw_relatorio_financeiro
 * - vw_produtos_estoque_baixo
 * 
 * LOGS:
 * - Registro de acionamento do controlador
 * - Log de erros detalhado
 */

error_log("Controlador de relatórios acionado");

try {
    require_once __DIR__ . '/../config/conexao.php';

    $uri = $_SERVER['REQUEST_URI'];

    if (strpos($uri, 'relatorios/financeiro') !== false) {
        // Relatório Financeiro usando a view
        $stmt = $conn->prepare("SELECT * FROM vw_relatorio_financeiro");
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
        // Relatório de Estoque Baixo usando a view
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
