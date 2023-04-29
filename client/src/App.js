import './App.css';
import { Inventory } from './Screens/Inventory';
import { Create } from './Screens/Create';
import { Edit } from './Screens/Edit';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'



function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path = '/' element={<Inventory/>}/>
          <Route path = '/create' element={<Create/>}/>
          <Route path = '/edit/:id' element={<Edit/>}/>

        </Routes>
      </Router>

   
    </div>
  );
}

export default App;
