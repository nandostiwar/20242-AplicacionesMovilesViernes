import './App.css';
import Card from './components/Card';
import ShowHide from './components/ShowHide.jsx';
import vehicles from './data/vehicles.js';

function App() {

  const vehicleList = vehicles.map((v) => {
    return <Card title={v.name} description={v.description} image={v.image} />;
  });

  return (
  <div className="App">
    <h1>Hola React</h1>
    <div  className='container'>
    {vehicleList}
    </div>
    <ShowHide/>
  </div>
  );
}

export default App;
