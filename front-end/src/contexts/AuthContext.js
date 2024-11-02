import React, { createContext, useState, useContext } from "react";

// Criação do contexto de autenticação com um objeto vazio como valor inicial
const AuthContext = createContext({});

// Componente Provider que irá envolver a aplicação e fornecer o contexto de autenticação
export const AuthProvider = ({ children }) => {
  // Estado para armazenar os dados do usuário
  // Inicializa verificando se existe um usuário salvo no localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("usuario");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Função para realizar o login do usuário
  const signIn = async (email, senha) => {
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (data.erro) {
        throw new Error(data.mensagem);
      }

      setUser(data.usuario);
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Função para realizar o logout do usuário
  const signOut = () => {
    localStorage.removeItem("usuario");
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
