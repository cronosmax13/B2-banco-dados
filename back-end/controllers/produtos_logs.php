<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

/**
 * Controlador de Logs de Produtos - Documentação
 * 
 * Base Path: /back-end/controllers/produtos_logs.php
 * 
 * FUNCIONALIDADE:
 * Consulta de histórico de alterações em produtos
 * 
 * ENDPOINT:
 * GET /produtos/logs
 * 
 * RETORNO:
 * Lista dos últimos 100 registros de alterações
 * Inclui:
 * - Dados do produto
 * - Tipo de alteração
 * - Quantidades (anterior e nova)
 * - Data da modificação
 * 
 * JOINS:
 * - Produtos (para dados complementares)
 * 
 * ORDENAÇÃO:
 * - Por data de modificação (DESC)
 * 
 * LIMITE:
 * - 100 registros por consulta
 */


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
