import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import PaymentSuccess from './components/PaymentSuccess';

function App() {
  return (
    <>
    
    <Routes>
      <Route path = '/' element = {<HomePage></HomePage>}></Route>
      <Route path = '/paymentsuccess' element= {<PaymentSuccess></PaymentSuccess>}></Route>
    </Routes>
  
    </>
  );
}

export default App;
