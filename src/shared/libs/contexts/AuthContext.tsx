import { createContext, useEffect, useContext, ReactNode, useState, useMemo } from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "shared/api";
type User = {
  email: string;
  role: string;
  _id: string;
};
type AuthProviderProps = {
  children: ReactNode;
};
type LoginCredentials = {
  email: string;
  password: string;
};
type AuthContextData = {
  login(credentials: LoginCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User | null;
};
const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;
  const parseJSON = (json: string) => {
    try {
      return JSON.parse(json);
    } catch (error) {
      return null;
    }
  };
  useEffect(() => {
    const {
      "belezixadmin.user": userComingFromCookie,
      "belezixadmin.refreshToken": refreshToken = null,
    } = parseCookies();
    const parsedUser = parseJSON(userComingFromCookie);
    if (parsedUser && refreshToken) {
      setUser(parsedUser);
    } else {
      signOut();
    }
  }, []);

  const login = async ({ email, password }: LoginCredentials) => {
    try {
      const response = await api.post("auth/login", {
        email,
        password,
        passwordConfirmation: password,
      });
      const { accessToken: token, refreshToken, user: userComing } = response?.data || {};
      setCookie(undefined, "belezixadmin.token", token, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setCookie(undefined, "belezixadmin.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setCookie(undefined, "belezixadmin.user", JSON.stringify(userComing), {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      });
      setUser(userComing);
      api.defaults.timeout = 5000;
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
      Router.push("/");
    } catch (error) {
      alert("erro no servidor");
    }
  };
  const contextValue = useMemo(
    () => ({ login, isAuthenticated, user }),
    [isAuthenticated, user]
  );
  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);

export function signOut() {
  destroyCookie(undefined, "belezixadmin.token");
  destroyCookie(undefined, "belezixadmin.refreshToken");
  destroyCookie(undefined, "belezixadmin.user");
  Router.push("/");
}
