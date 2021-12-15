import { useState } from 'react';
import './ItemCount.css'

const ItemCount = ({stock,inicial, onAdd}) => {

    let [contador, setContador] = useState(inicial)

    const restar = () => {
        if(contador > 0) setContador(contador -1)
        else console.log("no se puede restar menos de 0")
    }
    const sumar = () => {
        if(contador < stock) setContador(contador +1)
        else console.log("no queda stock para agregar")        
    }
    const agregarItem = () => {
        console.log("onAdd")
        onAdd(contador)
    }
    return (
        <>
            <div className='btnBox container'>
                <button onClick={restar} type="button" className="btn btn-md btn-outline-danger"> - </button>
                <div className='container numero'>{contador}</div>
                <button onClick={sumar} type="button" className="btn btn-md btn-outline-success"> + </button>
                <hr></hr>
                <button onClick={agregarItem} type="button" className="btn btn-md btn-outline-info"> Agregar Item </button>
            </div>
        </>
        )
}

export default ItemCount