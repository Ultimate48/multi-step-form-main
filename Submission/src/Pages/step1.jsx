import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { FormContext } from '../FormContext.jsx'


function Input({label, placeholder, check, fillIn, preSet='', isMobile = false}) {

    const errorLabelBase = 'font-bold text-strawberry-red'
    const errorLabel = check ? `${errorLabelBase} hidden` : errorLabelBase

    const inputBase = 'border border-light-gray rounded-md p-2 pl-3 mt-1 outline-none h-[42px] md:h-12 w-[290px] md:w-[450px] font-medium'

    const input = check ? `${inputBase} focus:border-purplish-blue` : `${inputBase} border-strawberry-red focus:border-strawberry-red`

    return (
        <div className='flex flex-col'>
            <label className='text-[12px] md:text-[14px] flex justify-between mr-1 leading-3 md:leading-normal'>
                <div className='font-medium text-marine-blue'>{label}
                </div>
                <div className={errorLabel}>
                    The field is required
                </div>
            </label>
            <input placeholder={placeholder} className={input} 
            onChange={(e) => fillIn(e.target.value)} value={preSet}/>
        </div>
    )
}

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
                <Step step='1' title='PERSONAL INFO' selected='true' isMobile={isMobile} />
                <Step step='2' title='SELECT PLANS' isMobile={isMobile} />
                <Step step='3' title='ADD-ONS' isMobile={isMobile} />
                <Step step='4' title='SUMMARY' isMobile={isMobile} />
            </div>
    </section>
    )
}

export default function step1({isMobile}) {

    const {name, email, phone} = useContext(FormContext)
    const {setName, setEmail, setPhone} = useContext(FormContext)

    const [isNameFilled, setIsNameFilled] = useState(true)
    const [isEmailFilled, setIsEmailFilled] = useState(true)
    const [isPhoneFilled, setIsPhoneFilled] = useState(true)


    const boxStyles = `h-[600px] w-[950px] bg-white pl-4 rounded-2xl flex shadow-lg ${isMobile ? 'flex-col items-center' : ''} `

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        name === '' ? setIsNameFilled(false) : setIsNameFilled(true)
        email === '' ? setIsEmailFilled(false) : setIsEmailFilled(true)
        phone === '' ? setIsPhoneFilled(false) : setIsPhoneFilled(true)

        if (name === '' || email === '' || phone === '') 
            return
        else
            navigate('/step2')
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
                    <div className='text-[25px] font-bold text-marine-blue'>Personal info</div>
                        <div className='text-[16px] text-light-gray w-60'>
                            Please provide your name, email address and phone number.
                        </div>
                    </div>
                    <section className='mt-6 md:mt-10 gap-4 md:gap-5 flex flex-col'>
                        <Input label='Name' placeholder='e.g. Stephen King' check={isNameFilled} fillIn={setName} preSet={name} isMobile={isMobile}/>
                        <Input label='Email Address' placeholder='e.g. stephenking@lorem.com' check={isEmailFilled} fillIn={setEmail} preSet={email} isMobile={isMobile}/>
                        <Input label='Phone Number' placeholder='e.g. +1 234 567 890' check={isPhoneFilled} fillIn={setPhone} preSet={phone} isMobile={isMobile}/>
                    </section>
                    <div>
                    </div>
                </div>
                <div className='bg-white absolute bottom-0 w-full p-4'>
                    <div className='flex justify-end'>
                        <button className='bg-marine-blue text-white rounded-md h-10 w-[100px] font-medium hover:bg-purplish-blue' type="submit"
                        onClick={(e) => handleSubmit(e)}>Next Step</button>
                    </div>
                </div>
            </div>
            :
            <div className={boxStyles}>
                <Banner isMobile={isMobile}/>
                <section className="flex flex-col justify-between font-[Ubuntu] mt-4 w-[660px] px-[104px] py-8">
                    <div>
                        <div>
                        <div className='text-[35px] font-bold text-marine-blue'>Personal info</div>
                        <div className='text-[16px] text-light-gray'>
                            Please provide your name, email address and phone number.
                        </div>
                        </div>
                        <section className='mt-6 md:mt-10 gap-4 md:gap-5 flex flex-col'>
                            <Input label='Name' placeholder='e.g. Stephen King' check={isNameFilled} fillIn={setName} preSet={name} isMobile={isMobile}/>
                            <Input label='Email Address' placeholder='e.g. stephenking@lorem.com' check={isEmailFilled} fillIn={setEmail} preSet={email} isMobile={isMobile}/>
                            <Input label='Phone Number' placeholder='e.g. +1 234 567 890' check={isPhoneFilled} fillIn={setPhone} preSet={phone} isMobile={isMobile}/>
                        </section>
                    </div>
                    <div className='flex justify-end'>
                        <button className='bg-marine-blue text-white rounded-md h-12 w-[130px] font-medium hover:bg-purplish-blue' type="submit"
                        onClick={(e) => handleSubmit(e)}>Next Step</button>
                    </div>
                </section>
            </div>
        }
    </div>
  )
}
