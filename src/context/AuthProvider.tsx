import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { AuthContext, AuthContextValue } from "./AuthContext";
import { User } from "../types";

const STORAGE_KEY = "marketplace-auth-user";
const API_URL = "http://localhost:3001";

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar usuario desde localStorage al montar
  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Buscar usuario en json-server
      const response = await fetch(
        `${API_URL}/users?email=${email}&password=${password}`
      );
      const users = await response.json();

      if (users.length === 0) {
        throw new Error("Credenciales inválidas");
      }

      const foundUser = users[0];
      setUser(foundUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(foundUser));
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  }, []);

  const register = useCallback(
    async (nombre: string, email: string, password: string) => {
      try {
        // Verificar si el email ya existe
        const checkResponse = await fetch(`${API_URL}/users?email=${email}`);
        const existingUsers = await checkResponse.json();

        if (existingUsers.length > 0) {
          throw new Error("El email ya está registrado");
        }

        // Crear nuevo usuario (por defecto como SOLICITANTE)
        const newUser: Omit<User, "id"> = {
          nombre,
          email,
          password,
          rol: "SOLICITANTE",
        };

        const response = await fetch(`${API_URL}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        const createdUser = await response.json();
        setUser(createdUser);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(createdUser));
      } catch (error) {
        console.error("Error en registro:", error);
        throw error;
      }
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
