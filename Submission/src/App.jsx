import React from 'react'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react'

import FormContextProvider from './FormContext'
import Step1 from './Pages/step1'
import Step2 from './Pages/step2'
import Step3 from './Pages/step3'
import Step4 from './Pages/step4'
import Step5 from './Pages/step5'

export default function App() {

  const breakpoint = 768;
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <FormContextProvider>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap');
      </style>
      <Router>
        <Routes>
          <Route path="/" element={<Step1 isMobile={isMobile} />} />
          <Route path="/step1" element={<Step1 isMobile={isMobile} />} />
          <Route path="/step2" element={<Step2 isMobile={isMobile} />} />
          <Route path="/step3" element={<Step3 isMobile={isMobile} />} />
          <Route path="/step4" element={<Step4 isMobile={isMobile} />} />
          <Route path="/step5" element={<Step5 isMobile={isMobile} />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Router>
    </FormContextProvider>
  )
}
