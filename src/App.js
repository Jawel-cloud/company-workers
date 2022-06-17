import Homepage from './Components/homepage';
import CheckProvider from './Components/checkContext';
import './App.css';
const App = () => {
  return (
    <CheckProvider>
      <Homepage />
    </CheckProvider>
  );
}
 
export default App;