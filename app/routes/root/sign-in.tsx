import {useEffect,useState} from 'react'
import { getButtonComponent } from '~/syncfusion';
import { loginWithGoogle } from '~/appwrite/auth';
import { Link, redirect } from 'react-router'
import { account } from '~/appwrite/client';


    export async function clientLoader() {
    try {
        const user = await account.get();

        if(user.$id) return redirect('/');
    } catch (e) {
        console.log('Error fetching user', e)
    }
}

const SignIn  = () => {


  const [ButtonComponent, setButtonComponent] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const Btn = await getButtonComponent();
      setButtonComponent(() => Btn);
    };
    load();
  }, []);

  if (!ButtonComponent) return <div>Loading sign-in button...</div>;

  return (
    <main className='auth'> 
         <section className='size-full glassmorphism flex-center px-6'>
            <div className='sign-in-card'>
                <header className='header'>
                    <Link to='/sign-in'>  
                          <img src="/assets/icons/logo.svg" alt="logo"
                          className='size-[30px]' />
                    </Link>
                    <h2 className='p-28-bold text-black-100'>TravelNest</h2>
                </header>
                <article>
                    <h2 className='p-28-semibold text-black-100 text-center'>Start Your Travel Journey</h2>
                    <p className='p-18-regular text-center text-gray-400 !leading-7 '>Sign in with Google to manage destinations, itineraries, and user activity with ease</p>
                </article>

                 <ButtonComponent
                        type="button"
                        iconCss="e-search-icon"
                        className="button-class !h-11 !w-full bg-blue-500 hover:bg-blue-600"
                        onClick={loginWithGoogle}
                    >
                        <img
                            src="/assets/icons/google.svg"
                            className="size-5"
                            alt="google"
                        />
                        <span className="p-18-semibold text-white">Sign in with Google</span>
                    </ButtonComponent>
            </div>
            </section>    
    </main>
  )
}

export default SignIn 