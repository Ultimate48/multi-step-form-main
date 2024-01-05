import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

import { FormContext } from '../FormContext.jsx'

function Step({step, title, selected=false, isMobile}){

    const base = 'w-8 h-8 md:w-10 md:h-10 border rounded-full flex justify-center items-center'

    const special = selected ? 'bg-pastel-blue text-marine-blue' : 'text-white'

    const style = `${base} ${special} font-bold`

    return(
        <div className='flex items-center gap-4'>
            <div className={style}>{step}</div>
            {
                isMobile ? null :
                <div>
                    <div className=' font-thin text-white leading-5'>STEP {step}</div>
                    <div className='text-white'>{title}</div>
                </div>
            }
        </div>
    )
}

function Banner({isMobile}){

    const image = isMobile ? 'bg-sidebar-mobile.svg' : 'bg-sidebar-desktop.svg'
    const imagePath = `../${image}`

    return(
    <section className='flex items-center md:w-[274px] relative'>
        <img src={imagePath} alt='bg-sidebar-desktop' className=''/>
            <div className='absolute top-8 md:top-12 flex md:flex-col md:ml-9 justify-center md:justify-normal w-full gap-4 md:gap-7'>
                <Step step='1' title='PERSONAL INFO' isMobile={isMobile} />
                <Step step='2' title='SELECT PLANS'  isMobile={isMobile} />
                <Step step='3' title='ADD-ONS' selected='true' isMobile={isMobile} />
                <Step step='4' title='SUMMARY' isMobile={isMobile} />
            </div>
    </section>
    )
}

function AddOn({name, title, addOn, setAddOn, isMobile=false}){

    const { isMonthly } = useContext(FormContext)

    const priceName = name.toLowerCase().replace(' ', '_')

    const prices = {
        monthly: {
            online_service : 1,
            larger_storage : 2,
            customizable_profile : 2
        },
        yearly: {
            online_service : 10,
            larger_storage : 20,
            customizable_profile : 20
        }
    }

    const price = prices[isMonthly ? 'monthly' : 'yearly'][priceName]

    const tickStyles = `h-5 w-5 border border-light-gray rounded flex justify-center items-center ${addOn ? 'bg-purplish-blue' : ''}`

    const sectionStyles = `h-[60px] md:h-[80px] w-[290px] md:w-[450px] border border-solid rounded-lg flex items-center p-4 gap-4 md:gap-6 hover:cursor-pointer hover:border-purplish-blue ${addOn ? 'bg-magnolia border-purplish-blue' : 'border-light-gray'}`



    return (
        <div className={sectionStyles}  onClick={(e) => setAddOn(!addOn)}>
            <div className={tickStyles}>
                <img src='../icon-checkmark.svg' alt='icon-online' className='w-3 h-3 '/>
            </div>
            <div className='flex-1 flex justify-between items-center'>
                <div>
                    <div className='text-marine-blue font-bold text-[14px] md:text-[16px]'>{name}</div>
                    <div className='text-cool-gray text-[12px] md:text-[14px] font-medium'>{title}</div>
                </div>
                <div className='text-purplish-blue text-[14px] md:text-[16px]'>
                    {isMonthly ? `+$${price}/mo` : `+$${price}/yr`}
                </div>
            </div>
        </div>
    )
}

export default function step3({isMobile}) {

    const navigate = useNavigate()

    const {name, email, phone} = useContext(FormContext)

    useEffect(() => {
        if (name === '' || email === '' || phone === ''){
            navigate('/step1')
        }
        }, [])

    const { onlineService, setOnlineService } = useContext(FormContext)
    const { largerStorage, setLargerStorage } = useContext(FormContext)
    const { customizableProfile, setCustomizableProfile } = useContext(FormContext)

  return (
    <div className='h-screen bg-magnolia flex justify-center items-center'>
        {
            isMobile ?
            <div className='h-screen w-screen flex justify-center'>
                <div className='absolute top-0'>
                    <Banner isMobile={isMobile}/>
                </div>
                <div className='w-[340px] bg-white rounded-lg flex flex-col absolute top-[100px] py-6 px-6 shadow-lg'>
                    <div className='font-[Ubuntu]'>
                        <div className='text-[25px] font-bold text-marine-blue'>Pick add-ons</div>
                            <div className='text-[16px] text-light-gray w-64'>
                                Add-ons help enhance your gaming experience.
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 mt-5'>
                            <AddOn name="Online service" title="Access to multiplayer games" addOn={onlineService} setAddOn={setOnlineService} isMobile={isMobile}/>
                            <AddOn name="Larger storage" title="Extra 1TB of cloud save" addOn={largerStorage} setAddOn={setLargerStorage} isMobile={isMobile}/>
                            <AddOn name="Customizable profile" title="Custom theme on your profile" addOn={customizableProfile} setAddOn={setCustomizableProfile} isMobile={isMobile}/>
                        </div>
                    </div>
                <div className='bg-white fixed bottom-0 w-full p-4'>
                    <div className='flex justify-between'>
                    <button className='font-bold text-light-gray hover:text-marine-blue'
                        onClick={(e) => navigate('/step2')}>
                            Go Back
                        </button>
                        <button className='bg-marine-blue text-white rounded-md h-10 w-[100px] font-medium hover:bg-purplish-blue' type="submit"
                        onClick={(e) => navigate('/step4')}>Next Step</button>
                    </div>
                </div>
            </div>
            :
            <div className='h-[600px] w-[950px] bg-white pl-4 rounded-2xl flex shadow-lg'>
                <Banner isMobile={isMobile}/>
                <section className='flex flex-col justify-between font-[Ubuntu] mt-4 w-[660px] px-[104px] py-8'>
                    <div>
                    <div>
                        <div className='text-[35px] font-bold text-marine-blue'>Pick add-ons</div>
                        <div className='text-[16px] text-light-gray'>
                            Add-ons help enhance your gaming experience.
                        </div>
                    </div>
                    <section className='mt-10 gap-5 flex flex-col'>
                        <AddOn name="Online Service" title="Access to multiplayer games" addOn={onlineService} setAddOn={setOnlineService}/>
                        <AddOn name="Larger Storage" title="Extra 1TB of cloud save" addOn={largerStorage} setAddOn={setLargerStorage}/>
                        <AddOn name="Customizable Profile" title="Custom theme on your profile" addOn={customizableProfile} setAddOn={setCustomizableProfile}/>
                    </section>
                    </div>
                    <div className='flex justify-between'>
                        <button className='font-bold text-light-gray hover:text-marine-blue'
                        onClick={(e) => navigate('/step2')}>
                            Go Back
                        </button>
                        <button className='bg-marine-blue text-white rounded-md h-12 w-[130px] font-medium hover:bg-purplish-blue' type="submit"
                        onClick={(e) => navigate('/step4')}>Next Step</button>
                    </div>
                </section>
            </div>
        }
    </div>
  )
}

