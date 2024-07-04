import { getTranslations } from 'next-intl/server';

// import { AddUserForm } from '@/components/common/AddUserForm';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
  };
}

const Dashboard = () => {

  return (
    <div className="[&_p]:my-6">
      哈哈哈
    </div>
  );
};

export default Dashboard;
