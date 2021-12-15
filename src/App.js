import React, { useState } from 'react';
import './App.css';
import Bienvenida from './components/Bienvenida';
import Header from './components/Header.jsx'
import ItemCount from './components/ItemCount';

function App() {

  const [cantidad, setCantidad] = useState(0)

  const onAdd = () =>{
    console.log("onAdd desde app")
    setCantidad(cantidad)
  }
  return (
    <div className="App">
      <header className="App-header">
        <Header />
        <Bienvenida name="Pepito"/>
        <ItemCount stock={10} inicial={1} onAdd={onAdd}/>
      </header>
    </div>
  );
}

export default App;
