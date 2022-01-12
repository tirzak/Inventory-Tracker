import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from './components/home'
import InventoryForm from './components/inventoryForm';
import CreateInventory from './components/createInventory';
import Navbar from './components/navbar';
import CreateGroup from './components/createGroup';
import ViewCollection from './components/viewCollections';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        Tracker
      </header>
      <br/>
      <div>
      <Router>
        <Navbar></Navbar>
        <Routes>
      <Route  path="/" element={<Home />}/>
      <Route path="/inventory" element={<InventoryForm/>}/>
      <Route path="/itemview" element={<CreateInventory/>}/>
      <Route path="/group" element={<CreateGroup/>}/>
      <Route path="/singlegroup" element={<ViewCollection/>}/>
      </Routes>
      
 
</Router>
</div>
    </div>
  );
}

export default App;
