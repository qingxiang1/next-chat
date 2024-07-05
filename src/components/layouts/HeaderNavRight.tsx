'use client';

import React, { useEffect, useState } from 'react';
import { 
  OrganizationSwitcher,
  // SignedIn,
  UserButton,
} from "@clerk/nextjs";

import ThemeSwitcher from './ThemeSwitcher';
import LocaleSwitcher from './LocaleSwitcher';


const useMounted = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};


export default function HeaderNavRight() {

  const isMounted = useMounted();

  return isMounted ? (
    <>
      <OrganizationSwitcher />
      <ThemeSwitcher />
      <LocaleSwitcher />
      <UserButton afterSignOutUrl="/" />
    </>
  ) : null;
}
