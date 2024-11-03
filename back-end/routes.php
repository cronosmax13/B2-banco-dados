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
 *    Implementação: Linhas 20-22
 *    Controller: /controllers/produtos.php
 *    Métodos Suportados: GET, POST, PUT, DELETE
 * 
 * 2. LOGIN
 *    Rota: /login
 *    Implementação: Linhas 24-26
 *    Controller: /controllers/login.php
 *    Métodos Suportados: POST
 * 
 * 3. USUÁRIOS
 *    Rota: /usuarios
 *    Implementação: Linhas 28-30
 *    Controller: /controllers/usuarios.php
 *    Métodos Suportados: GET, POST, PUT, DELETE
 * 
 * 4. CADASTRO
 *    Rota: /cadastrar
 *    Implementação: Linhas 32-34
 *    Controller: /controllers/usuarios.php
 *    Métodos Suportados: POST
 * 
 * 5. ALTERAR SENHA (TODO)
 *    Rota: /usuarios/{id}/senha
 *    Implementação Futura: Será adicionado como PATCH em usuarios.php
 *    Métodos Suportados: PATCH
 *    Payload Esperado: {
 *      "senha_atual": "string",
 *      "nova_senha": "string"
 *    }
 *    Resposta Esperada: {
 *      "erro": false,
 *      "mensagem": "Senha alterada com sucesso"
 *    }
 * 
 * 6. USUÁRIOS - PERFIL
 *    Rota: /usuarios/perfil
 *    Implementação: Linhas 36-38
 *    Controller: /controllers/usuarios.php
 *    Métodos Suportados: GET, POST, PUT, DELETE
 * 
 * CONFIGURAÇÕES:
 * - Configuração de erros: Linhas 2-3
 * - Configuração CORS: Linhas 5-7
 * - Tratamento OPTIONS: Linhas 9-12
 * 
 * TRATAMENTO DE ERROS:
 * - 404: Rota não encontrada (Linhas 32-38)
 * - 500: Erro interno do servidor (Linhas 39-46)
 * 
 * PARÂMETROS DE ROTA:
 * - Parsing da URL: Linhas 14-17
 * - Extração de rota e ID: Linhas 19-20
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
