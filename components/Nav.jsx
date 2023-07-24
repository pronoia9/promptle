'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const [providers, setProviders] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  // Mobile menu dropdown functions
  const toggleDropdown = () => { setDropdown((prev) => !prev); }
  const closeDropdown = () => { setDropdown(false); };
  const logOutDropdown = () => { setDropdown(false); signOut(); };

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
            <Image className='rounded-full' src={'session'?.user?.image || '/assets/images/logo.svg'} width={37} height={37} alt='profile' onClick={toggleDropdown} />

            {dropdown && (
              <div className='dropdown'>
                <Link className='dropdown_link' href='/profile' onClick={closeDropdown}>
                  My Profile
                </Link>
                <Link className='dropdown_link' href='/create-prompt' onClick={closeDropdown}>
                  Create Prompt
                </Link>
                <button className='mt-5 w-full black_btn' type='button' onClick={logOutDropdown}>
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
