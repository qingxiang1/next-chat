
import { AppConfig } from '@/utils/AppConfig';

const BaseTemplate = (props: {
  leftNav: React.ReactNode;
  rightNav?: React.ReactNode;
  children: React.ReactNode;
}) => {

  return (
    <div className="w-full h-screen text-gray-700 antialiased p-4 overflow-hidden">
      <div className="w-full">
        <header className="border-b border-gray-300 pb-2">
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap gap-x-5 text-xl">
              {props.leftNav}
            </div>

            <div className="flex flex-wrap text-xl">
              {props.rightNav}
            </div>
          </div>
        </header>

        <main style={{height: 'calc(100vh - 148px)'}} className="overflow-y-auto overflow-x-hidden p-4">
          {props.children}
        </main>

        <footer className="border-t border-gray-300 py-8 text-center text-sm">
          {/* •  */}
          Copyright © {new Date().getFullYear()} {AppConfig.website} All Rights Reserved.
        </footer>
      </div>
    </div>
  );
};

export { BaseTemplate };
