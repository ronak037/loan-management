import React from 'react';
import { useLoanApplicationContext } from '../context/LoanApplicationContext';
import { API_URL } from '../config';

function AccountingProvider() {
  const { applicationData, currentStep, onPrevStep, setAccountingProvider, setBalanceSheet, onNextStep } = useLoanApplicationContext();

  const handleProviderChange = (e) => {
    setAccountingProvider(e.target.value);
  };

  const handleGetBalanceSheet = async () => {
    try {
      // Make an API call to get the balance sheet
      let query_str = `ref=${applicationData['application_id']}`
      query_str += `&id=${applicationData['buisness_details'].id}`
      query_str += `&name=${applicationData['buisness_details'].name}`
      query_str += `&owner=${applicationData['buisness_details'].owner}`
      query_str += `&yoe=${applicationData['buisness_details'].yoe}`
      query_str += `&amount=${applicationData['buisness_details'].loan_amount}`
      query_str += `&acc_provider=${applicationData['accounting_provider']}`

      const response = await fetch(`${API_URL}/balance_sheet?${query_str}`);
      const data = await response.json();
      setBalanceSheet(data.sheet);
    //   setBalanceSheet([
    //     {
    //         "year": 2020,
    //         "month": 12,
    //         "profitOrLoss": 250000,
    //         "assetsValue": 1234
    //     },
    //     {
    //         "year": 2020,
    //         "month": 11,
    //         "profitOrLoss": 1150,
    //         "assetsValue": 5789
    //     },
    //     {
    //         "year": 2020,
    //         "month": 10,
    //         "profitOrLoss": 2500,
    //         "assetsValue": 22345
    //     },
    //     {
    //         "year": 2020,
    //         "month": 9,
    //         "profitOrLoss": -187000,
    //         "assetsValue": 223452
    //     }
    // ]);
      onNextStep();
    } catch (error) {
      console.error('Error fetching balance sheet:', error);
    }
  };

  return (
    <div>
      <select onChange={handleProviderChange} value={applicationData['accounting_provider']}>
        <option value="">Select Accounting Provider</option>
        <option value="Xero">Xero</option>
        <option value="MYOB">MYOB</option>
      </select>
      <button onClick={handleGetBalanceSheet}>Get Balance Sheet</button>
      {currentStep > 0 && (
        <button onClick={onPrevStep}> Previous </button>
      )}
    </div>
  );
}

export default AccountingProvider;
