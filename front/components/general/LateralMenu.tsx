import React from 'react'

type Props = {
    isMenuOpen: boolean;
}

const LateralMenu = ({isMenuOpen}: Props) => {
  return (
    <aside
                id="sidebar"
                className={`bg-white text-slate-800 w-64 fixed inset-y-0 left-0 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 border-r border-slate-200`}
              >
                {/* Logo en Sidebar */}
                <div className="flex items-center justify-center p-6 border-b border-slate-200">
                  <h1 className="text-2xl font-bold text-blue-600">Friends futbool pools</h1>
                </div>
                {/* Navegación */}
                <nav className="mt-6">
                  <a href="#" className="flex items-center px-6 py-3 text-blue-600 bg-blue-50">
                    <i data-feather="home" className="w-5 h-5"></i>
                    <span className="mx-4 font-semibold">Inicio</span>
                  </a>
                  <a href="#" className="flex items-center px-6 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                    <i data-feather="shield" className="w-5 h-5"></i>
                    <span className="mx-4">Mis Pollas</span>
                  </a>
                  <a href="#" className="flex items-center px-6 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                    <i data-feather="bar-chart-2" className="w-5 h-5"></i>
                    <span className="mx-4">Rankings</span>
                  </a>
                  <a href="#" className="flex items-center px-6 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                    <i data-feather="users" className="w-5 h-5"></i>
                    <span className="mx-4">Amigos</span>
                  </a>
                  <a href="#" className="flex items-center px-6 py-3 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
                    <i data-feather="settings" className="w-5 h-5"></i>
                    <span className="mx-4">Configuración</span>
                  </a>
                </nav>
              </aside>
  )
}

export default LateralMenu