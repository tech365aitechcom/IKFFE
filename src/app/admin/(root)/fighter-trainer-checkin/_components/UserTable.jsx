'use client'

export function UserTable({ users, handleFighterClick }) {
  const renderHeader = (label, key) => (
    <th className='px-4 pb-3 whitespace-nowrap cursor-pointer'>
      <div className='flex items-center gap-1'>{label}</div>
    </th>
  )

  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-purple-500',
      'bg-red-500',
      'bg-yellow-500',
    ]
    // Simple hash function to consistently assign a color based on name
    const charSum = name
      .split('')
      .reduce((sum, char) => sum + char.charCodeAt(0), 0)
    return colors[charSum % colors.length]
  }

  return (
    <div className='border border-[#343B4F] rounded-lg overflow-hidden'>
      <div className='mb-4 pb-4 p-4 flex justify-between items-center border-b border-[#343B4F]'>
        <p className='text-sm'>All Users</p>
        <p className='text-sm'>1 - 10 of {users.length}</p>
      </div>
      <div className='overflow-x-auto'>
        <table className='w-full text-sm text-left'>
          <thead>
            <tr className='text-gray-400 text-sm'>
              {renderHeader('Name', 'name')}
              {renderHeader('Weight#', 'regNumber')}
              {renderHeader('Type', 'type')}
              {renderHeader('Age', 'age')}
              {renderHeader('Weight', 'weight')}
              {renderHeader('Height', 'height')}
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className={`cursor-pointer ${
                  index % 2 === 0 ? 'bg-[#0A1330]' : 'bg-[#0B1739]'
                }`}
              >
                <td className='p-4'>
                  <div
                    className='flex items-center cursor-pointer hover:text-blue-300'
                    onClick={() => handleFighterClick(user)}
                  >
                    <div
                      className={`w-8 h-8 rounded-full ${getAvatarColor(
                        user.name
                      )} flex items-center justify-center text-white text-xs mr-2`}
                    >
                      {user.avatar || user.name.charAt(0)}
                    </div>
                    {user.name}
                  </div>
                </td>
                <td className='p-4'>{user.regNumber}</td>
                <td className='p-4'>{user.type}</td>
                <td className='p-4'>{user.age}</td>
                <td className='p-4'>{user.weight}</td>
                <td className='p-4'>{user.height}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
