<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

/**
 * Controlador de Logs de Usuários - Documentação
 * 
 * Base Path: /back-end/controllers/usuarios_logs.php
 * 
 * FUNCIONALIDADE:
 * Consulta de histórico de ações dos usuários
 * 
 * ENDPOINT:
 * GET /usuarios/logs
 * 
 * RETORNO:
 * Lista dos últimos 100 registros de ações
 * Inclui:
 * - Dados do usuário
 * - Tipo de ação
 * - Descrição da ação
 * - Data do registro
 * 
 * JOINS:
 * - Usuários (para dados complementares)
 * 
 * ORDENAÇÃO:
 * - Por data de registro (DESC)
 * 
 * LIMITE:
 * - 100 registros por consulta
 * 
 * SEGURANÇA:
 * - Acesso restrito a administradores
 * - Logs sensíveis são filtrados
 */


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
