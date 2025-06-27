import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router';

import { getSidebarComponent } from '~/syncfusion';
import { NavItems , MobileSidebar } from '~/components';

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