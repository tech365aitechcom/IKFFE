'use client'
import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../../../../../_components/Loader'
import { API_BASE_URL, apiConstants } from '../../../../../../constants'
import Link from 'next/link'
import { enqueueSnackbar } from 'notistack'
import useStore from '../../../../../../stores/useStore'

export default function ViewSuspensionPage({ params }) {
  const { id } = use(params)
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    status: 'Active',
    type: '',
    incidentDate: '',
    sportingEventUID: '',
    description: '',
    daysWithoutTraining: '',
    daysBeforeCompeting: '',
    indefinite: false,
    person: '',
  })
  const { user } = useStore()

  const fetchSuspensionsDetails = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${API_BASE_URL}/suspensions/${id}`)
      const data = response.data.data

      setFormData({
        status: data.status || 'Active',
        type: data.type || '',
        incidentDate: data.incidentDate?.split('T')[0] || '',
        sportingEventUID: data.sportingEventUID || '',
        description: data.description || '',
        daysWithoutTraining: data.daysWithoutTraining || '',
        daysBeforeCompeting: data.daysBeforeCompeting || '',
        indefinite: data.indefinite || false,
        person: data.person?._id || '',
      })
    } catch (err) {
      enqueueSnackbar(err?.response?.data?.message, { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  const getPeople = async () => {
    setLoading(true)

    try {
      const queryParams = {
        page: 1,
        limit: 500,
      }

      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter(
          ([_, value]) => value !== '' && value !== null && value !== undefined
        )
      )

      const queryString = new URLSearchParams(filteredParams).toString()

      const response = await axios.get(
        `${API_BASE_URL}/people?${queryString}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      )

      console.log('Response:', response.data)
      setPeople(response.data.items)
    } catch (error) {
      console.log('Error fetching people:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPeople()
  }, [])

  useEffect(() => {
    fetchSuspensionsDetails()
  }, [id])

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
          <Link href='/admin/suspensions'>
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
          <h1 className='text-2xl font-bold'>Suspension Editor</h1>
        </div>
        <form className='space-y-6'>
          <div className=''>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Status */}
              <div className='bg-[#00000061] p-3 rounded'>
                <label className='block text-sm font-medium mb-1'>
                  Status<span className='text-red-500'>*</span>
                </label>
                <select
                  name='status'
                  value={formData.status}
                  className='w-full bg-transparent outline-none py-1'
                  required
                  disabled
                >
                  <option value='Active' className='text-black'>
                    Active
                  </option>
                  <option value='Pending' className='text-black'>
                    Pending
                  </option>
                  <option value='Closed' className='text-black'>
                    Closed
                  </option>
                </select>
                <p className='text-xs text-gray-400 mt-1'>
                  Indicates if the suspension is enforced
                </p>
              </div>

              {/* Type */}
              <div className='bg-[#00000061] p-3 rounded'>
                <label className='block text-sm font-medium mb-1'>
                  Type<span className='text-red-500'>*</span>
                </label>
                <select
                  name='type'
                  value={formData.type}
                  className='w-full bg-transparent outline-none py-1'
                  required
                  disabled
                >
                  <option value='' className='text-black'>
                    Make a selection
                  </option>
                  <option value='Disciplinary' className='text-black'>
                    Disciplinary
                  </option>
                  <option value='Medical' className='text-black'>
                    Medical
                  </option>
                </select>
                <p className='text-xs text-gray-400 mt-1'>
                  Defines category of suspension
                </p>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
              {/* Incident Date */}
              <div className='bg-[#00000061] p-3 rounded'>
                <label className='block text-sm font-medium mb-1'>
                  Incident Date<span className='text-red-500'>*</span>
                </label>
                <input
                  type='date'
                  name='incidentDate'
                  value={formData.incidentDate}
                  max={new Date().toISOString().split('T')[0]}
                  className='w-full bg-transparent outline-none py-1'
                  required
                  readOnly
                />
                <p className='text-xs text-gray-400 mt-1'>
                  The date of the incident triggering suspension
                </p>
              </div>

              {/* Sporting Event UID */}
              <div className='bg-[#00000061] p-3 rounded'>
                <label className='block text-sm font-medium mb-1'>
                  Sporting Event UID
                </label>
                <input
                  type='text'
                  name='sportingEventUID'
                  value={formData.sportingEventUID}
                  placeholder='Enter event reference'
                  className='w-full bg-transparent outline-none py-2'
                  readOnly
                />
                <p className='text-xs text-gray-400 mt-1'>
                  Reference to related sporting event (optional)
                </p>
              </div>
            </div>

            {/* Description */}
            <div className='bg-[#00000061] p-3 rounded mt-4'>
              <label className='block text-sm font-medium mb-1'>
                Description<span className='text-red-500'>*</span>
              </label>
              <textarea
                name='description'
                value={formData.description}
                placeholder='Describe the context and reason for suspension (minimum 10 characters)'
                rows={4}
                className='w-full bg-transparent outline-none py-1 resize-vertical'
                required
                readOnly
              />

              <p className='text-xs text-gray-400 mt-1'>
                Context and reason for suspension (minimum 10 characters
                required)
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
              {/* Days Without Training */}
              <div className='bg-[#00000061] p-3 rounded'>
                <label className='block text-sm font-medium mb-1'>
                  Days Without Training
                </label>
                <input
                  type='number'
                  name='daysWithoutTraining'
                  value={formData.daysWithoutTraining}
                  placeholder='Option'
                  min='0'
                  disabled={formData.indefinite}
                  className={`w-full bg-transparent outline-none py-1 ${
                    formData.indefinite ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  readOnly
                />
                <p className='text-xs text-gray-400 mt-1'>
                  Sets when training can resume
                </p>
              </div>

              {/* Days Before Competing */}
              <div className='bg-[#00000061] p-3 rounded'>
                <label className='block text-sm font-medium mb-1'>
                  Days Before Competing
                </label>
                <input
                  type='number'
                  name='daysBeforeCompeting'
                  value={formData.daysBeforeCompeting}
                  placeholder='Option'
                  min='0'
                  disabled={formData.indefinite}
                  className={`w-full bg-transparent outline-none py-1  ${
                    formData.indefinite ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  readOnly
                />
                <p className='text-xs text-gray-400 mt-1'>
                  Sets when competition is allowed again
                </p>
              </div>
            </div>

            {/* Indefinite Checkbox */}
            <div className='bg-[#00000061] p-3 rounded mt-4'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  name='indefinite'
                  checked={formData.indefinite}
                  className='mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded'
                  readOnly
                />
                <label className='text-sm font-medium'>
                  Indefinite Suspension
                </label>
              </div>
              <p className='text-xs text-gray-400 mt-1'>
                Overrides all date-based fields when checked
              </p>
            </div>

            {/* Suspended Person */}
            <div className='mb-6 bg-[#00000061] p-3 rounded  mt-4'>
              <label className='block text-sm font-medium mb-1'>
                Suspended Person<span className='text-red-500'>*</span>
              </label>
              <select
                name='person'
                value={formData.person}
                className='w-full outline-none'
                required
                disabled
              >
                <option value='' className='text-black'>
                  Select person
                </option>
                {people.map((person) => (
                  <option
                    key={person._id}
                    value={person._id}
                    className='text-black'
                  >
                    {person.firstName + ' ' + person.lastName} ({person.email})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
