import React from 'react'
import Header from '~/components/Header'
import { GridComponent, ColumnsDirective, ColumnDirective } from '~/syncfusion';
// import { users } from '~/components';
import { cn, formatDate } from '~/lib/utils';
import { getAllUsers } from '~/appwrite/auth';
import type { Route } from './+types/all-users';

export const loader = async () => {

 const { users, total } = await getAllUsers(10, 0);

    return { users, total };
}
const AllUsers = ({loaderData} : Route.ComponentProps) => {
      const {users} = loaderData;
 
  return (
    <main className='all-users wrapper'>
      <Header
      title="Manage Users"
      description="Filter, sort, and access detailed user profiles"
       />
      
      <GridComponent dataSource={users} gridLines="None">
      <ColumnsDirective>
        {/* Name Column with Avatar */}
        <ColumnDirective
          field="name"
          headerText="Name"
          width="200"
          textAlign="Left"
          template={(props: UserData) => (
            <div className="flex items-center gap-1.5 px-4">
              <img
                src={props.imageUrl}
                alt="user"
                className="rounded-full size-8 aspect-square"
                referrerPolicy="no-referrer"
              />
              <span>{props.name}</span>
            </div>
          )}
        />

        {/* Email Column */}
        <ColumnDirective
          field="email"
          headerText="Email Address"
          width="200"
          textAlign="Left"
        />

        {/* Joined At Column with formatted date */}
        <ColumnDirective
          field="joinedAt"
          headerText="Date Joined"
          width="140"
          textAlign="Left"
          template={({ joinedAt }: { joinedAt: string }) => formatDate(joinedAt)}
        />
        {/* Itinerary Created Column with formatted date */}
        { /* <ColumnDirective
          field="itineraryCreated"
          headerText="Trip Created"
          width="140"
          textAlign="Left"
          
        /> */}

        {/* Status Column with dynamic colors */}
        <ColumnDirective
          field="status"
          headerText="Type"
          width="100"
          textAlign="Left"
          template={({ status }: UserData) => (
            <article
              className={cn(
                'status-column',
                status === 'user' ? 'bg-green-50' : 'bg-gray-50'
              )}
            >
              <div
                className={cn(
                  'size-1.5 rounded-full',
                  status === 'user' ? 'bg-green-500' : 'bg-gray-500'
                )}
              />
              <h3
                className={cn(
                  'font-inter text-xs font-medium',
                  status === 'user' ? 'text-green-700' : 'text-gray-500'
                )}
              >
                {status}
              </h3>
            </article>
          )}
        />
      </ColumnsDirective>
    </GridComponent>


    </main>

  )
}

export default AllUsers