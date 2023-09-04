import React, { createContext, useContext, useState } from 'react';

const LoanApplicationContext = createContext();

export function useLoanApplicationContext() {
  return useContext(LoanApplicationContext);
}

export function LoanApplicationProvider({ children }) {
  const [applicationData, setApplicationData] = useState({
    application_id: '',
    buisness_details: {
      id: '',
      name: '',
      owner: '',
      yoe: '',
      loan_amount: ''
    },
    accounting_provider: ''
  });
  const [balanceSheet, setBalanceSheet] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const onNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const onPrevStep = () => {
    setCurrentStep((curStep) => curStep - 1);
  }

  const setApplicationDataValue = (key, val) => {
    const updatedAppData = {...applicationData};
    updatedAppData[key] = val;
    setApplicationData(updatedAppData);
  }

  const setApplicationId = (app_id) => {
    setApplicationDataValue('application_id', app_id);
  }

  const setBusinessDetails = (bus_details) => {
    setApplicationDataValue('buisness_details', bus_details);
  }

  const setAccountingProvider = (acc_provider) => {
    setApplicationDataValue('accounting_provider', acc_provider);
  }

  const value = {
    applicationData,
    balanceSheet,
    setBalanceSheet,
    setApplicationId,
    setBusinessDetails,
    setAccountingProvider,
    currentStep,
    onNextStep,
    onPrevStep
  };

  return (
    <LoanApplicationContext.Provider value={value}>
      {children}
    </LoanApplicationContext.Provider>
  );
}
