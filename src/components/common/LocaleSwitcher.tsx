'use client';

// import { useLocale } from 'next-intl';
import { Languages } from "lucide-react"

import { usePathname, useRouter } from '@/libs/i18nNavigation';
import { AppConfig } from '@/utils/AppConfig';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  // const locale = useLocale();

  const handleChange = (value: string) => {
    router.push(pathname, { locale: value });
    router.refresh();
  };

  const langMap: Record<string, string> = {
    en: "English",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    it: "Italiano",
    pt: "Português",
    ru: "Русский",
    zh: "中文",
    ja: "日本語",
    ko: "한국어",
    ar: "العربية",
    fa: "فارسی",
    he: "עברית",
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className='w-8 h-8 mr-2'>
          <Languages className='size-5' />
          <span className="sr-only">Toggle locale</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className='w-[60px]'>
        {AppConfig?.locales?.map((elt: string) => (
          <DropdownMenuItem
            key={elt}
            onClick={() => handleChange(elt)}
          >
            {langMap[elt]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
