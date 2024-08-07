import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { auth } from '@clerk/nextjs/server';

import { BaseTemplate } from '@/templates/BaseTemplate';
import HeaderNavRight from '@/components/layouts/HeaderNavRight';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function DashboardLayout(props: { children: React.ReactNode }) {
  const t = useTranslations('DashboardLayout');  

  const user = auth();
  const { has } = user;
  const canVisited = has({ permission: "org:chat:experience" });

  return (
    <BaseTemplate
      leftNav={
        <>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="mr-2">  
                <Link href="/dashboard/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {t('dashboard_link')}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {
                canVisited ? (
                  <NavigationMenuItem>
                    <Link href="/dashboard/chat-ai" legacyBehavior passHref>
                      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        {t('about_link')}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ) : null
              }
              
            </NavigationMenuList>
          </NavigationMenu>
        </>
      }
      rightNav={
        <>
          <HeaderNavRight />
        </>
      }
    >
      {props.children}
    </BaseTemplate>
  );
}
