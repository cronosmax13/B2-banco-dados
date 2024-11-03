<?php
error_log("URL recebida: " . $_SERVER['REQUEST_URI']);
error_log("Route param: " . ($_GET['url'] ?? 'não definida'));

require_once __DIR__ . '/routes.php';
