'use client'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const RankingPage = () => {
  const [classification, setClassification] = useState('')
  const [sport, setSport] = useState('')
  const [weightClass, setWeightClass] = useState('')
  const [bgImage, setBgImage] = useState('/Cover.png')

  const handleSearch = () => {
    console.log('Searching for:', { classification, sport, weightClass })
    // Implement actual search functionality here
  }

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

  return (
    <main className='md:pb-56'>
      <section
        className='w-full py-16 px-4 relative bg-cover bg-center'
        style={{
          backgroundImage: `url(${bgImage})`,
          boxShadow: 'inset 0 0 50px rgba(76, 0, 255, 0.2)',
        }}
      >
        <div className='absolute inset-0 bg-black opacity-20'></div>
        <div className='max-w-4xl mx-auto text-center relative z-10'>
          <h2 className='text-white text-3xl md:text-4xl font-medium mb-4'>
            IKF Official Fighter Ranking
          </h2>
          <p className='text-white text-xl font-medium my-4'>
            Fighters earn championship titles through bout victories. The IKF
            Fighter Ranking Engine automates much of this research to help
            identify these title contenders.
          </p>
        </div>
      </section>
      <section className='px-4 w-full mx-auto max-w-5xl mt-16'>
        <h2 className='text-white text-2xl md:text-3xl font-medium mb-4 text-center'>
          Get the ranked fighters for the particular weight class
        </h2>
        <div className='flex flex-col md:flex-row gap-8 justify-between py-14 md:px-16'>
          <div className='flex flex-col items-center gap-4'>
            <Image src='/pro.png' alt='Cover' width={100} height={100} />
            <h2 className='text-white text-xl'>
              Choose the Pro Classification
            </h2>
          </div>
          <div className='flex flex-col items-center gap-4'>
            <Image src='/sport.png' alt='Cover' width={100} height={100} />
            <h2 className='text-white text-xl'>Choose the Sport</h2>
          </div>
          <div className='flex flex-col items-center gap-4'>
            <Image src='/weight.png' alt='Cover' width={100} height={100} />
            <h2 className='text-white text-xl'>Choose A Weight Class</h2>
          </div>
        </div>
        <div className='bg-[#28133A] rounded-xl p-8 shadow-xl'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {/* Pro Classification Dropdown */}
            <div className='flex flex-col items-start'>
              <label className='text-white text-sm mb-2'>
                Pro Classification
              </label>
              <div className='relative w-full'>
                <select
                  className='appearance-none w-full bg-transparent border-b border-gray-600 text-white text-lg pb-2 focus:outline-none focus:border-red-500'
                  value={classification}
                  onChange={(e) => setClassification(e.target.value)}
                >
                  <option value='' className='bg-purple-900'>
                    Select
                  </option>
                  <option value='amateur' className='bg-purple-900'>
                    Amateur
                  </option>
                  <option value='semi-pro' className='bg-purple-900'>
                    Semi-Pro
                  </option>
                  <option value='professional' className='bg-purple-900'>
                    Professional
                  </option>
                  <option value='elite' className='bg-purple-900'>
                    Elite
                  </option>
                </select>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                  <ChevronDown className='h-5 w-5 text-white' />
                </div>
              </div>
            </div>

            {/* Sport Dropdown */}
            <div className='flex flex-col items-start'>
              <label className='text-white text-sm mb-2'>Sport</label>
              <div className='relative w-full'>
                <select
                  className='appearance-none w-full bg-transparent border-b border-gray-600 text-white text-lg pb-2 focus:outline-none focus:border-red-500'
                  value={sport}
                  onChange={(e) => setSport(e.target.value)}
                >
                  <option value='' className='bg-purple-900'>
                    Select
                  </option>
                  <option value='football' className='bg-purple-900'>
                    Football
                  </option>
                  <option value='basketball' className='bg-purple-900'>
                    Basketball
                  </option>
                  <option value='baseball' className='bg-purple-900'>
                    Baseball
                  </option>
                  <option value='boxing' className='bg-purple-900'>
                    Boxing
                  </option>
                  <option value='mma' className='bg-purple-900'>
                    MMA
                  </option>
                  <option value='tennis' className='bg-purple-900'>
                    Tennis
                  </option>
                  <option value='esports' className='bg-purple-900'>
                    eSports
                  </option>
                </select>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                  <ChevronDown className='h-5 w-5 text-white' />
                </div>
              </div>
            </div>

            {/* Weight Class Dropdown */}
            <div className='flex flex-col items-start'>
              <label className='text-white text-sm mb-2'>Weight Class</label>
              <div className='relative w-full'>
                <select
                  className='appearance-none w-full bg-transparent border-b border-gray-600 text-white text-lg pb-2 focus:outline-none focus:border-red-500'
                  value={weightClass}
                  onChange={(e) => setWeightClass(e.target.value)}
                >
                  <option value='' className='bg-purple-900'>
                    Select
                  </option>
                  <option value='flyweight' className='bg-purple-900'>
                    Flyweight
                  </option>
                  <option value='bantamweight' className='bg-purple-900'>
                    Bantamweight
                  </option>
                  <option value='featherweight' className='bg-purple-900'>
                    Featherweight
                  </option>
                  <option value='lightweight' className='bg-purple-900'>
                    Lightweight
                  </option>
                  <option value='welterweight' className='bg-purple-900'>
                    Welterweight
                  </option>
                  <option value='middleweight' className='bg-purple-900'>
                    Middleweight
                  </option>
                  <option value='heavyweight' className='bg-purple-900'>
                    Heavyweight
                  </option>
                </select>
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                  <ChevronDown className='h-5 w-5 text-white' />
                </div>
              </div>
            </div>
          </div>

          <div className='mt-8 flex justify-center'>
            <button
              onClick={handleSearch}
              className='bg-red-500 text-white px-12 py-3 rounded font-medium hover:bg-red-600 transition-colors'
            >
              Search
            </button>
          </div>
        </div>
      </section>
      <section className='hidden md:block bg-transparent text-white px-8 py-16'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='bg-transparent border border-[#BEBEBE] p-6 flex-1  w-full md:w-[60%]'>
              <div className='text-center mb-6'>
                <h3 className='bg-gradient-to-b from-[#D99B2A] to-[#FFD995] bg-clip-text text-transparent font-bold uppercase'>
                  Classification&gt;Sport&gt;weightclass
                </h3>
              </div>
              <div className='flex flex-col md:flex-row justify-center items-center gap-8 mt-10'>
                <div className='flex flex-col items-center mt-8'>
                  <div className='relative mb-4'>
                    <div className='bg-gray-700 rounded-full w-24 h-24 flex items-center justify-center overflow-hidden'>
                      <img
                        src='https://images.unsplash.com/photo-1705417297880-3c86cbb8ba72?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt='Ricardo Cuenca'
                        className='object-cover'
                      />
                    </div>
                    <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-black font-bold text-xs'>
                      2
                    </div>
                  </div>
                  <h4 className='font-medium text-sm'>Ricardo Cuenca</h4>
                  <p className='text-xs mt-1'>0-0-1</p>
                </div>
                <div className='flex flex-col items-center z-10'>
                  <div className='relative mb-4'>
                    <div className='absolute -top-8 left-1/2 transform -translate-x-1/2'>
                      <svg
                        width='48'
                        height='34'
                        viewBox='0 0 48 34'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <g clipPath='url(#clip0_45_118)'>
                          <path
                            d='M38.4556 16.2621C38.2537 17.1282 38.0047 17.9934 37.8557 18.8759C37.5794 20.5161 37.3187 22.163 37.1392 23.8163C37.0639 24.5093 37.1483 25.2376 37.2749 25.9298C37.4246 26.7499 37.9608 27.0665 38.7957 26.9025C39.2403 26.8168 39.6743 26.6835 40.0898 26.5047C41.8894 25.7133 43.4549 24.5569 45.0089 23.3882C44.4081 22.3909 44.476 21.5347 45.1884 20.9344C45.4926 20.6835 45.8744 20.5437 46.2701 20.5385C46.6658 20.5333 47.0513 20.6629 47.3621 20.9057C47.6767 21.1558 47.8916 21.5085 47.9684 21.9009C48.0452 22.2934 47.979 22.7001 47.7816 23.0487C47.3397 23.8278 46.5148 24.0853 45.4714 23.7368C43.2497 26.9755 41.4716 30.47 39.8564 34.0015C29.2703 29.6425 18.738 29.6425 8.15267 34.0015C6.53836 30.4807 4.766 26.9919 2.54684 23.7499C1.54069 24.1058 0.656164 23.891 0.173773 22.9355C-0.196088 22.2031 0.0446941 21.3379 0.711602 20.854C1.0278 20.6302 1.41099 20.5188 1.79906 20.5378C2.18714 20.5569 2.55735 20.7053 2.84968 20.959C3.53479 21.5667 3.59437 22.4041 2.99779 23.3874C4.60052 24.5823 6.20077 25.7855 8.06993 26.5646C8.46343 26.7254 8.87312 26.8442 9.29204 26.9189C10.0227 27.0525 10.5332 26.768 10.6904 26.0438C10.8428 25.3522 10.9076 24.6444 10.8832 23.9369C10.7715 21.374 10.1857 18.8849 9.58247 16.4024C9.56524 16.3543 9.54247 16.3083 9.51462 16.2654C8.47951 16.3638 7.69428 15.9021 7.46425 15.068C7.35313 14.6836 7.3826 14.2727 7.54748 13.9077C7.71235 13.5428 8.00201 13.2473 8.36532 13.0735C8.73551 12.8981 9.15693 12.8603 9.55285 12.9671C9.94877 13.0738 10.2928 13.3179 10.5224 13.655C11.0437 14.4185 10.87 15.2403 9.98957 16.0981C11.2473 18.041 12.591 19.9199 14.4825 21.3305C14.9336 21.6652 15.4237 21.9449 15.9421 22.1638C17.2726 22.7247 18.4988 22.5066 19.5828 21.5487C20.3581 20.8631 20.8909 20.0027 21.3386 19.0883C22.521 16.682 23.3947 14.1782 23.705 11.5046C23.7332 11.2914 23.7097 11.0746 23.6364 10.8723C22.866 8.97531 21.3535 7.88946 19.4918 7.194C19.3767 7.15135 19.2584 7.1169 19.1062 7.06606C19.1586 7.02886 19.216 6.99905 19.2766 6.97748C20.7552 6.75851 21.8276 5.94986 22.6079 4.72213C23.3525 3.54443 23.7158 2.23469 23.9202 0.874099C23.9582 0.618219 23.993 0.36234 24.0443 -0.000976562C24.1792 1.38668 24.458 2.62753 25.0165 3.79047C25.7231 5.26096 26.7657 6.36403 28.4379 6.74293C28.5943 6.77819 28.754 6.79951 29.0171 6.84626C28.7979 6.92827 28.6671 6.9783 28.5356 7.02587C27.3118 7.46792 26.2188 8.11582 25.3698 9.10571C24.5763 10.03 24.1287 11.0109 24.3901 12.3206C24.9379 15.0697 25.8241 17.6695 27.2415 20.0848C27.5679 20.6229 27.9696 21.1125 28.4346 21.5388C29.4888 22.5271 30.7357 22.728 32.0646 22.163C32.6199 21.9269 33.1437 21.6239 33.6243 21.2608C35.4661 19.8551 36.7826 18.0057 38.0187 16.0989C37.1284 15.228 36.9613 14.3849 37.509 13.6213C37.7426 13.2957 38.0846 13.0622 38.4748 12.962C38.865 12.8618 39.2784 12.9013 39.6421 13.0735C40.0057 13.2475 40.2955 13.5432 40.4604 13.9085C40.6253 14.2738 40.6546 14.6851 40.5432 15.0697C40.3115 15.9029 39.528 16.3647 38.4556 16.2621Z'
                            fill='#F9FAFB'
                          />
                        </g>
                        <defs>
                          <clipPath id='clip0_45_118'>
                            <rect width='48' height='34' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                    <div className='bg-gray-700 rounded-full w-24 h-24 flex items-center justify-center overflow-hidden'>
                      <img
                        src='https://images.unsplash.com/photo-1732485139029-bd4613394575?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt='Joe Sanchez'
                        className='object-cover'
                      />
                    </div>
                    <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-black font-bold text-xs'>
                      1
                    </div>
                  </div>
                  <h4 className='font-medium text-sm'>Joe Sanchez (16)</h4>
                  <p className='text-xs mt-1'>1-0-1</p>
                </div>
                <div className='flex flex-col items-center mt-8'>
                  <div className='relative mb-4'>
                    <div className='bg-gray-700 rounded-full w-24 h-24 flex items-center justify-center overflow-hidden'>
                      <img
                        src='https://images.unsplash.com/photo-1593352217347-007764e7df22?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt='Sean Sampson'
                        className='object-cover'
                      />
                    </div>
                    <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full w-6 h-6 flex items-center justify-center text-black font-bold text-xs'>
                      3
                    </div>
                  </div>
                  <h4 className='font-medium text-sm'>Sean Sampson (16)</h4>
                  <p className='text-xs mt-1'>1-0-0</p>
                </div>
              </div>
            </div>
            <div className='bg-[#1A1A1A] border border-gray-800 rounded p-6 w-full md:w-[40%]'>
              <div className='text-center'>
                <h3 className='uppercase text-sm mb-2'>LET US KNOW</h3>
                <p className='text-xl font-medium mb-6'>
                  if you agree or not with this ranking
                </p>
                <div className='flex justify-center gap-16'>
                  <div className='flex flex-col items-center'>
                    <button className='bg-transparent hover:bg-gray-800 p-2 rounded-full mb-2'>
                      <img src='/thumbsup.png' alt='' className='h-12' />
                    </button>
                    <span className='text-sm'>Agree</span>
                  </div>

                  <div className='flex flex-col items-center'>
                    <button className='bg-transparent hover:bg-gray-800 p-2 rounded-full mb-2'>
                      <img src='/thumbsdown.png' alt='' className='h-12' />
                    </button>
                    <span className='text-sm'>Disagree</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className=' md:hidden bg-transparent text-white px-4 py-12'>
        <div className='max-w-6xl mx-auto'>
          <div className='flex flex-col md:flex-row gap-6'>
            <div className='bg-transparent w-full'>
              <div className='text-center mb-6'>
                <h3 className='text-white bg-clip-text text-3xl mb-2 text-left font-bold uppercase'>
                  Rankings
                </h3>
                <h3 className='bg-gradient-to-b from-[#D99B2A] text-left to-[#FFD995] bg-clip-text text-transparent font-bold uppercase'>
                  Classification&gt;Sport&gt;weightclass
                </h3>
              </div>
              <div className='flex flex-col md:flex-row justify-center items-center mt-10'>
                <div className='flex justify-between items-center px-4 py-2 w-full bg-gradient-to-r from-[rgba(131,138,154,0.2)] to-[rgba(255,255,255,0)] from-[9.8%] to-[51.59%]'>
                  <div className='flex items-center w-full space-x-4'>
                    <h3 className='text-sm'>1</h3>
                    <img
                      src='https://images.unsplash.com/photo-1732485139029-bd4613394575?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                      alt='Joe Sanchez'
                      className='w-10 h-10 object-cover rounded-full'
                    />
                    <h3 className='text-sm'>Joe Sanchez</h3>
                  </div>
                  <h3 className='text-sm'>111</h3>
                </div>
                <div
                  className='flex justify-between items-center px-4 py-2 w-full'
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(213, 58, 99, 0.2) 9.8%, rgba(255, 255, 255, 0) 51.59%)',
                  }}
                >
                  <div className='flex items-center w-full space-x-4'>
                    <h3 className='text-sm'>2</h3>
                    <img
                      src='https://images.unsplash.com/photo-1705417297880-3c86cbb8ba72?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                      alt='Ricardo Cuenca'
                      className='w-10 h-10 object-cover rounded-full'
                    />
                    <h3 className='text-sm'>Ricardo Cuenca</h3>
                  </div>
                  <h3 className='text-sm'>111</h3>
                </div>
                <div className='flex justify-between items-center px-4 py-2 w-full bg-gradient-to-r from-[rgba(224,160,11,0.2)] to-[rgba(255,255,255,0)] from-[9.8%] to-[51.59%]'>
                  <div className='flex items-center w-full space-x-4'>
                    <h3 className='text-sm'>3</h3>
                    <img
                      src='https://images.unsplash.com/photo-1593352217347-007764e7df22?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                      alt='Sean Sampson'
                      className='w-10 h-10 object-cover rounded-full'
                    />
                    <h3 className='text-sm'>Sean Sampson</h3>
                  </div>
                  <h3 className='text-sm'>111</h3>
                </div>
              </div>
            </div>
            <div className='bg-[#1A1A1A] border border-gray-800 rounded p-6 w-full md:w-[40%]'>
              <div className='text-center'>
                <h3 className='uppercase text-sm mb-2'>LET US KNOW</h3>
                <p className='text-xl font-medium mb-6'>
                  if you agree or not with this ranking
                </p>
                <div className='flex justify-center gap-16'>
                  <div className='flex flex-col items-center'>
                    <button className='bg-transparent hover:bg-gray-800 p-2 rounded-full mb-2'>
                      <img src='/thumbsup.png' alt='' className='h-12' />
                    </button>
                    <span className='text-sm'>Agree</span>
                  </div>

                  <div className='flex flex-col items-center'>
                    <button className='bg-transparent hover:bg-gray-800 p-2 rounded-full mb-2'>
                      <img src='/thumbsdown.png' alt='' className='h-12' />
                    </button>
                    <span className='text-sm'>Disagree</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default RankingPage
