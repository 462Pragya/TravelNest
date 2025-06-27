
import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { getSidebarComponent } from '~/syncfusion';
import NavItems from './NavItems';

const MobileSidebar = () => {
    const [SidebarComponent, setSidebarComponent] = useState<any>(null);
    const sidebarRef = useRef<any>(null);

    useEffect(() => {
        const loadComponent = async () => {
            const Component = await getSidebarComponent();
            setSidebarComponent(() => Component);
        };
        loadComponent();
    }, []);

    const toggleSidebar = () => {
        if (sidebarRef.current?.isOpen) {
            sidebarRef.current.toggle();
        } else {
            sidebarRef.current?.show();
        }
    };

    return (
        <section className="mobile-sidebar">
            <header>
                <Link to='/' className="link-logo">
                    <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
                    <h1>TravelNest</h1>
                </Link>
                <button onClick={toggleSidebar} className="toggle-button cursor-pointer">
                    <img src="/assets/icons/menu.svg" alt="menu" className='size-7' />
                </button>
            </header>
            {SidebarComponent ? (
                <SidebarComponent
                    width={270}
                    ref={(el: any) => (sidebarRef.current = el)}
                    created={() => sidebarRef.current?.hide()}
                    closeOnDocumentClick={true}
                    showBackdrop={true}
                    type="Over"
                >
                    <NavItems handleClick={toggleSidebar} />
                </SidebarComponent>
            ) : (
                <div>Loading sidebar...</div>
            )}


        </section>
    )
}

export default MobileSidebar