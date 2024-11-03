USE empresa_crud;

-- ====================== CRIAÇÃO DE TABELAS ======================
CREATE TABLE usuarios (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nivel_acesso ENUM('admin', 'usuario') DEFAULT 'usuario',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('ativo', 'inativo') DEFAULT 'ativo'
);

CREATE TABLE produtos (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(220),
    descricao TEXT,
    valor DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    quantidade INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE logs_produtos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    produto_id INT,
    acao VARCHAR(20),
    quantidade_anterior INT,
    quantidade_nova INT,
    data_alteracao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);

CREATE TABLE logs_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    acao VARCHAR(20),
    descricao TEXT,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE login_tentativas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    tentativas INT DEFAULT 0,
    ultimo_erro TIMESTAMP NULL,
    bloqueado BOOLEAN DEFAULT FALSE,
    data_bloqueio TIMESTAMP NULL
);

-- ====================== VIEWS ======================
CREATE VIEW vw_produtos_estoque_baixo AS
SELECT 
    id,
    titulo,
    quantidade,
    CASE 
        WHEN quantidade = 0 THEN 'Sem estoque'
        WHEN quantidade < 10 THEN 'Estoque crítico'
        ELSE 'Estoque baixo'
    END as status_estoque
FROM produtos
WHERE quantidade < 10;

CREATE VIEW vw_relatorio_financeiro AS
SELECT 
    id,
    titulo,
    quantidade,
    valor,
    (quantidade * valor) as valor_total_estoque
FROM produtos;

-- ====================== FUNCTIONS ======================
DELIMITER //
CREATE FUNCTION fn_verificar_credenciais(p_email VARCHAR(100), p_senha VARCHAR(255)) 
RETURNS BOOLEAN
DETERMINISTIC
BEGIN
    DECLARE v_count INT;
    SELECT COUNT(*) INTO v_count
    FROM usuarios 
    WHERE email = p_email 
    AND senha = p_senha 
    AND status = 'ativo';
    RETURN v_count > 0;
END //
DELIMITER ;

-- ====================== PROCEDURES ======================
DELIMITER //
CREATE PROCEDURE sp_atualizar_estoque(
    IN p_produto_id INT,
    IN p_quantidade INT,
    OUT p_mensagem VARCHAR(100)
)
BEGIN
    IF p_quantidade < 0 THEN
        SET p_mensagem = 'Quantidade não pode ser negativa';
    ELSE
        UPDATE produtos 
        SET quantidade = p_quantidade
        WHERE id = p_produto_id;
        SET p_mensagem = 'Estoque atualizado com sucesso';
    END IF;
END //
DELIMITER ;

-- ====================== TRIGGERS ======================
DELIMITER //
CREATE TRIGGER tr_before_insert_produto
BEFORE INSERT ON produtos
FOR EACH ROW
BEGIN
    IF NEW.valor < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Valor não pode ser negativo';
    END IF;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER tr_after_update_produto
AFTER UPDATE ON produtos
FOR EACH ROW
BEGIN
    INSERT INTO logs_produtos (
        produto_id,
        acao,
        quantidade_anterior,
        quantidade_nova
    )
    VALUES (
        NEW.id,
        'UPDATE',
        OLD.quantidade,
        NEW.quantidade
    );
END //
DELIMITER ;

-- 5 tabelas
-- 2 views
-- 1 function (verificação de credenciais)
-- 1 procedure (atualização de estoque)
-- 2 triggers (validação e log de produtos)