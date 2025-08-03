"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import { useLogout } from '@/hooks/useLogout';

type Props = {
  toggleMenu: () => void;
}

const HeaderComp = ({ toggleMenu }: Props) => {
  const logout = useLogout();
  const router = useRouter();
  return (
    <header className="bg-white shadow-sm lg:shadow-none lg:bg-transparent p-4 flex justify-between items-center sticky top-0 z-30 lg:z-auto">
      {/* Botón de Hamburguesa (solo en móvil) */}
      <button className="cursor-pointer navbar-burger flex items-center text-blue-500 p-3 lg:hidden" onClick={toggleMenu}>
        <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Mobile menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V6zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>
      {/* Espaciador para centrar el login en móvil */}
      <div className="lg:hidden"></div>
      {/* Botones de Login y Registro */}
      <div className="flex items-center space-x-4">
        <a className="cursor-pointer text-sm font-semibold text-slate-600 hover:text-blue-600" onClick={() => router.push('/login')}>Iniciar Sesión</a>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  )
}

export default HeaderComp