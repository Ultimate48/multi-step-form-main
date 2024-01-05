import React, { useEffect } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { FormContext } from '../FormContext'

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
    const imagePath = `../../public/${image}`

    return(
    <section className='flex items-center md:w-[274px] relative'>
        <img src={imagePath} alt='bg-sidebar-desktop' className=''/>
            <div className='absolute top-8 md:top-12 flex md:flex-col md:ml-9 justify-center md:justify-normal w-full gap-4 md:gap-7'>
                <Step step='1' title='PERSONAL INFO' isMobile={isMobile} />
                <Step step='2' title='SELECT PLANS' selected='true' isMobile={isMobile} />
                <Step step='3' title='ADD-ONS' isMobile={isMobile} />
                <Step step='4' title='SUMMARY' isMobile={isMobile} />
            </div>
    </section>
    )
}

function Plan({p, prices, isMobile=false}){

    const {isMonthly, plan, setPlan} = useContext(FormContext)

    const image = `./../../public/icon-${p}.svg`
    const alt = `icon-${plan}`

    const price = isMonthly ? prices['monthly'][p] : prices['yearly'][p]

    const base = `md:h-40 w-[290px] md:w-[140px] border rounded-lg border-solid pl-4 py-4 flex hover:cursor-pointer font-[Ubuntu] ${isMobile ? 'flex-row justify-start' : 'flex-col justify-between'} ${isMobile && isMonthly ? 'h-[74px]' : ''}`

    const special = plan === p ? 'border-purplish-blue bg-magnolia' : 'border-light-gray'

    const style = `${base} ${special} relative hover:border-purplish-blue gap-4 md:gap-0`

    const freeStyle = `absolute bottom-3 left-[73px] md:left-[17px] text-[13px] text-marine-blue font-medium ${isMonthly ? 'hidden' : ''}`

    const priceStyle = `text-[14px] text-cool-gray font-medium ${isMonthly ? '' : 'pb-4'}`

    const planChnage = (e) => {
        setPlan(p)
    }

    return(
    <div className={style} onClick={(e) => planChnage(e)}>
        <div>
            <img src = {image} alt={alt} className='h-10'/>
        </div>
        <div>
            <div className='text-marine-blue font-medium'>
                {p}
            </div>
            <div className={priceStyle}>
                {
                    ` $${price}/${isMonthly ? 'mo' : 'yr'}`
                }
            </div>
        </div>
        <div className={freeStyle}>2 months free</div>
    </div>
    )
}

export default function step2({isMobile}) {

    const navigate = useNavigate()

    const {name, email, phone} = useContext(FormContext)

    useEffect(() => {
    if (name === '' || email === '' || phone === ''){
        navigate('/step1')
    }
    }, [])

    const {isMonthly, setIsMonthly} = useContext(FormContext)

    const prices = {
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

    const monthOption  = `${isMonthly ? 'text-marine-blue' : 'text-light-gray'} hover:cursor-pointer`
    const yearOption  = `${isMonthly ? 'text-light-gray' : 'text-marine-blue'} hover:cursor-pointer`

    const ToggleStyles = `w-9 h-5 bg-marine-blue rounded-full flex items-center px-1 justify-start hover:cursor-pointer ${isMonthly ? 'justify-start' : 'justify-end'}`

    const toggle = (e) => {
        e.preventDefault()
        setIsMonthly(!isMonthly)
    }

    const toggleMonthly = (e) => {
        setIsMonthly(true)
    }

    const toggleYearly = (e) => {
        setIsMonthly(false)
    }



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
                        <div className='text-[25px] font-bold text-marine-blue'>Select you plan</div>
                            <div className='text-[16px] text-light-gray w-60'>
                                You have option of monthly or yearly billing.
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 mt-5'>
                            <Plan p='Arcade' prices={prices} isMobile={isMobile}/>
                            <Plan p='Advanced' prices={prices} isMobile={isMobile}/>
                            <Plan p='Pro' prices={prices} isMobile={isMobile}/>
                        </div>
                        <div className='h-[45px] w-[290px] bg-magnolia mt-6 rounded-lg flex justify-center items-center font-bold gap-3'>
                            <div className={monthOption} onClick={(e) => toggleMonthly(e)}>
                                Monthly
                            </div>
                            <div className={ToggleStyles} onClick={(e) => toggle(e)}>
                                <div className='w-[14px] h-[14px] bg-white rounded-full'>
                                </div>
                            </div>
                            <div className={yearOption} onClick={(e) => toggleYearly(e)}>
                                Yearly
                            </div>
                        </div>
                    </div>
                <div className='bg-white absolute bottom-0 w-full p-4'>
                    <div className='flex justify-between'>
                    <button className='font-bold text-light-gray hover:text-marine-blue'
                        onClick={(e) => navigate('/step1')}>
                            Go Back
                        </button>
                        <button className='bg-marine-blue text-white rounded-md h-10 w-[100px] font-medium hover:bg-purplish-blue' type="submit"
                        onClick={(e) => navigate('/step3')}>Next Step</button>
                    </div>
                </div>
            </div>
            :
            <div className='h-[600px] w-[950px] bg-white pl-4 rounded-2xl flex shadow-lg'>
                <Banner isMobile={isMobile}/>
                <section className='flex flex-col justify-between font-[Ubuntu] mt-4 w-[660px] px-[104px] py-8'>
                    <div>
                    <div>
                        <div className='text-[35px] font-bold text-marine-blue'>Select Your Plan</div>
                        <div className='text-[16px] text-light-gray'>
                            You have the option of monthly or yearly billing.
                        </div>
                    </div>
                    <section className='mt-10 gap-5 flex'>
                        <Plan p='Arcade' prices={prices} />
                        <Plan p='Advanced' prices={prices}/>
                        <Plan p='Pro' prices={prices}/>
                    </section>
                    <div className='h-[45px] w-[450px] bg-magnolia mt-[34px] rounded-lg flex justify-center items-center font-bold gap-3'>
                        <div className={monthOption} onClick={(e) => toggleMonthly(e)}>
                            Monthly
                        </div>
                        <div className={ToggleStyles} onClick={(e) => toggle(e)}>
                            <div className='w-[14px] h-[14px] bg-white rounded-full'>
                            </div>
                        </div>
                        <div className={yearOption} onClick={(e) => toggleYearly(e)}>
                            Yearly
                        </div>
                    </div>
                    </div>
                    <div className='flex justify-between mt-[100px]'>
                        <button className='font-bold text-light-gray hover:text-marine-blue'
                        onClick={(e) => navigate('/step1')}>
                            Go Back
                        </button>
                        <button className='bg-marine-blue text-white rounded-md h-12 w-[130px] font-medium hover:bg-purplish-blue' type="submit"
                        onClick={(e) => navigate('/step3')}>Next Step</button>
                    </div>
                </section>
            </div>
        }
    </div>
  )
}

