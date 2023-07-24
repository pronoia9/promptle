'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const response = await getProviders();
      setProviders(response);
    })();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      {/* Logo */}
      <Link className='flex gap-2 flex-center' href='/'>
        <Image className='object-contain' src='/assets/images/logo.svg' alt='logo' width={30} height={30} />
        <p className='logo_text'>Promptle</p>
      </Link>

      {/* Desktop Navigation */}
      <div className='sm:flex hidden'>
        {'isUserLoggedInTEMP' ? (
          <div className='flex gap-3 md:gap-5'>
            <Link className='black_btn' href='/create-prompt'>
              Create Post
            </Link>

            <button className='outline_btn' type='button' onClick={signOut}>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image className='rounded-full' src={'session'?.user?.image || '/assets/images/logo.svg'} width={37} height={37} alt='profile' />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button className='black_btn' type='button' key={provider.name} onClick={() => { signIn(provider.id); }}>
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {'isUserLoggedInTEMP' ? (
          <div className='flex'>
            <Image className='rounded-full' src={'session'?.user?.image || '/assets/images/logo.svg'} width={37} height={37} alt='profile' onClick={() => { setToggleDropdown(!toggleDropdown); }} />

            {toggleDropdown && (
              <div className='dropdown'>
                <Link href='/profile' className='dropdown_link' onClick={() => { setToggleDropdown(false); }}>
                  My Profile
                </Link>
                <Link href='/create-prompt' className='dropdown_link' onClick={() => { setToggleDropdown(false); }}>
                  Create Prompt
                </Link>
                <button className='mt-5 w-full black_btn' type='button' onClick={() => { setToggleDropdown(false); signOut(); }}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button className='black_btn' type='button' key={provider.name} onClick={() => { signIn(provider.id); }}>
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};
export default Nav;
