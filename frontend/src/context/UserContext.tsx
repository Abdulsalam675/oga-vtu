import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getUserData,
  updateUserData,
  type UserData,
} from "../utilities/userStorage";

type UserContextValue = {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  profileComplete: boolean;
  refreshUser: () => void;
  patchUser: (updates: Partial<UserData>) => UserData | null;
};

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(() => getUserData());

  const refreshUser = useCallback(() => {
    setUser(getUserData());
  }, []);

  const patchUser = useCallback((updates: Partial<UserData>) => {
    const next = updateUserData(updates);
    if (next) setUser(next);
    return next;
  }, []);

  const value = useMemo(
    () => ({
      user,
      setUser,
      profileComplete: user?.profileComplete ?? false,
      refreshUser,
      patchUser,
    }),
    [user, refreshUser, patchUser],
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within UserProvider");
  }
  return ctx;
}
