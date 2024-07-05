'use client'

import DashboardComp from '@/components/pages/dashboard/Dashboard';

// import dynamic from 'next/dynamic';
// import { getTranslations } from 'next-intl/server';

// import { InitSystem } from '@/components/common/InitSystem';

const Dashboard = () => {

  // const NoSSRComp = dynamic(() => import('@/components/common/ThemeProvider'), {ssr: false});

  return (
    <>
      <DashboardComp />
    </>
  );
};

export default Dashboard;
