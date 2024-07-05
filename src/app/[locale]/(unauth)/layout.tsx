import Link from 'next/link';
import { useTranslations } from 'next-intl';

import LocaleSwitcher from '@/components/layouts/LocaleSwitcher';
// import ThemeSwitcher from '@/components/layouts/ThemeSwitcher';
import { BaseTemplate } from '@/templates/BaseTemplate';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Layout(props: { children: React.ReactNode }) {
  const t = useTranslations('RootLayout');

  return (
    <BaseTemplate
      leftNav={
        <>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>  
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {t('home_link')}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link href="/dashboard/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {t('about_link')}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </>
      }
      rightNav={
        <>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>  
                {/* <ThemeSwitcher /> */}
              </NavigationMenuItem>

              <NavigationMenuItem>  
                <LocaleSwitcher />
              </NavigationMenuItem>

              <NavigationMenuItem>  
                <Link href="/sign-in/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {t('sign_in_link')}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </>
      }
    >
      <div className="py-5 text-xl [&_p]:my-6">{props.children}</div>
    </BaseTemplate>
  );
}
