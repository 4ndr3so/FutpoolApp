"use client";
import { useAuth } from "@/context/AuthContext";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';

// Extend the Window interface to include the feather property.
// This tells TypeScript that the global 'window' object can have a 'feather' property
// with a 'replace' method, which is added by the external Feather Icons script.
// Using `feather?` makes it optional, preventing errors if the script fails to load.
declare global {
  interface Window {
    feather?: {
      replace: (options?: object) => void;
    };
  }
}

export default function PublicPage() {
  //translation
   const { t } = useTranslation('common');
  /////
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const { user: firebaseUser, loading } = useAuth();
  const user = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  /////
  
  /////
  // useEffect(() => {
  //   if (window.feather) {
  //     window.feather.replace();
  //   }
  // }, [isMenuOpen]); // Se re-ejecuta si el menú cambia para asegurar que los iconos se rendericen

  // Función para alternar el estado del menú
  

  return (   
        <main className="flex-1 p-6 md:p-8 lg:p-12">

          {/* Sección Hero */}
          <section className="text-center">
            <div className="max-w-3xl mx-auto">
              <span className="text-blue-600 font-semibold mb-2 block">{t('mainSlogan')}</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-4 leading-tight">{t('playWithFriends')}</h2>
              <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
               {t('createYourPolla')}
              </p>
              <a href="#" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold hover:bg-blue-700 transition-transform hover:scale-105 inline-block shadow-lg">
                {t('createMyPolla')}
              </a>
            </div>
            <div className="mt-12">
              <img src="https://placehold.co/1200x600/e2e8f0/475569?text=Vista+Previa+de+la+App" alt="Vista previa de la aplicación en un dispositivo" className="rounded-2xl shadow-2xl mx-auto w-full max-w-4xl" />
            </div>
          </section>

          {/* Sección Cómo Funciona */}
          <section className="py-20 mt-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-bold text-slate-900">{t('howItWorks')}</h3>
              <p className="text-lg text-slate-500 mt-2">{t('fourSteps')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {/* Paso 1 */}
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">{t('createGroup')}</h4>
                <p className="text-slate-500">{t('createGroupDesc')}</p>
              </div>
              {/* Paso 2 */}
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">{t('inviteFriends')}</h4>
                <p className="text-slate-500">{t('inviteFriendsDesc')}</p>
              </div>
              {/* Paso 3 */}
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">{t('makePredictions')}</h4>
                <p className="text-slate-500">{t('makePredictionsDesc')}</p>
              </div>
              {/* Paso 4 */}
              <div className="bg-white p-6 rounded-xl shadow-md text-center">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h4 className="text-xl font-semibold mb-2">{t('scoreAndWin')}</h4>
                <p className="text-slate-500">{t('scoreAndWinDesc')}</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="text-center mt-12 py-8 border-t border-slate-200">
            <p className="text-slate-500">&copy; {t('copyright')}</p>
          </footer>

        </main>
     
  );
}
