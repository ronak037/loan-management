import React from 'react';
import { useLoanApplicationContext } from '../context/LoanApplicationContext';
import { API_URL } from '../config';

function Initiate() {
  const {applicationData, setApplicationId, onNextStep} = useLoanApplicationContext()

  const handleInitiateClick = async () => {
    try {
      // Make an API call to initiate the application
      if(applicationData['application_id'] === '') {
        const response = await fetch(`${API_URL}/application/initiate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        setApplicationId(data.application_id);
      }
      // setApplicationId('test_123');
      onNextStep();
    } catch (error) {
      console.error('Error initiating application:', error);
    }
  };

  return (
    <div>
      <button className='btn btn-primary' onClick={handleInitiateClick}>Initiate Application</button>
    </div>
  );
}

export default Initiate;
