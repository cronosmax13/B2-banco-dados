<?php

/**
 * API Principal - Ponto de Entrada
 * 
 * Base Path: /back-end/index.php
 * 
 * DESCRIÇÃO:
 * Arquivo principal que serve como ponto de entrada para todas as requisições da API.
 * Registra logs de requisição e direciona o tráfego para o roteador principal.
 * 
 * FUNCIONALIDADES:
 * 1. Log de Requisições
 *    - Registra a URL completa recebida
 *    - Registra parâmetros de rota (se existirem)
 * 
 * 2. Roteamento
 *    - Inclui e executa o arquivo de rotas
 *    - Todas as requisições são direcionadas para routes.php
 * 
 * LOGS:
 * - URL completa da requisição via $_SERVER['REQUEST_URI']
 * - Parâmetro de rota via $_GET['url']
 * 
 * DEPENDÊNCIAS:
 * - /routes.php (Gerenciamento de rotas)
 * 
 * DEBUG:
 * - Logs detalhados para debug de requisições
 * - Rastreamento de parâmetros de URL
 * 
 * @version 1.0.0
 * @author Felipe Cordeiro
 */

error_log("URL recebida: " . $_SERVER['REQUEST_URI']);
error_log("Route param: " . ($_GET['url'] ?? 'não definida'));

require_once __DIR__ . '/routes.php';
