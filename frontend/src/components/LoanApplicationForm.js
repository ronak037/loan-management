import React from 'react';
import { useLoanApplicationContext } from '../context/LoanApplicationContext';

function LoanApplicationForm() {
  const { applicationData, setBusinessDetails, currentStep, onNextStep, onPrevStep } = useLoanApplicationContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessDetails({...applicationData['buisness_details'], [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNextStep();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Business Id:
          <input
            type="text"
            name="id"
            value={applicationData['buisness_details'].id}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Business Name:
          <input
            type="text"
            name="name"
            value={applicationData['buisness_details'].name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Business Owner:
          <input
            type="text"
            name="owner"
            value={applicationData['buisness_details'].owner}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Business Year of Establishment:
          <input
            type="number"
            name="yoe"
            value={applicationData['buisness_details'].yoe}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Loan Amount:
          <input
            type="number"
            name="loan_amount"
            value={applicationData['buisness_details'].loan_amount}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit"> Next </button>
        {currentStep > 0 && (
          <button onClick={onPrevStep}> Previous </button>
        )}
      </form>
    </div>
  );
}

export default LoanApplicationForm;
