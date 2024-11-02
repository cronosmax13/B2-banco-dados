<?php

/**
 * Configuração de Conexão com Banco de Dados
 * 
 * Base Path: /back-end/config/conexao.php
 * 
 * CONFIGURAÇÕES DO BANCO:
 * 
 * 1. PARÂMETROS DE CONEXÃO
 *    Implementação: Linhas 6-9
 *    Variáveis:
 *    - $servername: "localhost"
 *    - $username: "root"
 *    - $password: "root"
 *    - $dbname: "empresa_crud"
 * 
 * 2. CONFIGURAÇÃO PDO
 *    Implementação: Linhas 11-17
 *    Parâmetros:
 *    - charset: utf8
 *    - PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
 * 
 * LOGS:
 * - Log de início de conexão: Linha 3
 * - Log de conexão bem-sucedida: Linha 19
 * - Log de erro de conexão: Linha 21
 * 
 * TRATAMENTO DE ERROS:
 * - Try/Catch para PDOException: Linhas 2-23
 * - Lançamento de Exception personalizada em caso de erro
 * 
 * OBSERVAÇÕES:
 * - Em produção, mover credenciais para arquivo .env
 * - Considerar implementar pool de conexões
 * - Implementar timeout de conexão
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
