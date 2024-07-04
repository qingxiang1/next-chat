import { getTranslations } from 'next-intl/server';

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

  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return (
    <>
      {t('chat_bots')}
    </>
  );
}
