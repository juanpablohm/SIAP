
import MainRoutes from './Routes';
import HomeScreen from './screens/HomeScreen';
import './App.css';

function App() {
  return (
    <div className="App"> 
        <HomeScreen/> 
        {/** Inner container */}
        <MainRoutes/>
    </div>
  );
}

export default App;
