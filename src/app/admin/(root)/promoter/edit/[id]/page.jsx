'use client'
import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../../../../../_components/Loader'
import { API_BASE_URL, apiConstants } from '../../../../../../constants'
import Link from 'next/link'
import { Eye, EyeOff, Trash } from 'lucide-react'
import { enqueueSnackbar } from 'notistack'
import { uploadToS3 } from '../../../../../../utils/uploadToS3'
import { City, Country, State } from 'country-state-city'

export default function EditPromoterPage({ params }) {
  const { id } = use(params)

  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    // Profile Info
    profilePhoto: null,
    name: '',
    abbreviation: '',
    websiteURL: '',
    aboutUs: '',

    // Contact Info
    contactPersonName: '',
    phoneNumber: '',
    email: '',
    alternatePhoneNumber: '',

    // Compliance
    sanctioningBody: '',

    // Documents
    licenseCertificate: null,

    // Address Info
    street1: '',
    street2: '',
    country: '',
    state: '',
    city: '',
    postalCode: '',

    // Access
    accountStatus: 'Active',
    userName: '',
    password: '',
    confirmPassword: '',
    assignRole: 'promoter',
    adminNotes: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const countries = Country.getAllCountries()
  const states = formData.country
    ? State.getStatesOfCountry(formData.country)
    : []
  const cities =
    formData.country && formData.state
      ? City.getCitiesOfState(formData.country, formData.state)
      : []

  const fetchPromoterDetails = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/promoter/${id}`)
      const data = response.data.data

      setFormData({
        // Profile Info
        profilePhoto: data.userId?.profilePhoto || null,
        name: data.userId?.firstName ?? '' + ' ' + data.userId?.lastName ?? '',
        abbreviation: data.abbreviation || '',
        websiteURL: data.websiteURL || '',
        aboutUs: data.aboutUs || '',

        // Contact Info
        contactPersonName: data.contactPersonName || '',
        phoneNumber: data.userId?.phoneNumber || '',
        email: data.userId.email || '',
        alternatePhoneNumber: data.alternatePhoneNumber || '',

        // Compliance
        sanctioningBody: data.sanctioningBody || '',

        // Documents
        licenseCertificate: data.licenseCertificate || null,

        // Address Info
        street1: data.userId.street1 || '',
        street2: data.userId.street2 || '',
        country: data.userId.country || '',
        state: data.userId.state || '',
        city: data.userId.city || '',
        postalCode: data.userId.postalCode || '',

        // Access
        accountStatus: data.accountStatus || '',
        userName: data.userId.userName || '',
        assignRole: data.userId.role || '',
        adminNotes: data.adminNotes || '',
      })
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message, { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPromoterDetails()
  }, [id])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({ ...prev, profilePhoto: file }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      if (
        formData.profilePhoto !== null &&
        typeof formData.profilePhoto !== 'string'
      ) {
        formData.profilePhoto = await uploadToS3(formData.profilePhoto)
      }
      if (
        formData.licenseCertificate !== null &&
        typeof formData.licenseCertificate !== 'string'
      ) {
        formData.licenseCertificate = await uploadToS3(
          formData.licenseCertificate
        )
      }
      const response = await axios.put(
        `${API_BASE_URL}/promoter/${id}`,
        formData
      )
      if (response.status === apiConstants.success) {
        enqueueSnackbar(response.data.message, { variant: 'success' })
        fetchPromoterDetails()
      }
    } catch (error) {
      console.log(error)

      enqueueSnackbar(
        error?.response?.data?.message || 'Something went wrong',
        {
          variant: 'error',
        }
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return <Loader />

  return (
    <div className='text-white p-8 flex justify-center relative overflow-hidden'>
      <div
        className='absolute -left-10 top-1/2 transform -translate-y-1/2 w-60 h-96 rounded-full opacity-70 blur-xl'
        style={{
          background:
            'linear-gradient(317.9deg, #6F113E 13.43%, rgba(111, 17, 62, 0) 93.61%)',
        }}
      ></div>
      <div className='bg-[#0B1739] bg-opacity-80 rounded-lg p-10 shadow-lg w-full z-50'>
        <div className='flex items-center gap-4 mb-6'>
          <Link href='/admin/promoter'>
            <button className='mr-2 text-white'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 19l-7-7m0 0l7-7m-7 7h18'
                />
              </svg>
            </button>
          </Link>
          <h1 className='text-2xl font-bold'>Promoter Editor</h1>
        </div>
        <form onSubmit={handleSubmit}>
          {/* PROFILE INFO Section */}
          <div className='mb-8'>
            <h2 className='text-sm font-bold mb-4'>PROFILE INFO</h2>

            {/* Image Upload */}
            <div className='mb-6'>
              <label className='block text-xs font-medium mb-1'>
                Upload Image (jpg/png)
                <span className='text-gray-400'> - Optional</span>
              </label>
              {formData.profilePhoto ? (
                <div className='relative w-72 h-52 rounded-lg overflow-hidden border border-[#D9E2F930]'>
                  <img
                    src={
                      typeof formData.profilePhoto == 'string'
                        ? formData.profilePhoto
                        : URL.createObjectURL(formData.profilePhoto)
                    }
                    alt='Selected image'
                    className='w-full h-full object-cover'
                  />
                  <button
                    type='button'
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, profilePhoto: null }))
                    }
                    className='absolute top-2 right-2 bg-[#14255D] p-1 rounded text-[#AEB9E1] shadow-md z-20'
                  >
                    <Trash className='w-4 h-4' />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor='profile-pic-upload'
                  className='cursor-pointer border-2 border-dashed border-gray-500 rounded-lg flex flex-col items-center justify-center w-72 h-52 relative overflow-hidden'
                >
                  <input
                    id='profile-pic-upload'
                    type='file'
                    accept='image/*'
                    onChange={(e) => handleFileChange(e, 'profilePhoto')}
                    className='absolute inset-0 opacity-0 cursor-pointer z-50'
                  />

                  <div className='bg-yellow-500 opacity-50 rounded-full p-2 mb-2 z-10'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                      />
                    </svg>
                  </div>
                  <p className='text-sm text-center text-[#AEB9E1] z-10'>
                    <span className='text-[#FEF200] mr-1'>Click to upload</span>
                    or drag and drop profile pic
                    <br />
                    <span className='text-xs'>Max 5 MB, image only</span>
                  </p>
                </label>
              )}
              <p className='text-xs text-gray-400 mt-1'>
                Logo or profile image for promoter
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
              {/* Promoter Name Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  Promoter Name<span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='Enter Promoter Name'
                  className='w-full bg-transparent outline-none'
                  required
                />
              </div>

              {/* Abbreviations Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  Abbreviations<span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='abbreviation'
                  value={formData.abbreviation}
                  onChange={handleChange}
                  placeholder='e.g. IKF'
                  className='w-full bg-transparent outline-none'
                  maxLength={10}
                  required
                />
              </div>

              {/* Website URL Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  Website URL<span className='text-red-500'>*</span>
                </label>
                <input
                  type='url'
                  name='websiteURL'
                  value={formData.websiteURL}
                  onChange={handleChange}
                  placeholder='https://www.example.com'
                  className='w-full bg-transparent outline-none'
                  required
                />
              </div>
            </div>

            {/* About Us Field */}
            <div className='bg-[#00000061] p-2 rounded mb-2'>
              <label className='block text-xs font-medium mb-1'>
                About Us<span className='text-gray-400'> - Optional</span>
              </label>
              <textarea
                name='aboutUs'
                value={formData.aboutUs}
                onChange={handleChange}
                placeholder='Describe the promoter...'
                rows='3'
                className='w-full bg-transparent outline-none resize-none'
                maxLength={500}
              />
            </div>

            {/* URL Note */}
            <div className='mb-4'>
              <p className='text-xs text-gray-400'>
                Note: You MUST enter the full URL including the http or https
                prefix. E.g. 'https://example.com', not just 'example.com'
              </p>
            </div>
          </div>

          {/* CONTACT INFO Section */}
          <div className='mb-8'>
            <h2 className='text-sm font-bold mb-4'>CONTACT INFO</h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
              {/* Contact Person Name Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  Contact Person Name<span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='contactPersonName'
                  value={formData.contactPersonName}
                  onChange={handleChange}
                  placeholder='John Doe'
                  className='w-full bg-transparent outline-none'
                  required
                />
              </div>

              {/* Mobile Number Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  Mobile Number<span className='text-red-500'>*</span>
                </label>
                <input
                  type='tel'
                  name='phoneNumber'
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder='+1-555-123456'
                  className='w-full bg-transparent outline-none'
                  required
                />
              </div>

              {/* Alternate Mobile Number Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  Alternate Mobile Number
                  <span className='text-gray-400'> - Optional</span>
                </label>
                <input
                  type='tel'
                  name='alternatePhoneNumber'
                  value={formData.alternatePhoneNumber}
                  onChange={handleChange}
                  placeholder='+1-555-000000'
                  className='w-full bg-transparent outline-none'
                />
              </div>
            </div>

            {/* Email Address Field */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  Email Address<span className='text-red-500'>*</span>
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='promoter@event.com'
                  className='w-full bg-transparent outline-none'
                  required
                />
              </div>
            </div>
          </div>

          {/* COMPLIANCE Section */}
          <div className='mb-8'>
            <h2 className='text-sm font-bold mb-4'>COMPLIANCE</h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
              {/* Sanctioning Body Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  Sanctioning Body<span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <select
                    name='sanctioningBody'
                    value={formData.sanctioningBody}
                    onChange={handleChange}
                    className='w-full bg-transparent outline-none appearance-none'
                    required
                  >
                    <option value='' disabled className='text-black'>
                      Select sanctioning body
                    </option>
                    <option value='IKF' className='text-black'>
                      IKF
                    </option>
                    <option value='WBC' className='text-black'>
                      WBC
                    </option>
                    <option value='USA Boxing' className='text-black'>
                      USA Boxing
                    </option>
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white'>
                    <svg
                      className='fill-current h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DOCUMENTS Section */}
          <div className='mb-8'>
            <h2 className='text-sm font-bold mb-4'>DOCUMENTS</h2>

            <div className='mb-6'>
              <label className='block text-xs font-medium mb-1'>
                Upload License/Certificate (.pdf/.jpg/.png)
                <span className='text-red-500'>*</span>
              </label>
              {formData.licenseCertificate ? (
                <>
                  <div className='relative w-72 h-24 rounded-lg overflow-hidden border border-[#D9E2F930] flex items-center justify-center'>
                    <div className='text-center'>
                      <p>Document uploaded</p>
                      <p className='text-xs text-gray-400'>Click to change</p>
                    </div>
                    <button
                      type='button'
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          licenseCertificate: null,
                        }))
                      }
                      className='absolute top-2 right-2 bg-[#14255D] p-1 rounded text-[#AEB9E1] shadow-md z-20'
                    >
                      <Trash className='w-4 h-4' />
                    </button>
                    <input
                      type='file'
                      accept='.pdf,.jpg,.jpeg,.png'
                      onChange={(e) =>
                        handleFileChange(e, 'licenseCertificate')
                      }
                      className='absolute inset-0 opacity-0 cursor-pointer z-50'
                    />
                  </div>{' '}
                  {typeof formData.licenseCertificate == 'string' ? (
                    <a
                      href={
                        formData.licenseCertificate
                          ? formData.licenseCertificate
                          : '#'
                      }
                      target='_blank'
                      className='text-gray-400'
                    >
                      {formData.licenseCertificate}
                    </a>
                  ) : (
                    <p className=' text-gray-400'>
                      {formData.licenseCertificate.name}
                    </p>
                  )}
                </>
              ) : (
                <label
                  htmlFor='license-cert-upload'
                  className='cursor-pointer border-2 border-dashed border-gray-500 rounded-lg flex flex-col items-center justify-center w-72 h-24 relative overflow-hidden'
                >
                  <input
                    id='license-cert-upload'
                    type='file'
                    accept='.pdf,.jpg,.jpeg,.png'
                    onChange={(e) => handleFileChange(e, 'licenseCertificate')}
                    className='absolute inset-0 opacity-0 cursor-pointer z-50'
                    required
                  />

                  <div className='bg-yellow-500 opacity-50 rounded-full p-2 mb-2 z-10'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                      />
                    </svg>
                  </div>
                  <p className='text-sm text-center text-[#AEB9E1] z-10'>
                    <span className='text-[#FEF200] mr-1'>
                      Upload certification
                    </span>
                    <br />
                    <span className='text-xs'>
                      Max 10 MB, document or image
                    </span>
                  </p>
                </label>
              )}
              <p className='text-xs text-gray-400 mt-1'>
                Proof of licensing or eligibility
              </p>
            </div>
          </div>

          {/* ADDRESS INFO Section */}
          <div className='mb-8'>
            <h2 className='text-sm font-bold mb-4'>ADDRESS INFO</h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
              {/* Street 1 Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  Street 1<span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='street1'
                  value={formData.street1}
                  onChange={handleChange}
                  placeholder='123 Combat Arena Road'
                  className='w-full bg-transparent outline-none'
                  required
                />
              </div>

              {/* Street 2 Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  Street 2<span className='text-gray-400'> - Optional</span>
                </label>
                <input
                  type='text'
                  name='street2'
                  value={formData.street2}
                  onChange={handleChange}
                  placeholder='Suite 400'
                  className='w-full bg-transparent outline-none'
                />
              </div>

              {/* Country Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  Country<span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <select
                    name='country'
                    value={formData.country}
                    onChange={handleChange}
                    className='w-full bg-transparent outline-none appearance-none'
                    required
                  >
                    <option value='' className='text-black'>
                      Select Country
                    </option>
                    {countries.map((country) => (
                      <option
                        key={country.isoCode}
                        value={country.isoCode}
                        className='text-black'
                      >
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white'>
                    <svg
                      className='fill-current h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
              {/* State Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  State<span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <select
                    name='state'
                    value={formData.state}
                    onChange={handleChange}
                    className='w-full bg-transparent outline-none appearance-none'
                    required
                  >
                    <option value='' className='text-black'>
                      Select State
                    </option>
                    {states.map((state) => (
                      <option
                        key={state.isoCode}
                        value={state.isoCode}
                        className='text-black'
                      >
                        {state.name}
                      </option>
                    ))}
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white'>
                    <svg
                      className='fill-current h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                </div>
              </div>

              {/* City Field */}
              <div className='bg-[#00000061] p-2 rounded'>
                <label className='text-white font-medium'>
                  City<span className='text-red-500'>*</span>
                </label>
                <select
                  name='city'
                  value={formData.city}
                  onChange={handleChange}
                  className='w-full outline-none bg-transparent text-white'
                  required
                >
                  <option value='' className='text-black'>
                    Select City
                  </option>
                  {cities.map((city) => (
                    <option
                      key={city.name}
                      value={city.name}
                      className='text-black'
                    >
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* ZIP/Postal Code Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  ZIP/Postal Code<span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='postalCode'
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder='90001'
                  className='w-full bg-transparent outline-none'
                  required
                />
              </div>
            </div>
          </div>

          {/* ADMIN ACCESS Section */}
          <div className='mb-8'>
            <h2 className='text-sm font-bold mb-4'>ADMIN ACCESS</h2>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
              {/* Account Status Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  Account Status<span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <select
                    name='accountStatus'
                    value={formData.accountStatus}
                    onChange={handleChange}
                    className='w-full bg-transparent outline-none appearance-none'
                    required
                  >
                    <option value='Active' className='text-black'>
                      Active
                    </option>
                    <option value='Suspended' className='text-black'>
                      Suspended
                    </option>
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white'>
                    <svg
                      className='fill-current h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Username Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  Username<span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='userName'
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder='promoter_admin'
                  className='w-full bg-transparent outline-none'
                  required
                />
              </div>

              {/* Assign Role Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  Assign Role<span className='text-red-500'>*</span>
                </label>
                <div className='relative'>
                  <select
                    name='assignRole'
                    value={formData.assignRole}
                    onChange={handleChange}
                    className='w-full bg-transparent outline-none appearance-none'
                    required
                    disabled
                  >
                    <option value='promoter' className='text-black'>
                      Promoter
                    </option>
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white'>
                    <svg
                      className='fill-current h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
              {/* Password Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded relative'>
                <label className='block text-xs font-medium mb-1'>
                  Password
                </label>
                <div className='relative'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='********'
                    className='w-full bg-transparent outline-none pr-10'
                    minLength={8}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-3 top-1/2 transform -translate-y-1/2 text-white cursor-pointer'
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className='bg-[#00000061] p-2 h-16 rounded'>
                <label className='block text-xs font-medium mb-1'>
                  Confirm Password
                </label>
                <div className='relative'>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder='********'
                    className='w-full bg-transparent outline-none'
                    minLength={8}
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
              </div>
            </div>

            {/* Internal Notes Field */}
            <div className='bg-[#00000061] p-2 rounded mb-4'>
              <label className='block text-xs font-medium mb-1'>
                Internal Notes<span className='text-gray-400'> - Optional</span>
              </label>
              <textarea
                name='adminNotes'
                value={formData.adminNotes}
                onChange={handleChange}
                placeholder='Admin-only remarks'
                rows='3'
                className='w-full bg-transparent outline-none resize-none'
                maxLength={300}
              />
            </div>
          </div>

          {/* Form Controls */}
          <div className='flex justify-center gap-4 mb-8'>
            <Link href={`/admin/promoter`}>
              <button
                type='button'
                className='bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded transition duration-200'
              >
                Cancel
              </button>
            </Link>
            <button
              type='submit'
              className='text-white font-medium py-2 px-6 rounded transition duration-200'
              style={{
                background:
                  'linear-gradient(128.49deg, #CB3CFF 19.86%, #7F25FB 68.34%)',
              }}
              disabled={submitting}
            >
              {submitting ? 'Updating...' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
