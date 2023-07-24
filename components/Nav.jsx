'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      {/* Logo */}
      <Link className='flex gap-2 flex-center' href='/'>
        <Image className='object-contain' src='/assets/images/logo.svg' alt='logo' width={30} height={30} />
        <p className='logo_text'>Promptle</p>
      </Link>

      {/* Desktop Navigation */}

      {/* Mobile Navigation */}
    </nav>
  );
};
export default Nav;
