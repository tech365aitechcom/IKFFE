'use client'
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const news = [
  {
    title: 'Professional Photography at the IKF Spring Classic!',
    description:
      'We are pleased to welcome Zaneta Hech as our official photographer for the 2025 IKF Spring Muay Thai...',
    img: '/news.png',
    time: '8 hours ago',
    date: '2025-04-24T12:00:00Z',
  },
  {
    title: 'Professional Photography at the IKF Spring Classic!',
    description:
      'We are pleased to welcome Zaneta Hech as our official photographer for the 2025 IKF Spring Muay Thai...',
    img: 'https://s3-alpha-sig.figma.com/img/18da/24d1/f176376b9bb4073e276aa5cf1e93628f?...',
    time: '8 hours ago',
    date: '2025-04-24T12:00:00Z',
  },
  {
    title:
      'Get Tickets and Pay Per View for IKF Spring Classic Super Fights! Myrtle Beach, SC',
    description:
      'Get the Best Prices on Tickets for the best show in the Grand Strand this Saturday, March 15th! Fights will be at...',
    img: 'https://s3-alpha-sig.figma.com/img/1b66/67cf/809244bc93484e0e2880ede325be2a8d?...',
    time: '1 day ago',
    date: '2025-04-24T12:00:00Z',
  },
  {
    title:
      'Great Semi Contact also at the IKF Spring Classic! Tickets on Sale Now!',
    description:
      'PSR Point Kickboxing & Muay Thai Sparring will be part of the IKF Spr...',
    img: 'https://s3-alpha-sig.figma.com/img/28ca/dbe4/dcf28a3b76bdea8db3030c422b77e63a?...',
    time: '2 days ago',
    date: '2025-04-24T12:00:00Z',
  },
  {
    title:
      "Introducing 'Shooter Gloves': Perfect for MMA and IKF Freestyle Kickboxing",
    description:
      "Introducing 'Shooter Gloves': Perfect for MMA and IKF Freestyle Kickboxing by Blackout Gear Company...",
    img: 'https://s3-alpha-sig.figma.com/img/1b66/67cf/809244bc93484e0e2880ede325be2a8d?...',
    time: '3 days ago',
    date: '2025-04-24T12:00:00Z',
  },
  {
    title:
      'Get Tickets and Pay Per View for IKF Spring Classic Super Fights! Myrtle Beach, SC',
    description:
      'Get the Best Prices on Tickets for the best show in the Grand Strand this Saturday, March 15th! Fights will be at...',
    img: 'https://s3-alpha-sig.figma.com/img/01d8/826f/5c52a35ac978105397cdbf2534a77596?...',
    time: '5 days ago',
    date: '2025-04-24T12:00:00Z',
  },
  {
    title: 'Professional Photography at the IKF Spring Classic!',
    description:
      'We are pleased to welcome Zaneta Hech as our official photographer for the 2025 IKF Spring Muay Thai...',
    img: '/news.png',
    time: '8 hours ago',
    date: '2025-04-24T12:00:00Z',
  },
  {
    title: 'Professional Photography at the IKF Spring Classic!',
    description:
      'We are pleased to welcome Zaneta Hech as our official photographer for the 2025 IKF Spring Muay Thai...',
    img: 'https://s3-alpha-sig.figma.com/img/18da/24d1/f176376b9bb4073e276aa5cf1e93628f?...',
    time: '8 hours ago',
    date: '2025-04-24T12:00:00Z',
  },
  {
    title:
      'Get Tickets and Pay Per View for IKF Spring Classic Super Fights! Myrtle Beach, SC',
    description:
      'Get the Best Prices on Tickets for the best show in the Grand Strand this Saturday, March 15th! Fights will be at...',
    img: 'https://s3-alpha-sig.figma.com/img...',
    time: '1 day ago',
    date: '2025-04-24T12:00:00Z',
  },
]

const NewsPage = () => {
  const [bgImage, setBgImage] = useState('/Cover.png')
  const [currentPage, setCurrentPage] = useState(1)
  const [category, setCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const newsPerPage = 9
  useEffect(() => {
    const updateBackground = () => {
      setBgImage(
        window.innerWidth >= 768 ? '/Cover.png' : '/rakning_cover_mobile.png'
      )
    }

    updateBackground()
    window.addEventListener('resize', updateBackground)

    return () => window.removeEventListener('resize', updateBackground)
  }, [])

  const totalPages = Math.ceil(news.length / newsPerPage)
  const indexOfLastNews = currentPage * newsPerPage
  const indexOfFirstNews = indexOfLastNews - newsPerPage
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews)

  const handleSearch = () => {
    console.log('Searching for:', { category, searchTerm })
    // Implement actual search functionality here
  }

  return (
    <main className='md:pb-44'>
      <section
        className='w-full py-16 relative bg-cover bg-center'
        style={{
          backgroundImage: `url(${bgImage})`,
          boxShadow: 'inset 0 0 50px rgba(76, 0, 255, 0.2)',
        }}
      >
        <div className='absolute inset-0 bg-black opacity-20'></div>
        <div className='max-w-4xl mx-auto text-center relative z-10'>
          <h2 className='text-white text-3xl md:text-4xl font-medium mb-4 uppercase'>
            News
          </h2>
          <p className='text-white text-xl font-medium my-4'>
            Stay up to date with the latest news and announcements from the IKF.
          </p>
        </div>
      </section>
      <section className='container mx-auto py-12 px-4'>
        <div className='bg-[#28133A] rounded-xl p-8 shadow-xl mb-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 '>
            {/* Category Dropdown */}
            <div className='flex flex-col items-start mb-6'>
              <label className='text-white text-sm mb-2'>Category</label>
              <div className='relative w-full'>
                <select
                  className='appearance-none w-full bg-transparent border-b border-gray-600 text-white text-lg pb-2 focus:outline-none focus:border-red-500'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value='' className='bg-purple-900'>
                    Select
                  </option>
                  <option value='events' className='bg-purple-900'>
                    Events
                  </option>
                  <option value='rankings' className='bg-purple-900'>
                    Rankings
                  </option>
                  <option value='announcements' className='bg-purple-900'>
                    Announcements
                  </option>
                </select>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                  <ChevronDown className='h-5 w-5 text-white' />
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div className='flex flex-col items-start mb-6'>
              <label className='text-white text-sm mb-2'>Search</label>
              <input
                type='text'
                placeholder='Search by keywords...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full bg-transparent border-b border-gray-600 text-white text-lg pb-2 focus:outline-none focus:border-red-500 placeholder-gray-400'
              />
            </div>
          </div>

          <div className='mt-4 flex justify-center'>
            <button
              onClick={handleSearch}
              className='bg-red-500 text-white px-12 py-3 rounded font-medium hover:bg-red-600 transition-colors'
            >
              Search
            </button>
          </div>
        </div>

        <div className='flex flex-wrap gap-4'>
          {currentNews.map((item, index) => (
            <div
              key={index}
              className='w-100 mx-auto border border-gray-500 rounded block hover:shadow-lg transition-shadow duration-300'
            >
              <img
                src={item.img}
                alt=''
                className='w-100 h-60 object-cover rounded-t'
              />
              <div className='p-4 text-white'>
                <h3 className='text-white text-xl font-bold'>{item.title}</h3>
                <h3 className='text-[#BDBDBD] text-lg font-medium my-2 leading-6'>
                  {item.description}
                </h3>
                <h3 className='text-[#BDBDBD] font-medium mb-4'>{item.date}</h3>
                <Link href={`/news/${index}`}>
                  <button className='bg-[#0A1330] text-white px-4 py-2 rounded transition duration-200 cursor-pointer'>
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination Controls */}
        <div className='flex justify-center mt-8 space-x-2'>
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className='px-4 py-2 rounded text-white bg-[#0A1330] cursor-pointer'
            >
              <ArrowLeft />
            </button>
          )}
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded text-white cursor-pointer ${
                currentPage === i + 1 ? 'bg-[#2E133A]' : 'bg-[#0A1330]'
              }`}
            >
              {i + 1}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className='px-4 py-2 rounded text-white bg-[#0A1330] cursor-pointer'
            >
              <ArrowRight />
            </button>
          )}
        </div>
      </section>
    </main>
  )
}

export default NewsPage
