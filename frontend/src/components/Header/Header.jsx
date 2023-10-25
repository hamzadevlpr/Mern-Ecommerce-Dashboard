
import { BellIcon, MenuIcon } from 'lucide-react'
import SearchButton from './SearchButton'
import UserProfile from './ProfileDropDown'
import { useContext } from 'react';
import { SidebarContext } from '../../context/SidebarContext';

export default function Header() {
  const { setIsOpen } = useContext(SidebarContext);

  const handleMenuClick = () => {
    setIsOpen(true);
  };
  return (
    <div className="bg-white z-0 shadow-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex text-gray-700">
            <button
              className="focus:outline-none"
              onClick={handleMenuClick}
            >
              <MenuIcon size={30} />
            </button>
          </div>

          <div className="flex flex-1 items-center gap-5 justify-center">
            <div className="">
              <SearchButton />
            </div>
          </div>


          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="relative rounded-full p-1 text-gray-600  focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5" />
              <span className="sr-only">View notifications</span>
              <BellIcon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <UserProfile />
          </div>
        </div>
      </div>
    </div>

  )
}
