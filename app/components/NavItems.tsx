
import React from 'react'

import { Link, NavLink, useLoaderData, useNavigate, useLocation } from 'react-router';
import { logoutUser } from '~/appwrite/auth';
import { sidebarItems } from '~/constants';
import { cn } from '~/lib/utils';

const NavItems = ({ handleClick }: { handleClick?: () => void }) => {

    const user = useLoaderData();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = async () => {
        await logoutUser();
        navigate('/sign-in');
    };
    return (
        <section className="nav-items">
            <Link to='/' className="link-logo">
                <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
                <h1>TravelNest</h1>
            </Link>

            <div className='container'>
                <nav>
                    {sidebarItems.map(({ id, href, icon, label }) => {
                        const isActive = location.pathname === href || location.pathname.startsWith('/' + href);

                        return (
                            <NavLink key={id} to={href}>
                                <div
                                    className={cn('group nav-item', {
                                        'bg-blue-500 !text-white': isActive
                                    })}
                                    onClick={handleClick}
                                >
                                    <img
                                        src={icon}
                                        alt={label}
                                        className={cn(
                                            'transition-all duration-200',
                                            isActive ? 'brightness-0 invert'  : 'filter-none', '!text-white',
                                            'group-hover:brightness-0 group-hover:invert'
                                        )}
                                        
                                    />
                                    {label}
                                </div>
                            </NavLink>
                        );
                    })}
                </nav>

                <footer className='nav-footer'>
                    <img src={user?.imageUrl || '/assest/images/david.webp'} alt={user?.name || 'David'} />
                    <article>
                        <h2>{user?.name}</h2>
                        <p>{user?.email}</p>
                    </article>
                    <button onClick={handleLogout} className='cursor-pointer'>
                        <img src="/assets/icons/logout.svg" alt="logout" referrerPolicy='no-referrer' className='size-6' />

                    </button>
                </footer>

            </div>
        </section>
    )
}

export default NavItems