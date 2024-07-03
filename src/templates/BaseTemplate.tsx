// import { useTranslations } from 'next-intl';

import { AppConfig } from '@/utils/AppConfig';

const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {
  // const t = useTranslations('BaseTemplate');

  return (
    <div className="w-full h-screen px-1 text-gray-700 antialiased p-4 overflow-hidden">
      <div className="mx-auto max-w-screen-lg">
        <header className="border-b border-gray-300 pb-2">
          <div className="flex justify-between">
            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.leftNav}
              </ul>
            </nav>

            <nav>
              <ul className="flex flex-wrap gap-x-5 text-xl">
                {props.rightNav}
              </ul>
            </nav>
          </div>
        </header>

        <main style={{height: 'calc(100vh - 148px)'}} className="overflow-y-auto overflow-x-hidden p-4">
          {props.children}
        </main>

        <footer className="border-t border-gray-300 py-8 text-center text-sm">
          © Copyright {new Date().getFullYear()} {AppConfig.name}.
          {/* {` ${t('made_with')} `} */}
        </footer>
      </div>
    </div>
  );
};

export { BaseTemplate };
