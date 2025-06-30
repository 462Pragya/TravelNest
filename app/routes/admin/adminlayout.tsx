import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router';

import { getSidebarComponent } from '~/syncfusion';
import { NavItems , MobileSidebar } from '~/components';
import { getExistingUser, storeUserData } from '~/appwrite/auth';
import { account } from '~/appwrite/client';
import { redirect } from 'react-router';

    export async function clientLoader() {
    try {
        const user = await account.get();

        if(!user.$id) return redirect('/sign-in');

        const existingUser = await getExistingUser(user.$id);
        if(existingUser?.status === 'user'){
           return redirect('/');//normal user cant access dashboard only admin can
        }

        return existingUser?.$id ? existingUser : await storeUserData();
    } catch (e) {
        console.log('Error in clientloader', e)
        return redirect('/sign-in')
    }
}


const AdminLayout = () => {

  const [SidebarComponent, setSidebarComponent] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    getSidebarComponent().then((Component) => {
      setSidebarComponent(() => Component);
    });
  }, []);
  return (
    <>
      <div className="admin-layout">
        <MobileSidebar />
        

        <aside className="w-full max-w-[270px] hidden lg:block">
          {SidebarComponent ? (
            <SidebarComponent {...({width:270, enableGestures:false} as any)}>
              <NavItems />
            </SidebarComponent>
          ) : (
            <div>Loading sidebar...</div>
          )}
        </aside>

        <aside className="children">
          <Outlet />
        </aside>
      </div>
    </>
  )
}

export default AdminLayout