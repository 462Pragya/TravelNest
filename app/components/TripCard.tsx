import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { cn } from '~/lib/utils';
import { getChipComponents } from '~/syncfusion';




const TripCard = ({ id, name, location, imageUrl, tags, price }: TripCardProps) => {
  const [ChipListComponent, setChipListComponent] = useState<any>(null);
  const [ChipsDirective, setChipsDirective] = useState<any>(null);
  const [ChipDirective, setChipDirective] = useState<any>(null);

  useEffect(() => {
    const loadComponents = async () => {
      const {
        ChipListComponent,
        ChipsDirective,
        ChipDirective,
      } = await getChipComponents();
      setChipListComponent(() => ChipListComponent);
      setChipsDirective(() => ChipsDirective);
      setChipDirective(() => ChipDirective);
    };

    loadComponents();
  }, []);

  const getFirstWord = (text: string) => text?.split(' ')[0];


  const path = useLocation();

  if (!ChipListComponent || !ChipsDirective || !ChipDirective) {
    return <div>Loading tags...</div>;
  }


  return (
    <Link to={path.pathname === '/' || path.pathname.startsWith('/travel') ? `/travel/${id}` : `/trips/${id}`}
      className='trip-card'   >
      <img src={imageUrl} alt={name} />

      <article>
        <h2>{name}</h2>
        <figure>
          <img src="/assets/icons/location-mark.svg"
            alt="location" className="size-4"
          />
          <figcaption>{location}</figcaption>
        </figure>

      </article>
      <div className="mt-5 pl-[18px] pr-3.5 pb-5">
        <ChipListComponent id="travel-chip">
          <ChipsDirective>
            {tags?.map((tag, index) => (
              <ChipDirective
                key={index}
                text={getFirstWord(tag)}
                cssClass={cn(index === 1
                  ? '!bg-pink-50 !text-pink-500'
                  : '!bg-green-50 !text-green-700')}
              />
            ))}
          </ChipsDirective>
        </ChipListComponent>
      </div>
      <article className="tripCard-pill">{price}</article>
    </Link>

  )
}

export default TripCard