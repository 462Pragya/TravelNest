import React from 'react'
import { useNavigate } from 'react-router';
import { logoutUser } from '~/appwrite/auth';

const PageLayout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate('/sign-in');
    };
    return (
        <>
            <div>PageLayout</div>

            <button onClick={handleLogout} className='cursor-pointer'>
                <img src="/assets/icons/logout.svg" alt="logout" referrerPolicy='no-referrer' className='size-6' />

            </button>

            <button onClick={() => navigate('/dashboard')}>
                DashBoard
            </button>
        </>
    )
}

export default PageLayout