import '@/styles/global.css';

import type { Metadata } from 'next';
// import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { DemoBadge } from '@/components/common/DemoBadge';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { AppConfig } from '@/utils/AppConfig';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!AppConfig.locales.includes(props.params.locale)) notFound();

  const messages = useMessages();

  return (
    <html lang={props.params.locale}>
      <body suppressHydrationWarning={true}>
        <ThemeProvider
          attribute="class"
        >
          <NextIntlClientProvider
            locale={props.params.locale}
            messages={messages}
          >
            {props.children}
            <DemoBadge />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
