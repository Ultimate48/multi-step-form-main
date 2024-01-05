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


export default function step5({isMobile}) {

    const navigate = useNavigate()

    const {name, email, phone} = useContext(FormContext)

    useEffect(() => {
        if (name === '' || email === '' || phone === ''){
            navigate('/step1')
        }
        }, [])

  return (
    <div className='h-screen bg-magnolia flex justify-center items-center'>
        {
            isMobile ?
            <div className='h-screen w-screen flex justify-center'>
                <div className='absolute top-0'>
                    <Banner isMobile={isMobile}/>
                </div>
                <div className='w-[340px] bg-white rounded-lg flex flex-col absolute top-[100px] py-[75px] px-5 justify-center items-center gap-5 shadow-lg'>
                    <div className='w-14'>
                        <img src = '../icon-thank-you.svg' alt='illustration-summary' />
                    </div>
                    <div className='flex flex-col justify-center items-center text-center gap-3 font-[Ubuntu]'>
                        <div className='text-2xl text-marine-blue font-bold'>Thank you!</div>
                        <div className='text-cool-gray'>
                            Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className='h-[600px] w-[950px] bg-white pl-4 rounded-2xl flex shadow-lg'>
                <Banner isMobile={isMobile} />
                <section className='flex flex-col justify-center font-[Ubuntu] mt-4 w-[660px] px-[104px] py-8 items-center gap-10'>
                    <div className='flex justify-center'>
                        <img src = '../icon-thank-you.svg' alt='illustration-summary' />
                    </div>
                    <div className='flex flex-col justify-center items-center text-center gap-3'>
                        <div className='text-3xl text-marine-blue font-bold'>Thank you!</div>
                        <div className='text-cool-gray'>
                            Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.
                        </div>
                    </div>
                </section>
            </div>
        }
    </div>
  )
}

