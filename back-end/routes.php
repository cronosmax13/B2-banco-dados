<?php

/**
 * API Router Principal - Documentação
 * 
 * Base URL: /back-end/index.php
 * 
 * ROTAS DISPONÍVEIS:
 * 
 * 1. PRODUTOS
 *    Rota: /produtos ou /produtos/{id}
 *    Controller: /controllers/produtos.php
 *    Métodos Suportados: GET, POST, PUT, DELETE
 * 
 * 2. LOGIN
 *    Rota: /login
 *    Controller: /controllers/login.php
 *    Métodos Suportados: POST
 * 
 * 3. USUÁRIOS
 *    Rota: /usuarios
 *    Controller: /controllers/usuarios.php
 *    Métodos Suportados: GET, POST, PUT, DELETE
 * 
 * 4. ALTERAR SENHA
 *    Rota: /alterar-senha
 *    Controller: /controllers/usuarios.php
 *    Métodos Suportados: PATCH
 *    Payload Esperado: {
 *      "senha_atual": "string",
 *      "nova_senha": "string"
 *    }
 * 
 * 5. USUÁRIOS - PERFIL
 *    Rota: /usuarios/perfil
 *    Controller: /controllers/usuarios.php
 *    Métodos Suportados: GET, POST, PUT, DELETE
 * 
 * 6. RELATÓRIOS
 *    Rota: /relatorios/estoque-baixo ou /relatorios/financeiro
 *    Controller: /controllers/relatorios.php
 *    Métodos Suportados: GET
 * 
 * 7. PRODUTOS - LOGS
 *    Rota: /produtos/logs
 *    Controller: /controllers/produtos_logs.php
 *    Métodos Suportados: GET
 * 
 * CONFIGURAÇÕES:
 * - Configuração de erros
 * - Configuração CORS
 * - Tratamento OPTIONS
 * 
 * TRATAMENTO DE ERROS:
 * - 404: Rota não encontrada
 * - 500: Erro interno do servidor
 * 
 * PARÂMETROS DE ROTA:
 * - Parsing da URL
 * - Extração de rota e ID
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// Habilitar exibição de erros para debug
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Incluir o arquivo de conexão no início
require_once __DIR__ . '/config/conexao.php';

$url = $_SERVER['REQUEST_URI'];
$url = parse_url($url, PHP_URL_PATH);
$route = trim($url, '/');

try {
    switch ($route) {
        case 'alterar-senha':
            require_once __DIR__ . '/controllers/usuarios.php';
            break;

        case 'login':
            require_once __DIR__ . '/controllers/login.php';
            break;

        case 'produtos':
            require_once __DIR__ . '/controllers/produtos.php';
            break;

        case (preg_match('/^produtos\/\d+$/', $route) ? true : false):
            $id = substr($route, strrpos($route, '/') + 1);
            require_once __DIR__ . '/controllers/produtos.php';
            break;

        case 'usuarios':
            require_once __DIR__ . '/controllers/usuarios.php';
            break;

        case 'alterar-senha':
            require_once __DIR__ . '/controllers/usuarios.php';
            break;

        case 'usuarios/perfil':
            require_once __DIR__ . '/controllers/usuarios.php';
            break;

        case 'relatorios/estoque-baixo':
            require_once __DIR__ . '/controllers/relatorios.php';
            break;

        case 'relatorios/financeiro':
            require_once __DIR__ . '/controllers/relatorios.php';
            break;

        case 'produtos/logs':
            require_once __DIR__ . '/controllers/produtos_logs.php';
            break;

        default:
            http_response_code(404);
            echo json_encode([
                "erro" => true,
                "mensagem" => "Rota não encontrada: " . $route
            ]);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "erro" => true,
        "mensagem" => $e->getMessage()
    ]);
}
