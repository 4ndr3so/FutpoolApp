//-i18n-provider
'use client';

import { useEffect, useState } from 'react';
import i18n from '@/i18n';

void i18n; // 👈 "Use" it to avoid TS warning

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Delay rendering until after hydration
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return <>{children}</>;
}
