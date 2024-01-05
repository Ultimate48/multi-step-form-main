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
                <Step step='2' title='SELECT PLANS' isMobile={isMobile} />
                <Step step='3' title='ADD-ONS' isMobile={isMobile} />
                <Step step='4' title='SUMMARY'selected='true' isMobile={isMobile} />
            </div>
    </section>
    )
}

function AddOn({name, prices, selected}){

    const {isMonthly} = useContext(FormContext)

    const price = prices[isMonthly ? 'monthly' : 'yearly'][name.toLowerCase().replace(' ', '_')]

    return (
        selected ? 
        <div className='flex justify-between items-center font-[Ubuntu]'>
            <div className=' text-cool-gray text-[15px] font-normal'>{name}</div>
            <div className='text-[14px] text-marine-blue font-medium'>{
                `+$${price}/${isMonthly ? 'mo' : 'yr'}`
            }</div>
        </div>
        : <></>
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

    const {isMonthly, plan, onlineService, largerStorage, customizableProfile} = useContext(FormContext)

    const planPrices = {
        monthly: {
            'Arcade': 9,
            'Advanced': 12,
            'Pro': 15
        },
        yearly: {
            'Arcade': 90,
            'Advanced': 120,
            'Pro': 150
        }
    }

    const addOnPrices = {
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

    const topName  = `${plan} ${isMonthly ? '(Monthly)' : '(Yearly)'}`
    const topPrice = `$${planPrices[isMonthly ? 'monthly' : 'yearly'][plan]}/${isMonthly ? 'mo' : 'yr'}`

    let totalPrice = planPrices[isMonthly ? 'monthly' : 'yearly'][plan]

    if(onlineService) totalPrice += addOnPrices[isMonthly ? 'monthly' : 'yearly']['online_service']

    if(largerStorage) totalPrice += addOnPrices[isMonthly ? 'monthly' : 'yearly']['larger_storage']

    if(customizableProfile) totalPrice += addOnPrices[isMonthly ? 'monthly' : 'yearly']['customizable_profile']

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
                        <div className='text-[25px] font-bold text-marine-blue'>Finishing up</div>
                            <div className='text-[16px] text-light-gray w-64'>
                                Double-check everything looks OK before confirming.
                            </div>
                        </div>
                        <div className='flex flex-col mt-5'>
                            <section className='gap-5 flex flex-col'>
                                <div className='w-[290px] bg-magnolia rounded-lg p-5'>
                                    <div className='w-full flex justify-between items-center'>
                                        <div>
                                            <div className='font-bold text-marine-blue text-[14px]'>{topName}</div>
                                            <div className='text-cool-gray underline text-[15px] font-medium hover:text-purplish-blue hover:cursor-pointer'
                                            onClick={() => navigate('/step2')}>Change</div>
                                        </div>
                                        <div className=' text-marine-blue font-bold text-[14px]'>
                                            {topPrice}
                                        </div>
                                    </div>
                                    <hr className='my-4 h-[2px] bg-light-gray'/>
                                    <div className='flex flex-col gap-3'>
                                    <AddOn name='Online service' prices={addOnPrices} selected={onlineService}/>
                                    <AddOn name='Larger storage' prices={addOnPrices} selected={largerStorage}/>
                                    <AddOn name='Customizable profile' prices={addOnPrices} selected={customizableProfile}/>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center px-5'>
                                    <div className='text-cool-gray text-[15px] font-medium'>
                                        Total{isMonthly ? ' (per month)' : ' (per year)'}
                                    </div>
                                    <div className=' text-purplish-blue font-bold text-lg'>
                                        {`+$${totalPrice}/${isMonthly ? 'mo' : 'yr'}`}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                <div className='bg-white fixed bottom-0 w-full p-4'>
                    <div className='flex justify-between'>
                    <button className='font-bold text-light-gray hover:text-marine-blue'
                        onClick={(e) => navigate('/step3')}>
                            Go Back
                        </button>
                        <button className='bg-purplish-blue text-white rounded-md h-10 w-[100px] font-medium hover:bg-pastel-blue' type="submit"
                        onClick={(e) => navigate('/step5')}>Confirm</button>
                    </div>
                </div>
            </div>
            :
            <div className='h-[600px] w-[950px] bg-white pl-4 rounded-2xl flex shadow-lg'>
                <Banner isMobile={isMobile}/>
                <section className='flex flex-col justify-between font-[Ubuntu] mt-4 w-[660px] px-[104px] py-8'>
                    <div>
                    <div>
                        <div className='text-[35px] font-bold text-marine-blue'>Finishing up</div>
                        <div className='text-[16px] text-light-gray'>
                            Double-check everything looks Ok before confirming.
                        </div>
                    </div>
                    <section className='mt-10 gap-5 flex flex-col'>
                        <div className='w-[450px] bg-magnolia rounded-lg p-5'>
                            <div className='w-full flex justify-between items-center'>
                                <div>
                                    <div className='font-medium text-marine-blue'>{topName}</div>
                                    <div className='text-cool-gray underline text-[15px] font-medium hover:text-purplish-blue hover:cursor-pointer'
                                    onClick={() => navigate('/step2')}>Change</div>
                                </div>
                                <div className=' text-marine-blue font-bold'>
                                    {topPrice}
                                </div>
                            </div>
                            <hr className='my-4 h-[2px] bg-light-gray'/>
                            <div className='flex flex-col gap-3'>
                            <AddOn name='Online service' prices={addOnPrices} selected={onlineService}/>
                            <AddOn name='Larger storage' prices={addOnPrices} selected={largerStorage}/>
                            <AddOn name='Customizable profile' prices={addOnPrices} selected={customizableProfile}/>
                            </div>
                        </div>
                        <div className='flex justify-between items-center px-5'>
                            <div className='text-cool-gray text-[15px]'>
                                Total{isMonthly ? ' (per month)' : ' (per year)'}
                            </div>
                            <div className=' text-purplish-blue font-bold text-xl'>
                                {`+$${totalPrice}/${isMonthly ? 'mo' : 'yr'}`}
                            </div>
                        </div>
                    </section>
                    </div>
                    <div className='flex justify-between mt-20'>
                        <button className='font-bold text-light-gray hover:text-marine-blue'
                        onClick={(e) => navigate('/step3')}>
                            Go Back
                        </button>
                        <button className='bg-purplish-blue text-white rounded-md h-12 w-[130px] font-medium hover:bg-pastel-blue' type="submit"
                        onClick={(e) => navigate('/step5')}>Confirm</button>
                    </div>
                </section>
            </div>
        }
    </div>
  )
}

