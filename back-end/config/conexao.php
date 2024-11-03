<?php

/**
 * Configuração de Conexão com Banco de Dados
 * 
 * Base Path: /back-end/config/conexao.php
 * 
 * CONFIGURAÇÕES:
 * 
 * 1. PARÂMETROS DE CONEXÃO
 *    - Host: localhost
 *    - Usuário: root
 *    - Senha: root
 *    - Banco: empresa_crud
 * 
 * 2. PDO SETTINGS
 *    - Charset: UTF8
 *    - Error Mode: ERRMODE_EXCEPTION
 * 
 * SEGURANÇA:
 * - Uso de PDO para prepared statements
 * - Tratamento de exceções
 * 
 * LOGS:
 * - Início da conexão
 * - Sucesso da conexão
 * - Erros de conexão
 * 
 * TODO:
 * - Implementar variáveis de ambiente
 * - Adicionar pool de conexões
 * - Configurar timeout
 */

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
