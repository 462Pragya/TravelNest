


import React from 'react'
import Header from '~/components/Header'

const Dashboard = () => {

  const user ={name : 'Daisy'}
  return (
  <div>
    <main className='dashboard wrapper'>
      <Header
      title={`Welconme ${user?.name ?? 'Guest'}`}
      description="Explore the latest features and updates in your dashboard."
       />

       dashboard page content
    </main>
  </div>
  )
}

export default Dashboard