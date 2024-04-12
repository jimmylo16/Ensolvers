import { NavLink } from "react-router-dom";
type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <nav className="flex justify-between items-center p-5 border-b-primary-green border-2 mb-5">
        <NavLink to="/">viio</NavLink>
        <div className="flex gap-2">
          <NavLink to="/login">login</NavLink>
          <NavLink to="/register">register</NavLink>
        </div>
      </nav>
      <main
        className={`flex min-h-screen flex-col items-center justify-between px-5 py-[30px] mb-5 `}
      >
        {children}
      </main>
    </>
  );
};
