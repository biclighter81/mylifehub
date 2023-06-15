import Link from 'next/link';
import { useAppStore } from '../../stores/app.store';
import { useRouter } from 'next/router';
import { NavbarItem } from '../../lib/types/app';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Transition } from '@headlessui/react';
import Select from '../interaction/Select';
import { useState } from 'react';

export default function Navbar() {
  const appStore = useAppStore();
  const { data: session } = useSession();
  const router = useRouter();

  const [selected, setSelected] = useState<
    { label: string; value: string } | undefined
  >({
    label: 'Main Hub',
    value: 'main-hub',
  });

  const items: NavbarItem[] = [
    {
      name: 'Dashboard',
      href: '/',
      active: true,
    },
    {
      name: 'Routines',
      href: '/routines',
      active: false,
    },
    {
      name: 'Goals',
      href: '/goals',
      active: false,
    },
  ];
  const genericHamburgerLine = `h-[3px] w-8 my-1 rounded-full bg-gray-500 transition ease transform duration-300`;

  return (
    <>
      <div className='items-center space-x-8 hidden lg:flex'>
        {items.map((item) => (
          <div key={item.href}>
            <Link href={item.href}>
              <span
                className={`uppercase font-bold text-sm ${
                  item.href == router.pathname
                    ? 'text-primary-500'
                    : 'text-gray-600'
                } hover:text-primary-500 transition duration-300 ease-in-out cursor-pointer`}
              >
                {item.name}
              </span>
            </Link>
          </div>
        ))}
        <div>
          <span
            className={`uppercase font-bold text-sm text-gray-600 hover:text-primary-500 transition duration-300 ease-in-out cursor-pointer`}
            onClick={() => signOut()}
          >
            Logout
          </span>
        </div>
      </div>
      {/* Mobile */}
      <div className='lg:hidden flex justify-end'>
        <div className='relative'>
          <button
            className='flex flex-col h-fit w-fit rounded justify-center items-center group'
            onClick={() => appStore.setMenu(!appStore.menu)}
          >
            <div
              className={`${genericHamburgerLine} ${
                appStore.menu
                  ? 'rotate-45 translate-y-[11px]  group-hover:opacity-100'
                  : ' group-hover:opacity-100'
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${
                appStore.menu ? 'opacity-0' : 'group-hover:opacity-100'
              }`}
            />
            <div
              className={`${genericHamburgerLine} ${
                appStore.menu
                  ? '-rotate-45 -translate-y-[11px]  group-hover:opacity-100'
                  : ' group-hover:opacity-100'
              }`}
            />
          </button>
        </div>
      </div>
      <div
        className={`fixed top-16 left-0  w-full overflow-y-hidden  ${
          appStore.menu ? 'z-10 h-full bottom-0' : '-z-10'
        }`}
      >
        <Transition
          show={appStore.menu}
          enter='transition ease-out duration-700 transform'
          enterFrom='opacity-75 translate-y-[-100%]'
          enterTo='opacity-100 translate-y-0'
          leave='transition ease-in duration-300 transform'
          leaveFrom='opacity-100 translate-y-0'
          leaveTo='opacity-75 translate-y-[-100%]'
          className={`w-full h-full relative z-20`}
        >
          <div className='w-full h-full bg-gray-200 flex flex-col space-y-8 px-8 py-8'>
            <Select
              selected={selected}
              setSelected={setSelected}
              values={[
                {
                  label: 'Main Hub',
                  value: 'main-hub',
                },
                {
                  label: 'Work Hub',
                  value: 'work-hub',
                },
                {
                  label: 'Sport Hub',
                  value: 'sport-hub',
                },
              ]}
            />
            {items.map((item) => (
              <Link
                href={item.href}
                onClick={() => appStore.setMenu(false)}
                key={item.href}
              >
                <div>
                  <h4
                    className={`text-2xl font-semibold ${
                      item.href == router.pathname
                        ? 'text-primary-500'
                        : 'text-gray-600'
                    }`}
                  >
                    {item.name}
                  </h4>
                </div>
              </Link>
            ))}
            <div className='flex-grow flex flex-col justify-end pb-20 space-y-4'>
              {session ? (
                <></>
              ) : (
                <div className='flex flex-col space-y-8'>
                  <div>
                    <h4
                      className='text-2xl font-semibold text-gray-700'
                      onClick={() => {
                        signIn('keycloak');
                      }}
                    >
                      Sign In
                    </h4>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
}
