'use client'
import React, { useState } from 'react'
import Link from 'next/link'

const LoginPage = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
    rememberMe: true,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Login data ready to be sent:', formData)
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred during login')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex h-screen w-full bg-transparent px-28 py-6'>
      <div className='flex w-full'>
        <div className='hidden md:flex md:w-1/2 bg-gradient-to-b from-purple-900 to-black items-center justify-center'>
          <div className='p-12'>
            <img
              src='/gloves.png'
              alt='Red boxing glove'
              className='max-w-full h-auto transform -rotate-12'
            />
          </div>
        </div>
        <div className='w-full md:w-1/2 flex items-center justify-center p-8'>
          <div className='w-full max-w-md'>
            <h1 className='text-3xl font-bold text-white mb-8'>Login</h1>

            {error && (
              <div className='bg-red-500 bg-opacity-20 border border-red-500 text-red-500 px-4 py-2 rounded mb-4'>
                {error}
              </div>
            )}
            <form className='space-y-4' onSubmit={handleSubmit}>
              <div>
                <input
                  type='text'
                  name='name'
                  placeholder='Name'
                  value={formData.userName}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded border border-gray-700 bg-transparent text-white'
                  required
                />
              </div>
              <div>
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded border border-gray-700 bg-transparent text-white'
                  required
                />
              </div>
              <div className='flex justify-end items-center'>
                {/* <div className='flex items-center'>
                  <input
                    type='checkbox'
                    id='rememberMe'
                    name='rememberMe'
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className='w-4 h-4 mr-2 accent-yellow-500'
                  />
                  <label htmlFor='rememberMe' className='text-white'>
                    Remember Me
                  </label>
                </div> */}
                <Link
                  href={'/forgot-password'}
                  className='text-blue-400 hover:underline'
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                type='submit'
                className='w-full bg-red-500 text-white py-3 rounded font-medium hover:bg-red-600 transition duration-300 flex items-center justify-center'
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
              <div className='text-center text-white mt-4'>
                If you don't have an account?{' '}
                <Link
                  href={'/signup'}
                  className='text-yellow-500 hover:underline'
                >
                  Sign Up
                </Link>
              </div>
              {/* <div className='flex items-center my-6'>
                <div className='flex-grow border-t border-gray-700'></div>
                <span className='px-4 text-gray-400 text-sm'>
                  Or login with
                </span>
                <div className='flex-grow border-t border-gray-700'></div>
              </div>
              <div className='flex justify-center space-x-4'>
                <button
                  type='button'
                  className='flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded gap-1'
                >
                  <span className='mr-2'>FACEBOOK</span>
                </button>
                <button
                  type='button'
                  className='flex items-center justify-center bg-blue-400 text-white px-4 py-2 rounded'
                >
                  <span className='mr-2'>TWITTER</span>
                </button>
                <button
                  type='button'
                  className='flex items-center justify-center bg-red-600 text-white px-4 py-2 rounded'
                >
                  <span className='mr-2'>GOOGLE</span>
                </button>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
