import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type ISODateString = string;

export type AccountType = "investor" | "talent" | "both";

export interface AppConfig {
  /**
   * Base URL for the UpNext backend (tRPC/REST gateway).
   * Example: https://api.upnext.com
   */
  apiBaseUrl: string;
  /**
   * WalletConnect project id used for wallet connections.
   */
  walletConnectProjectId: string;
  /**
   * Default chain the UI expects for on-chain actions.
   * Polygon mainnet: 137.
   */
  preferredChainId: number;
  /**
   * Feature gate for advanced markets (prediction, secondary trading).
   */
  enableMarkets: boolean;
}

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  accountType: AccountType;
  createdAt: ISODateString;
}

interface AppState {
  config: AppConfig;
  session: {
    user: SessionUser | null;
    accessToken: string | null;
  };
}

interface AppContextType extends AppState {
  setConfig: (next: Partial<AppConfig>) => void;
  setSession: (next: AppState["session"]) => void;
  signOut: () => void;
}

const STORAGE_KEY = "upnext_app_v1";

const defaultState: AppState = {
  config: {
    apiBaseUrl: "",
    walletConnectProjectId: "",
    preferredChainId: 137,
    enableMarkets: true,
  },
  session: {
    user: null,
    accessToken: null,
  },
};

const AppContext = createContext<AppContextType | undefined>(undefined);

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function normalizeBaseUrl(raw: string): string {
  const s = raw.trim();
  if (!s) return "";
  if (!/^https?:\/\//i.test(s)) return "";
  return s.replace(/\/+$/, "");
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    const saved = safeParse<AppState>(localStorage.getItem(STORAGE_KEY));
    if (!saved) return defaultState;
    return {
      ...defaultState,
      ...saved,
      config: {
        ...defaultState.config,
        ...saved.config,
        apiBaseUrl: normalizeBaseUrl(saved.config?.apiBaseUrl ?? ""),
      },
      session: {
        ...defaultState.session,
        ...saved.session,
      },
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const value = useMemo<AppContextType>(
    () => ({
      ...state,
      setConfig: (next) =>
        setState((prev) => ({
          ...prev,
          config: {
            ...prev.config,
            ...next,
            apiBaseUrl:
              next.apiBaseUrl === undefined
                ? prev.config.apiBaseUrl
                : normalizeBaseUrl(next.apiBaseUrl),
          },
        })),
      setSession: (next) => setState((prev) => ({ ...prev, session: next })),
      signOut: () =>
        setState((prev) => ({
          ...prev,
          session: { user: null, accessToken: null },
        })),
    }),
    [state],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within an AppProvider");
  return ctx;
}

