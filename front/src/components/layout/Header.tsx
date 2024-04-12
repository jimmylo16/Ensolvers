import { TsetView, views } from "../GlobalContext";
import { useGlobalState } from "@/hooks/useGlobalContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  setView: TsetView;
};
export const Header = ({ setView }: HeaderProps) => {
  const { isLogged } = useGlobalState();
  const navigate = useNavigate();

  const handleView = (view: views) => {
    setView(view);
    navigate(view);
  };
  const logOut = () => {
    Cookies.remove("token");
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="flex-no-wrap top-0 flex w-full items-center justify-between  bg-slate-50  py-4 shadow-md shadow-black/5 sticky px-12">
      <section className="flex items-center gap-4">
        <span
          className="text-2xl font-bold text-blue-800"
          onClick={() => handleView("")}
        >
          Home
        </span>
      </section>
      <section className="flex items-center gap-4">
        {!isLogged ? (
          <>
            <span
              className="text-xl font-bold text-blue-700 cursor-pointer"
              onClick={() => handleView("login")}
            >
              Login
            </span>
            <span
              className="text-xl font-bold text-blue-700 cursor-pointer"
              onClick={() => handleView("register")}
            >
              Register
            </span>
          </>
        ) : (
          <span
            className="text-xl font-bold text-blue-700 cursor-pointer"
            onClick={logOut}
          >
            Log-Out
          </span>
        )}
      </section>
    </nav>
  );
};
