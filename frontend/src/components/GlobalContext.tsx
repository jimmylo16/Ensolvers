import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Header } from "./layout/Header";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Toaster } from "./ui/toaster";

export type views = "" | "login" | "register";

export type TsetView = contextDispatch<views>;

type contextDispatch<T> = Dispatch<SetStateAction<T>> | ((views: T) => void);
type ContextType = {
  view: views;
  setView: TsetView;
  setIsLogged: contextDispatch<boolean>;
  isLogged: boolean;
};
export const GlobalContext = createContext<ContextType>({
  view: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setView: (_views: views) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setIsLogged: (_islogged: boolean) => {},
  isLogged: false,
});

export const GlobalProvider = () => {
  const [view, setView] = useState<views>("");
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLogged(true);
      navigate("/");
    } else {
      setIsLogged(false);
    }
  }, [navigate]);

  return (
    <GlobalContext.Provider value={{ setView, view, setIsLogged, isLogged }}>
      <Header setView={setView} />
      <main
        className={`flex min-h-screen flex-col items-center  sm:px-24 sm:pt-8 `}
      >
        <Outlet />
        <Toaster />
      </main>
    </GlobalContext.Provider>
  );
};
