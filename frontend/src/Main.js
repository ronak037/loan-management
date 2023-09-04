import React from 'react';
import Initiate from './components/Initiate';
import LoanApplicationForm from './components/LoanApplicationForm';
import AccountingProvider from './components/AccountProviderForm';
import ApplicationReview from './components/ApplicationReview';
import { useLoanApplicationContext } from './context/LoanApplicationContext';

function Main() {
  const { currentStep } = useLoanApplicationContext();
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Initiate />;
      case 1:
        return <LoanApplicationForm />;
      case 2:
        return <AccountingProvider />;
      case 3:
        return <ApplicationReview />;
      default:
        return null;
    }
  };

  return (
    <div>
        <h1>Loan Application</h1>
        {renderStep()}
    </div>
  );
}

export default Main;
