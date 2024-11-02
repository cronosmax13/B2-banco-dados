<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    $request_uri = $_SERVER['REQUEST_URI'];
    $path = parse_url($request_uri, PHP_URL_PATH);
    $path_parts = explode('/', trim($path, '/'));

    $rota = $path_parts[0] ?? '';
    $id = $path_parts[1] ?? null;

    error_log("Rota: " . $rota . ", ID: " . $id . ", Método: " . $_SERVER['REQUEST_METHOD']);

    switch ($rota) {
        case 'produtos':
            $_REQUEST['id'] = $id; // Passa o ID para o controller
            require_once __DIR__ . '/controllers/produtos.php';
            break;

        case 'login':
            require_once __DIR__ . '/controllers/login.php';
            break;

        case 'usuarios':
            require_once __DIR__ . '/controllers/usuarios.php';
            break;

        default:
            http_response_code(404);
            echo json_encode([
                "erro" => true,
                "mensagem" => "Rota não encontrada"
            ]);
    }
} catch (Exception $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode([
        "erro" => true,
        "mensagem" => $e->getMessage()
    ]);
}
