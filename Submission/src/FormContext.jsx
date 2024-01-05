import React, { createContext, useState } from 'react';

export const FormContext = createContext();


export default function FormContextProvider({ children }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [isMonthly, setIsMonthly] = useState(true);
    const [plan, setPlan] = useState('Arcade');
    const [onlineService, setOnlineService] = useState(false);
    const [largerStorage, setLargerStorage] = useState(false);
    const [customizableProfile, setCustomizableProfile] = useState(false);

    return (
        <FormContext.Provider value={{
            name, setName,
            email, setEmail,
            phone, setPhone,
            isMonthly, setIsMonthly,
            plan, setPlan,
            onlineService, setOnlineService,
            largerStorage, setLargerStorage,
            customizableProfile, setCustomizableProfile
        }}>
            {children}
        </FormContext.Provider>
    )
}
