import React, { createContext, useState, useContext } from "react";

// Criação do contexto de autenticação com um objeto vazio como valor inicial
const AuthContext = createContext({});

// Componente Provider que irá envolver a aplicação e fornecer o contexto de autenticação
export const AuthProvider = ({ children }) => {
  // Estado para armazenar os dados do usuário
  // Inicializa verificando se existe um usuário salvo no localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("@Authuser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Função para realizar o login do usuário
  const signIn = async (email, senha) => {
    try {
      console.log("Iniciando tentativa de login");

      // Verificar se o servidor está acessível
      try {
        await fetch("http://localhost:8000/controllers/login.php", {
          method: "OPTIONS",
        });
      } catch (error) {
        console.error("Servidor não está acessível:", error);
        throw new Error(
          "Servidor não está respondendo. Verifique se está rodando na porta 8000"
        );
      }

      // Tentativa de login
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      console.log("Status da resposta:", response.status);
      const data = await response.json();
      console.log("Dados recebidos:", data);

      if (data.erro) {
        throw new Error(data.mensagem);
      }

      setUser(data.usuario);
      localStorage.setItem("@Authuser", JSON.stringify([data.usuario]));
    } catch (err) {
      console.error("Erro no login:", err);
      throw new Error(err.message);
    }
  };

  // Função para realizar o logout do usuário
  const signOut = () => {
    localStorage.removeItem("@Authuser");
    setUser(null);
  };

  // Retorna o Provider com os valores que serão disponibilizados para a aplicação
  return (
    <AuthContext.Provider value={{ user, signed: !!user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para facilitar o uso do contexto de autenticação
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
