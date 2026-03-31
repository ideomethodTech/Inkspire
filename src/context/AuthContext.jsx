"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadStoredUser = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem("user");
      const parsed = stored ? JSON.parse(stored) : null;
      setUser(parsed);
    } catch (err) {
      console.warn("Failed to parse stored user", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStoredUser();
    
    // Listen for storage changes (e.g., from other tabs or manual logout)
    const handleStorage = () => loadStoredUser();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [loadStoredUser]);

  const login = (userData, token) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("user", JSON.stringify(userData));
      window.localStorage.setItem("token", token);
    }
    setUser(userData);
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("user");
      window.localStorage.removeItem("token");
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
