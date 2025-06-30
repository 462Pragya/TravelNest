



import React from 'react'
import { StatsCard, TripCard } from '~/components'
import Header from '~/components/Header'
import { dashboardStats, user, allTrips }  from '~/components'
import { getUser } from '~/appwrite/auth'
import type { Route } from './+types/dashboard'

export const clientLoader = async () => await getUser();
  // This function fetches the user data and returns it to the component.


  // Simulating fetching dashboard stats and user data
const Dashboard = ({loaderData} : Route.ComponentProps) => {
    const user = loaderData as User | null;

  const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } = dashboardStats;
  return (
  <div>
    <main className='dashboard wrapper'>
      <Header
      title={`Welcome ${user?.name ?? 'Guest'}`}
      description="Explore the latest features and updates in your dashboard."
       />
       <section className='flex flex-col gap-6'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
          <StatsCard
            headerTitle="Total Users"
            total={totalUsers}
            currentMonthCount={usersJoined.currentMonth} 
            lastMonthCount={usersJoined.previousMonth}
            />
             <StatsCard
            headerTitle="Total Trips"
            total={totalTrips}
            currentMonthCount={tripsCreated.currentMonth} 
            lastMonthCount={tripsCreated.previousMonth}
            />
             <StatsCard
            headerTitle="Active Users" 
            total={userRole.total}
            currentMonthCount={userRole.currentMonth} 
            lastMonthCount={userRole.previousMonth}
            />

        </div>

       </section>
     
        <section className="container">
                <h1 className="text-xl font-semibold text-dark-100">Created Trips</h1>

                <div className='trip-grid'>
                    {allTrips.slice(0,4).map(({id, name, imageUrls, itinerary, tags, estimatedPrice}) => (
                        <TripCard
                            key={id}
                            id={id.toString()}
                            name={name}
                            imageUrl={imageUrls[0]}
                            location={itinerary?.[0]?.location ?? ''}
                            tags={tags}
                            price={estimatedPrice}
                        />
                    ))}
                </div>
            </section>
    </main>
  </div>
  )
}

export default Dashboard