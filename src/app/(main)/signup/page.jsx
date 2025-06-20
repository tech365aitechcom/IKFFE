'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { API_BASE_URL, apiConstants, roles } from '../../../constants/index'
import { enqueueSnackbar } from 'notistack'
import useStore from '../../../stores/useStore'
import { Country } from 'country-state-city'

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dobDay: '',
    dobMonth: '',
    dobYear: '',
    countryName: '',
    countryCode: '',
    phoneNumber: '',
    termsAgreed: false,
    role: '',
  })
  const { roles } = useStore()

  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  // Generate days, months, years for DOB
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ]

  // Generate years from current year - 100 to current year - 18
  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: currentYear - (currentYear - 100) + 1 },
    (_, i) => currentYear - i
  ).filter((year) => year <= currentYear - 18)

  const countries = Country.getAllCountries()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const selectCountry = (countryObj) => {
    setFormData({
      ...formData,
      countryName: countryObj.name,
      countryCode: countryObj.isoCode,
    })
    setShowSuggestions(false)
  }

  const validateLettersOnly = (text) => {
    return /^[A-Za-z\s]+$/.test(text)
  }

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePassword = (password) => {
    return password.length >= 8 && /\d/.test(password)
  }

  const validateDOB = () => {
    if (!formData.dobDay || !formData.dobMonth || !formData.dobYear)
      return false

    const dob = new Date(
      `${formData.dobYear}-${formData.dobMonth}-${formData.dobDay}`
    )
    const today = new Date()
    const eighteenYearsAgo = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate()
    )

    return dob <= eighteenYearsAgo && dob.toString() !== 'Invalid Date'
  }

  const validateMobileNumber = (number) => {
    return /^\d+$/.test(number)
  }

  console.log('Form data:', formData)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate first and last name
      if (
        !validateLettersOnly(formData.firstName) ||
        !validateLettersOnly(formData.lastName)
      ) {
        enqueueSnackbar('Names should contain only letters', {
          variant: 'warning',
        })
        setIsLoading(false)
        return
      }

      // Validate email
      if (!validateEmail(formData.email)) {
        enqueueSnackbar('Please enter a valid email address', {
          variant: 'warning',
        })
        setIsLoading(false)
        return
      }

      // Validate password
      if (!validatePassword(formData.password)) {
        enqueueSnackbar(
          'Password must be at least 8 characters and contain at least 1 number',
          { variant: 'warning' }
        )
        setIsLoading(false)
        return
      }

      // Validate password match
      if (formData.password !== formData.confirmPassword) {
        enqueueSnackbar('Passwords do not match', { variant: 'warning' })
        setIsLoading(false)
        return
      }

      // Validate date of birth
      if (!validateDOB()) {
        enqueueSnackbar('You must be at least 18 years old to register', {
          variant: 'warning',
        })
        setIsLoading(false)
        return
      }

      // Validate mobile number
      if (!validateMobileNumber(formData.phoneNumber)) {
        enqueueSnackbar('Phone number should contain only digits', {
          variant: 'warning',
        })
        setIsLoading(false)
        return
      }

      const payload = {
        ...formData,
        redirectUrl: `${process.env.NEXT_PUBLIC_APP_URL}/verify-email`,
        country: formData.countryCode,
      }
      delete payload.countryCode
      delete payload.countryName

      console.log('Registration data ready to be sent:', payload)
      const res = await axios.post(`${API_BASE_URL}/auth/signup`, payload)
      console.log('Registration response:', res)
      if (res.status === apiConstants.create) {
        enqueueSnackbar(res.data.message, { variant: 'success' })
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          dobDay: '',
          dobMonth: '',
          dobYear: '',
          countryName: '',
          countryCode: '',
          phoneNumber: '',
          termsAgreed: false,
          role: '',
        })
      }
    } catch (err) {
      console.log('Registration error:', err)
      enqueueSnackbar(
        err?.response?.data?.message || 'An error occurred during registration',
        { variant: 'error' }
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex h-screen w-full bg-transparent px-12 md:px-28 py-20 md:py-6'>
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
        <div className='w-full md:w-1/2 flex md:items-center justify-center p-0 md:p-8'>
          <div className='w-full max-w-md'>
            <div className='flex justify-between items-center mb-6'>
              <h1 className='text-3xl font-bold text-white'>Sign Up</h1>
              <span className='text-xs text-red-500'>
                *Indicates Mandatory Fields
              </span>
            </div>
            <form className='space-y-4' onSubmit={handleSubmit}>
              {/* First Name */}
              <div>
                <input
                  type='text'
                  name='firstName'
                  placeholder='FIRST NAME*'
                  value={formData.firstName}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded border border-gray-700 bg-transparent text-white'
                  required
                />
              </div>

              {/* Last Name */}
              <div>
                <input
                  type='text'
                  name='lastName'
                  placeholder='LAST NAME*'
                  value={formData.lastName}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded border border-gray-700 bg-transparent text-white'
                  required
                />
              </div>

              {/* Email */}
              <div>
                <input
                  type='email'
                  name='email'
                  placeholder='EMAIL*'
                  value={formData.email}
                  onChange={handleChange}
                  className='w-full px-4 py-3 rounded border border-gray-700 bg-transparent text-white'
                  required
                />
              </div>

              <div>
                <select
                  name='role'
                  value={formData.role}
                  onChange={handleChange}
                  className='w-full px-2 py-3 rounded border border-gray-700 bg-transparent text-white'
                  required
                >
                  <option value='' className='text-black'>
                    Select Role
                  </option>
                  {roles.map((role) => (
                    <option
                      key={role?._id}
                      value={role.value}
                      className='text-black'
                    >
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Password */}
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  placeholder='PASSWORD*'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full px-4 py-3 pr-10 rounded border border-gray-700 bg-transparent text-white'
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer'
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              {/* Confirm Password */}
              <div className='relative'>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name='confirmPassword'
                  placeholder='RE-ENTER PASSWORD*'
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className='w-full px-4 py-3 pr-10 rounded border border-gray-700 bg-transparent text-white'
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer'
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </span>
              </div>

              {/* Date of Birth */}
              <div>
                <label className='block text-white text-sm mb-1'>
                  Date of Birth*
                </label>
                <div className='flex space-x-2'>
                  <select
                    name='dobDay'
                    value={formData.dobDay}
                    onChange={handleChange}
                    className='w-1/4 px-2 py-3 rounded border border-gray-700 bg-transparent text-white'
                    required
                  >
                    <option value='' className='text-black'>
                      DD
                    </option>
                    {days.map((day) => (
                      <option
                        key={day}
                        value={day < 10 ? `0${day}` : day}
                        className='text-black'
                      >
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    name='dobMonth'
                    value={formData.dobMonth}
                    onChange={handleChange}
                    className='w-2/5 px-2 py-3 rounded border border-gray-700 bg-transparent text-white'
                    required
                  >
                    <option value='' className='text-black'>
                      MM
                    </option>
                    {months.map((month) => (
                      <option
                        key={month.value}
                        value={month.value}
                        className='text-black'
                      >
                        {month.label}
                      </option>
                    ))}
                  </select>
                  <select
                    name='dobYear'
                    value={formData.dobYear}
                    onChange={handleChange}
                    className='w-1/3 px-2 py-3 rounded border border-gray-700 bg-transparent text-white'
                    required
                  >
                    <option value='' className='text-black'>
                      YYYY
                    </option>
                    {years.map((year) => (
                      <option key={year} value={year} className='text-black'>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Country with auto-suggest */}
              <div className='relative'>
                <input
                  type='text'
                  name='countryName'
                  placeholder='Enter Country*'
                  value={formData.countryName}
                  onChange={(e) => {
                    const value = e.target.value
                    setFormData({
                      ...formData,
                      countryName: value,
                      countryCode: '',
                    })

                    if (value.trim() !== '') {
                      setSuggestions(
                        countries
                          .filter((c) =>
                            c.name.toLowerCase().includes(value.toLowerCase())
                          )
                          .slice(0, 5)
                      )
                      setShowSuggestions(true)
                    } else {
                      setShowSuggestions(false)
                    }
                  }}
                  onFocus={() => {
                    if (formData.countryName.trim() !== '') {
                      setSuggestions(
                        countries
                          .filter((c) =>
                            c.name
                              .toLowerCase()
                              .includes(formData.countryName.toLowerCase())
                          )
                          .slice(0, 5)
                      )
                      setShowSuggestions(true)
                    }
                  }}
                  className='w-full px-4 py-3 rounded border border-gray-700 bg-transparent text-white'
                  required
                />
                {showSuggestions && suggestions.length > 0 && (
                  <div className='absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded max-h-60 overflow-auto'>
                    {suggestions.map((country, index) => (
                      <div
                        key={index}
                        className='px-4 py-2 text-white hover:bg-gray-700 cursor-pointer'
                        onClick={() => selectCountry(country)}
                      >
                        {country.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Number */}
              <div>
                <div className='flex'>
                  <div className='w-1/4 px-4 py-3 rounded-l border border-gray-700 bg-gray-800 text-white flex items-center justify-center'>
                    +
                    {countries.find((c) => c.isoCode === formData.countryCode)
                      ?.phonecode || '0'}
                  </div>
                  <input
                    type='tel'
                    name='phoneNumber'
                    placeholder='Enter Mobile Number*'
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className='w-3/4 px-4 py-3 rounded-r border border-gray-700 bg-transparent text-white'
                    required
                  />
                </div>
              </div>

              {/* Terms Agreement */}
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  id='termsAgreed'
                  name='termsAgreed'
                  checked={formData.termsAgreed}
                  onChange={handleChange}
                  className='w-4 h-4 mr-2 accent-yellow-500'
                  required
                />
                <label htmlFor='termsAgreed' className='text-white text-sm'>
                  I agree to terms and privacy policy
                </label>
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                className='w-full bg-red-500 text-white py-3 rounded font-medium hover:bg-red-600 transition duration-300 flex items-center justify-center mt-4 disabled:cursor-not-allowed disabled:bg-red-400'
                disabled={isLoading || !formData.termsAgreed}
              >
                {isLoading ? 'Signing Up...' : 'Create Account'}
              </button>

              <div className='flex justify-between items-center my-6'>
                {/* Login Link */}
                <div className='text-center text-white'>
                  Already have an account?{' '}
                  <Link
                    href='/login'
                    className='text-yellow-500 hover:underline'
                  >
                    Log In
                  </Link>
                </div>
                <Link
                  href={'/forgot-password'}
                  className='text-blue-400 hover:underline'
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
