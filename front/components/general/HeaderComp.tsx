"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useLogout";
import { useSelector } from "react-redux";
import { RootState } from "@/store";


interface Props {
  toggleMenu: () => void;
}

const HeaderComp = ({ toggleMenu }: Props) => {
  const user = useSelector((state: RootState) => state.user);

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const logout = useLogout();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setShowHeader(true);
      } else {
        setShowHeader(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>



      <header
        className={`sticky top-0 z-50 bg-white shadow-sm p-4  transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
          } bg-white shadow-sm p-4`}
      >
        <div className="flex justify-between items-center">

          <button
            className="cursor-pointer text-blue-500 p-3 lg:hidden"
            onClick={toggleMenu}
          >
            <svg
              className="h-5 w-5 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>


          <div className="lg:hidden" />

          <div className="flex items-center space-x-4 ml-auto">

            {user && user.username ?
              <button
                className="text-sm font-semibold text-red-600 hover:text-red-800 cursor-pointer"
                onClick={logout}
              >
                Logout
              </button> :
              <a
                className="cursor-pointer text-sm font-semibold text-slate-600 hover:text-blue-600"
                onClick={() => router.push("/login")}
              >
                Iniciar Sesión
              </a>

            }

          </div>
        </div>
      </header>
    </>
  );
};

export default HeaderComp;
