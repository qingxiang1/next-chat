/**
 * 工作台首页
 * @returns 
 */
import { useTranslations } from 'next-intl';

const Dashboard = () => {

  const t = useTranslations('DashboardLayout');

  return (
    <>{t('hello_message', {email : '123@123.com'})}</>
  );
};

export default Dashboard;