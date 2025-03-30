/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { createContext, useEffect, useContext, ReactNode, useState } from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import { useUi } from "./UiContext";
import { api } from "@/shared/api/api";
import { useTranslation } from "react-i18next";
import { parseJSON } from "../utils/parseJSON";
import { userModel } from "@/slices/general/entidades/user/user.model";

type User = {
  email: string;
  name: string;
  role: string;
  _id: string;
  createdAt: string;
  phone: string;
  ownerId: string;
};
type AuthProviderProps = {
  children: ReactNode;
};
type LoginCredentials = {
  email: string;
  password: string;
};
type SignupCredentials = LoginCredentials & {
  phone: string;
  name: string;
  role?: string;
  coord?: any;
  passwordConfirmation?: string;
  cpf?: string;
  cnpj?: string;
  cnpjActive?: boolean;
};
type AuthContextData = {
  login(credentials: LoginCredentials): Promise<void>;
  signup(credentials: SignupCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User | null;
  logout: () => void;
  setUser: (user: User) => void;
  userPhoto: any;
  updateUserPhoto: (newPhoto: string) => void;
};
const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const { t } = useTranslation(["PAGES"]);
  const { showModal, setLoading } = useUi();
  const [user, setUser] = useState<User | null>(null);
  const [userPhoto, setUserPhoto] = useState<any>(null);
  const isAuthenticated = !!user;
  const Router = useRouter();
  const logout = () => {
    setCookie(undefined, "belezixadmin.token", "", {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    setCookie(undefined, "belezixadmin.refreshToken", "", {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    setCookie(undefined, "belezixadmin.user", "", {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    signOut();
    setUser(null);
  };
  useEffect(() => {
    const {
      "belezixadmin.user": userComingFromCookie,
      "belezixadmin.photo": photoComingFromCookie,
      "belezixadmin.refreshToken": refreshToken = null,
    } = parseCookies();
    const parsedPhoto = parseJSON(photoComingFromCookie);
    const parsedUser = parseJSON(userComingFromCookie);
    if (parsedUser && refreshToken && parsedUser?.role !== "client") {
      setUser(parsedUser);
    } else {
      signOut();
      // Router.push("/login");
    }
    if (parsedPhoto?.url) {
      setUserPhoto(parsedPhoto);
    }
  }, []);

  const login = async ({ email, password }: LoginCredentials) => {
    try {
      setLoading(true);
      if (!api) {
        throw new Error("API client not initialized");
      }
      const response = await api.post("auth/login", {
        email,
        password,
        passwordConfirmation: password,
      });
      const {
        accessToken: token,
        refreshToken,
        user: userResponse,
      } = response?.data || {};
      const userComing = userModel(userResponse).format();
      console.log(userComing);
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
      setUser(userComing as User);
      api.defaults.timeout = 5000;
      api.defaults.headers["authorization"] = `Bearer ${token}`;
      setLoading(false);
      Router.push("/home");
    } catch (error: any) {
      setLoading(false);
      showModal({
        newModalBody: null,
        type: "error",
        title: t("PAGES:MESSAGES.internalServerError", {
          defaultValue: "Erro no servidor",
        }),
        content: formatMessage(
          error?.response?.data?.message ??
            "Não foi possível concluir o login. Tente novamente mais tarde."
        ),
      });
    }
  };
  const signup = async ({
    email,
    password,
    name,
    phone,
    cpf,
    cnpj,
    cnpjActive,
  }: SignupCredentials) => {
    try {
      setLoading(true);
      if (!api) {
        throw new Error("API client not initialized");
      }
      const response = await api.post("auth/signup", {
        email,
        password,
        passwordConfirmation: password,
        name,
        phone,
        coord: {
          lat: 0,
          lng: 0,
        },
        role: "owner",
        cpf: cnpjActive ? null : cpf,
        cnpj: cnpjActive ? cnpj : null,
      });
      const {
        accessToken: token,
        refreshToken,
        user: userResponse,
      } = response?.data || {};
      const userComing = userModel(userResponse).format();
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
      setUser(userComing as User);
      api.defaults.timeout = 5000;
      api.defaults.headers["authorization"] = `Bearer ${token}`;
      setLoading(false);
      showModal({
        newModalBody: null,
        type: "success",
        title: "Cadastro feito com sucesso",
        content: "Você já pode confirmar seu email.",
      });

      Router.push("/home");
    } catch (error: any) {
      setLoading(false);
      showModal({
        newModalBody: null,
        type: "error",
        title: t("PAGES:MESSAGES.internalServerError", {
          defaultValue: "Erro no servidor",
        }),
        content: formatMessage(
          error?.response?.data?.message ??
            "Não foi possível concluir o login. Tente novamente mais tarde."
        ),
      });
    }
  };
  const updateUserPhoto = (newPhoto: string) => {
    setUserPhoto(newPhoto);
    destroyCookie(undefined, "belezixadmin.photo");
    setCookie(undefined, "belezixadmin.photo", JSON.stringify(newPhoto), {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    destroyCookie(undefined, "belezixadmin.cache");
  };
  return (
    <AuthContext.Provider
      value={{
        signup,
        setUser,
        login,
        isAuthenticated,
        user,
        logout,
        userPhoto,
        updateUserPhoto,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
const isBrowser = typeof window !== "undefined";

export const useAuth = () => {
  if (!isBrowser) {
    return {
      signup: (s) => {},
      setUser: (s) => {},
      login: (s) => {},
      isAuthenticated: false,
      user: null,
      logout: () => {},
      userPhoto: null,
      updateUserPhoto: (s) => {},
    };
  }
  return useContext(AuthContext);
};
const formatMessage = (message: string) => {
  switch (message) {
    case "The received email is already in use":
      return "O e-mail ou a senha estão incorretos";
    default:
      return message;
  }
};
export function signOut() {
  destroyCookie(undefined, "belezixadmin.token");
  destroyCookie(undefined, "belezixadmin.refreshToken");
  destroyCookie(undefined, "belezixadmin.user");
  destroyCookie(undefined, "belezixadmin.cache");
  destroyCookie(undefined, "belezixadmin.photo");
}
