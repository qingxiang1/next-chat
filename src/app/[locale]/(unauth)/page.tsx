import { getTranslations } from 'next-intl/server';

import Dashboard from '@/components/pages/dashboard/Dashboard';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function Index(props: { params: { locale: string; }; }) {

  // const t = await getTranslations({
  //   locale: props.params.locale,
  //   namespace: 'Index',
  // });

  return (
    <>
      <Dashboard />
    </>
  );
}
