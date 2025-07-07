
import Header from '~/components/Header'
import { ComboBox } from '~/syncfusion'
import type { Route } from './+types/create-trip'
import React, { useRef, useEffect, useState } from 'react';
import { comboBoxItems, selectItems, travelStyles } from '~/constants'
import { cn, formatKey } from '~/lib/utils'
import { MapsComponent, LayersDirective, LayerDirective } from '~/syncfusion';
import { world_map } from '~/constants/world_map';
import { getButtonComponent } from '~/syncfusion';
import { account } from '~/appwrite/client';

export const loader = async () => {

     const response = await fetch('https://restcountries.com/v3.1/all?fields=name,latlng,flags,maps,flag,cca2');
     const data = await response.json();

     return data.map((country: any) => ({
          name: country.name.common,
          coordinates: country.latlng,
          value: country.name.common,
          flag: country.flags?.svg || country.flags?.png || country.flags?.alt || '',
          openStreetMap: country.maps?.openStreetMap,
     }));

}
const CreateTrip = ({ loaderData }: Route.ComponentProps) => {



     const countries = loaderData as Country[];
     const [formData, setFormData] = useState<{
          country: { text: string; value: string; flag: string } | null;
          travelStyle: string;
          interest: string;
          budget: string;
          duration: number;
          groupType: string;
     }>({
          country: null,
          travelStyle: '',
          interest: '',
          budget: '',
          duration: 0,
          groupType: '',
     });
     const [error, setError] = useState<string | null>(null);
     const [loading, setLoading] = useState(false);

     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          setLoading(true);

          if (
               !formData.country ||
               !formData.travelStyle ||
               !formData.interest ||
               !formData.budget ||
               !formData.groupType
          ) {
               setError('Please provide values for all fields');
               setLoading(false)
               return;
          }

          if (formData.duration < 1 || formData.duration > 10) {
               setError('Duration must be between 1 and 10 days');
               setLoading(false)
               return;
          }
          const user = await account.get();
          if (!user.$id) {
               console.error('User not authenticated');
               setLoading(false)
               return;
          }

          try {
               console.log('User Data:', user);
               console.log('Form Data:', formData);

          } catch (e) {
               console.error('Error generating trip', e);
          }
          finally {
               setLoading(false)
          }


     }
     const handleChange = (key: keyof TripFormData, value: any) => {

          setFormData({ ...formData, [key]: value });
     }


     const countryData = countries.map((country) => ({
          text: country.name,
          value: country.value,
          flag: country.flag,
     }))
     const mapData = formData.country?.value
          ? [{
               country: formData.country.value, // ✅ This is "India"
               color: '#EA382E',
               coordinates: countries.find((c) => c.name === formData.country?.value)?.coordinates || [],
          }]
          : [];
     console.log("Selected Country (formData.country):", formData.country);
     console.log("Map Data:", mapData);

     const [ButtonComponent, setButtonComponent] = useState<any>(null);

     useEffect(() => {
          const load = async () => {
               const Btn = await getButtonComponent();
               setButtonComponent(() => Btn);
          };
          load();
     }, []);

     if (!ButtonComponent) return <div>Loading submit button...</div>;


     return (
          <main className='flex flex-col gap-10 pb-20 wrapper'>

               <Header
                    title="Add a New Trip"
                    description="View and edit AI generated travel plans"
               />
               <section className='mt-2.5 wrapper-md'>
                    <form action="" className='trip-form' onSubmit={handleSubmit}>
                         <div >
                              <label htmlFor="country">
                                   Country
                              </label>
                              <ComboBox
                                   id="country"
                                   dataSource={countryData}
                                   fields={{ text: 'text', value: 'value' }}
                                   placeholder="Select a Country"
                                   className="combo-box"


                                   itemTemplate={(data: any) => (
                                        <span className="flex items-center gap-2">
                                             <img
                                                  src={data.flag}
                                                  alt={data.text}
                                                  className="w-5 h-4 rounded-sm ml-1 inline-block"
                                             />
                                             <span className="inline-block">{data.text}</span>
                                        </span>
                                   )}

                                   // valueTemplate={(data: any) => (
                                   //      <span className="flex items-center gap-2">
                                   //           <img
                                   //                src={data.flag}
                                   //                alt={data.text}
                                   //                className="w-5 h-4 rounded-sm  inline-block"
                                   //           />
                                   //           <span className="inline-block">{data.text}</span>
                                   //      </span>
                                   // )}

                                   filtering={(e) => {
                                        const query = (e.text || '').toLowerCase()
                                        const filtered = countryData.filter((country) =>
                                             country.text.toLowerCase().includes(query)
                                        )

                                        setTimeout(() => {
                                             e.updateData(filtered, null)
                                        })
                                   }}

                                   change={(e: { itemData?: any }) => {
                                        if (e.itemData) {
                                             handleChange('country', e.itemData)
                                        }
                                   }}
                              />


                         </div>

                         <div>
                              <label htmlFor="duration">Duration</label>
                              <input
                                   id="duration"
                                   name="duration"
                                   type="number"
                                   placeholder="Enter a number of days"
                                   className="form-input placeholder:text-gray-100"
                                   onChange={(e) => handleChange('duration', Number(e.target.value))}
                              />
                         </div>

                         {selectItems.map((key) => (
                              <div key={key}>
                                   <label htmlFor={key}>{formatKey(key)}</label>

                                   <ComboBox
                                        id={key}
                                        dataSource={comboBoxItems[key].map((item) => ({
                                             text: item,
                                             value: item,
                                        }))}
                                        fields={{ text: 'text', value: 'value' }}
                                        placeholder={`Select ${formatKey(key)}`}

                                        change={(e: { value?: any }) => {
                                             if (e.value) {
                                                  handleChange(key, e.value)
                                             }
                                        }}
                                        allowFiltering
                                        filtering={(e) => {
                                             const query = e.text.toLowerCase();

                                             e.updateData(
                                                  comboBoxItems[key]
                                                       .filter((item) => item.toLowerCase().includes(query))
                                                       .map(((item) => ({
                                                            text: item,
                                                            value: item,
                                                       }))))
                                        }}
                                        className="combo-box"

                                   />

                              </div>

                         ))
                         }

                         <div>
                              <label htmlFor="location">
                                   Location on the world map
                              </label>
                              <MapsComponent>
                                   <LayersDirective>
                                        <LayerDirective
                                             shapeData={world_map}
                                             dataSource={mapData}
                                             shapePropertyPath="name"
                                             shapeDataPath="country"
                                             shapeSettings={{ colorValuePath: "color", fill: "#E5E5E5" }}
                                        />
                                   </LayersDirective>
                              </MapsComponent>
                         </div>

                         <div className="bg-gray-200 h-px w-full" />

                         {error && (
                              <div className="error">
                                   <p>{error}</p>
                              </div>
                         )}

                         <footer className='px-6 w-full'>
                              <ButtonComponent type="submit"
                                   className="button-class !h-12 !w-full" disabled={loading}

                              > <img src={`/assets/icons/${loading ? 'loader.svg' : 'magic-star.svg'}`} className={cn("size-5", { 'animate-spin': loading })} />
                                   <span className="p-16-semibold text-white">
                                        {loading ? 'Generating...' : 'Generate Trip'}
                                   </span>

                              </ButtonComponent>
                         </footer>
                    </form>
               </section>
          </main>
     )
}

export default CreateTrip