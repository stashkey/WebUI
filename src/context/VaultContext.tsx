import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

interface VaultContextType {
  vault: object;
  setVault: (theme: object) => void;
}

const VaultContext = createContext<VaultContextType | undefined>(undefined);

export const VaultProvider = ({ children }: { children: ReactNode }) => {
  const [vault, setVault] = useState<object>({});
  return (
    <VaultContext.Provider value={{ vault, setVault }}>
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = () => {
  const context = useContext(VaultContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
