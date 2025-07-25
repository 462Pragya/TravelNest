import { getButtonComponent } from '~/syncfusion';
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";
interface Props {
  title: string;
  description: string;
  ctaText?: string;
  ctaUrl?: string;
}
const Header = ({ title, description, ctaText, ctaUrl }: Props) => {
  const location = useLocation();
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
    <header className='header'>
      <article>
        <h1 className={cn("text-dark-100", location.pathname === '/' ? 'text-2xl md:text-4xl font-bold' : 'text-xl md:text-2xl font-semibold')}>{title}</h1>
        <p className={cn("text-gray-100 font-normal", location.pathname === '/' ? 'text-base md:text-lg' : 'text-sm md:text-lg')}>{description}</p>
      </article>

      {ctaText && ctaUrl && (
        <Link to={ctaUrl} className="btn btn-primary">
          <ButtonComponent type="button" className="button-class !h-11 !w-full !p-5 md:w-[240px]">
            <img src="/assets/icons/plus.svg" alt="plus" className="size-5" />
            <span className="p-16-semibold text-white">{ctaText}</span>

          </ButtonComponent>
        </Link>
      )}
    </header>
  )
}

export default Header