
import './App.css';

import ProductsPage from './pages/Product';

import ProductAdd from './pages/ProductAdd';

import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {


  return (
    

    <>
  <BrowserRouter>
    <Routes>
      <Route path="/">
          <Route path="/" element={<ProductsPage />} />
          <Route path = "/product/add" element = {<ProductAdd />} />
      </Route>
    </Routes>
  </BrowserRouter>

<div style={{ margin:'auto', width:'110rem'}}>
  <hr style={{border : '0.5px solid', borderColor:'grey', width:'100%', margin:'auto', marginTop:'3rem'}}/>
  <div style={{margin:'auto', paddingLeft:'auto', fontSize:'1.7rem', width:'fit-content', marginTop:'2rem', marginBottom:'2rem', fontWeight:'500'}}>Scandiweb Test Assignment</div>
</div>


  </>


  );
}

export default App;
