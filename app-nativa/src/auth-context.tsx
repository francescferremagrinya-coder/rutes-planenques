import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "./firebase";

type AuthContextValue = {
  user: User | null;
  carregant: boolean;
};

const AuthContext = createContext<AuthContextValue>({ user: null, carregant: true });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [carregant, setCarregant] = useState(true);

  useEffect(() => {
    // Si algú ja havia entrat abans (sessió desada amb AsyncStorage), aquest
    // listener es dispara sol amb l'usuari ja actiu, sense haver de tornar
    // a fer login — és exactament el mateix compte/dades que a la web.
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setCarregant(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, carregant }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
