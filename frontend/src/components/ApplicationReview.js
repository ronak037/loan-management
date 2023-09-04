import React from 'react';
import { useLoanApplicationContext } from '../context/LoanApplicationContext';
import { API_URL } from '../config';

function ApplicationReview() {
  const { applicationData, balanceSheet, onPrevStep, currentStep } = useLoanApplicationContext();
  const handleSubmit = async () => {
    try {
      // Make an API call to submit the application
      const response = await fetch(`${API_URL}/application/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'ref': applicationData['application_id'],
                              'buisness_details': applicationData['buisness_details'],
                              'sheet': balanceSheet}),
      });
      const data = await response.json();
      console.log("API status: ", data.status);
      console.log("Loan amount: ", data.loan_amount);
      alert("Please look at console logs for sample success output")
    } catch (error) {
      console.error('Error submitting application:', error);
    }
  };

  const showAppData = () => {
    return (
      <div>
        <h2>Application Data</h2>
        <p><strong>Application ID:</strong> {applicationData.application_id}</p>
        <div>
          <h3>Business Details</h3>
          <p><strong>ID:</strong> {applicationData.buisness_details.id}</p>
          <p><strong>Name:</strong> {applicationData.buisness_details.name}</p>
          <p><strong>Owner:</strong> {applicationData.buisness_details.owner}</p>
          <p><strong>Year of Establishment:</strong> {applicationData.buisness_details.yoe}</p>
          <p><strong>Loan Amount:</strong> {applicationData.buisness_details.loan_amount}</p>
        </div>
        <div>
          <h3>Accounting Provider</h3>
          <p>{applicationData.accounting_provider}</p>
        </div>
      </div>
    );
  }

  const showBalanceSheet = () => {
    return (
      <div>
        <h2>Balance Sheet</h2>
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Month</th>
              <th>Profit or Loss</th>
              <th>Assets Value</th>
            </tr>
          </thead>
          <tbody>
            {balanceSheet.map((entry, index) => (
              <tr key={index}>
                <td>{entry.year}</td>
                <td>{entry.month}</td>
                <td>{entry.profitOrLoss}</td>
                <td>{entry.assetsValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div>
      <h2>Application Review</h2>
      {showAppData()}
      {showBalanceSheet()}
      <button onClick={handleSubmit}>Submit Application</button>
      {currentStep > 0 && (
        <button onClick={onPrevStep}> Previous </button>
      )}
    </div>
  );
}

export default ApplicationReview;
