'use client';

import { useEffect, useState } from 'react';
import '@/lib/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return null;

  return <>{children}</>;
}
