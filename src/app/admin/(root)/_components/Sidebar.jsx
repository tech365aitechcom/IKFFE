'use client'
import Link from 'next/link'
import {
  Search,
  Home,
  User,
  List,
  DollarSign,
  MapPin,
  Users,
  ChevronRight,
  Star,
  Dumbbell,
  PartyPopper,
  Newspaper,
  Info,
  SquareUser,
  Shield,
  Trophy,
} from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import useUserStore from '../../../../stores/userStore'

export function Sidebar() {
  const pathname = usePathname()
  const user = useUserStore((state) => state.user)

  return (
    <div className='flex flex-col w-72 h-full bg-[#081028] text-white font-lato'>
      {/* Font Import in Head */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');

        body {
          font-family: 'Lato', sans-serif;
        }
      `}</style>

      {/* Logo Section */}
      <div className='flex p-6'>
        <div className='relative w-30 h-30'>
          <Image
            src='/logo1.png'
            alt='Global Sports Federation Logo'
            layout='fill'
            className='rounded-full'
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className='px-4 py-2'>
        <div className='relative'>
          <Search className='absolute left-3 top-2.5 h-4 w-4 text-gray-400' />
          <input
            type='text'
            placeholder='Search for...'
            className='w-full bg-gray-800 text-sm text-white rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-blue-500 font-lato'
          />
        </div>
      </div>

      {/* Navigation Items */}
      <nav className='flex-1 mt-2'>
        <NavItem
          href='/admin/dashboard'
          icon={<Home size={18} />}
          title='Dashboard'
          isActive={pathname === '/admin/dashboard'}
        />
        <NavItem
          href='/admin/events'
          icon={<Star size={18} />}
          title='Events'
          isActive={pathname === '/admin/events'}
          highlight={true}
        />
        <NavItem
          href='/admin/tournaments'
          icon={<Trophy size={18} />}
          title='Tournaments'
          isActive={pathname === '/admin/tournaments'}
          highlight={true}
        />
        <NavItem
          href='/admin/spectator-ticket-redemption'
          icon={<User size={18} />}
          title='Spectator Ticket Redemption'
          isActive={pathname === '/admin/spectator-ticket-redemption'}
        />
        <NavItem
          href='/admin/fighter-trainer-checkin'
          icon={<Dumbbell size={18} />}
          title='Fighter & Trainer Checkin'
          isActive={pathname === '/admin/fighter-trainer-checkin'}
        />
        <NavItem
          href='/admin/fighter-and-rankings'
          icon={<Dumbbell size={18} />}
          title='Fighter & Rankings'
          isActive={pathname === '/admin/fighter-and-rankings'}
        />
        <NavItem
          href='/admin/event-bout-list'
          icon={<List size={18} />}
          title='Event Bout List'
          isActive={pathname === '/admin/event-bout-list'}
        />
        <NavItem
          href='/admin/cash-payments-codes'
          icon={<DollarSign size={18} />}
          title='Cash Payments & Codes'
          isActive={pathname === '/admin/cash-payments-codes'}
        />

        <NavItem
          href='/admin/venues'
          icon={<MapPin size={18} />}
          title='Venues'
          isActive={pathname === '/venues'}
        />
        {/* <NavItem
          href='/admin/promoters'
          icon={<PartyPopper size={18} />}
          title='Promoters'
          isActive={pathname === '/admin/promoters'}
        /> */}
        <NavItem
          href='/admin/news'
          icon={<Newspaper size={18} />}
          title='News'
          isActive={pathname === '/admin/news'}
        />
        {/* <NavItem
          href='/admin/people'
          icon={<Users size={18} />}
          title='People'
          isActive={pathname === '/admin/people'}
        /> */}
        <NavItem
          href='/admin/about'
          icon={<Info size={18} />}
          title='About'
          isActive={pathname === '/admin/about'}
        />
        <NavItem
          href='/admin/contact-settings'
          icon={<SquareUser size={18} />}
          title='Contact Settings'
          isActive={pathname === '/admin/contact-settings'}
        />
        {/* User Profile Section */}
        <Link
          href={`/admin/profile`}
          className={`${pathname === '/admin/profile' && 'text-[#FFCA28]'}`}
        >
          <div className='flex items-center p-4'>
            <div className='flex items-center'>
              <div className='relative w-10 h-10 mr-3'>
                <Image
                  src='/john.png'
                  alt='Profile'
                  layout='fill'
                  className='rounded-full bg-violet-700'
                />
              </div>
              <div>
                <p className='text-sm font-medium'>{user?.fullName}</p>
                <p
                  className={`text-sm ${
                    pathname === '/admin/profile'
                      ? 'text-[#FFCA28]'
                      : 'text-gray-400'
                  }`}
                >
                  Account settings
                </p>
              </div>
            </div>
            <span className='ml-auto'>
              <ChevronRight size={14} />
            </span>
          </div>
        </Link>
      </nav>
    </div>
  )
}

function NavItem({ href, icon, title, isActive, highlight }) {
  return (
    <Link
      href={href}
      className={`flex items-center p-4 text-sm ${
        isActive ? 'text-[#FFCA28]' : 'text-gray-300 hover:text-[#FFCA28]'
      } ${highlight ? 'font-bold' : ''} font-lato`}
    >
      <span className='mr-3'>{icon}</span>
      {title}
      <span className='ml-auto'>
        <ChevronRight size={14} />
      </span>
    </Link>
  )
}
