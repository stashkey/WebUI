import { createContext, useContext, useState, ReactNode } from "react";

interface AuthState {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthContextType {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthState>({
    username: null,
    token: null,
    isAuthenticated: true,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("Not using AuthProvider in parent ");
  }
  return context;
};
