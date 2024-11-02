<?php
try {
    error_log("Iniciando conexão com o banco");

    $servername = "localhost";
    $username = "root";
    $password = "root";      // Ajuste conforme sua configuração
    $dbname = "empresa_crud"; // Ajuste conforme sua configuração

    $conn = new PDO(
        "mysql:host=$servername;dbname=$dbname;charset=utf8",
        $username,
        $password,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    error_log("Conexão estabelecida com sucesso");
} catch (PDOException $e) {
    error_log("Erro na conexão: " . $e->getMessage());
    throw new Exception("Erro na conexão com o banco: " . $e->getMessage());
}
