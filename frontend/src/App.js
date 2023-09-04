import './App.css';
import Main from './Main';
import { LoanApplicationProvider } from './context/LoanApplicationContext';

function App() {
  return (
    <div>
      <LoanApplicationProvider>
        <Main />
      </LoanApplicationProvider>
    </div>
  );
}

export default App;
