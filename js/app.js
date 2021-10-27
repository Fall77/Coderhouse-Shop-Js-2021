let inputVal = document.querySelector('#modalInput')
let imgBox = document.querySelector('#imgBox')
let productsBox = document.querySelector('.modal-fruit') 
let shopBox = document.getElementById('shopCart')

let precioAcumulado = 0;

const URL1 = "Coderhouse-Shop-Js-2021/json/frutas.json"

const URL2 = "../json/vegetales.json"

const URL3 = "../json/varios.json"

let frutas = []

let vegetales = []

let varios = []

fetch(URL3).then( (resp) => resp.json())
    .then(function(info){
    varios = info;
    console.log(varios)
    })
    .catch((err) => {
  console.error('Error:', err);
});

fetch(URL2).then( (resp) => resp.json())
    .then(function(info){
    vegetales = info;
    console.log(vegetales)
    })
    .catch((err) => {
  console.error('Error:', err);
});

fetch(URL1).then( (resp) => resp.json())
    .then(function(info){
    frutas = info;
    console.log(frutas)
    })
    .catch((err) => {
  console.error('Error:', err);
});

//tecla enter trae resultado individual
inputVal.onkeydown = (e) => {
    if(e.key == 'Enter'){
        getInputValue()
        inputVal.value = '';
    }
}
//acumulador de frutas en las que se presiono el boton "Add"
const acumProductos = [];

//Tomar valor del input
function getInputValue(){ 
    const valor = inputVal.value
    const valorLow = valor.toLowerCase()
    getFruit(valorLow)
}

//comparar valor del input con array de productos
function getFruit(valor){
    let todo = frutas.concat(vegetales, varios)
    const resultado = todo.find( producto => producto.nombre === valor );
    showData(resultado)
}

//mostrar todas las frutas
function showFrutas(){
    frutas.sort(function(a, b){return a.calorias - b.calorias});
    frutas.forEach( (fruta)  => {
        imgBox.innerHTML += `
            <h2>${fruta.nombre}</h2>

            <p>Kcal: ${fruta.calorias}</p>
            <img class="imagenes" src="${fruta.image}" alt="${fruta.nombre}">
            <p class="precioShop">Precio: $${fruta.precio}</p>
            <button class="addBtn" id="${fruta.nombre}">Add</button>
            <hr>
    `
    //capturar evento del boton clickeado
    imgBox.addEventListener("click", function(e){
        if(e.target.id == fruta.nombre){
            console.log(`${e.target.id} was clicked and his price is ${fruta.precio}`)
            //se envia al acumulador de productos el producto clickeado
            acumProductos.push(fruta)
            console.log(acumProductos)
            renderShop()
            }
        })
    })

}
//mostrar todos los vegetales
function showVegetales(){
    vegetales.sort(function(a, b){return a.calorias - b.calorias});
    vegetales.forEach( (vegetal)  => {
        imgBox.innerHTML += `
            <h2>${vegetal.nombre}</h2>

            <p>Kcal: ${vegetal.calorias}</p>
            <img class="imagenes" src="${vegetal.image}" alt="${vegetal.nombre}">
            <p class="precioShop">Precio: $${vegetal.precio}</p>
            <button class="addBtn" id="${vegetal.nombre}">Add</button>
            <hr>
    `
    //capturar evento del boton clickeado
    imgBox.addEventListener("click", function(e){
        if(e.target.id == vegetal.nombre){
            console.log(`${e.target.id} was clicked and his price is ${vegetal.precio}`)
            //se envia al acumulador de productos el producto clickeado
            acumProductos.push(vegetal)
            console.log(acumProductos)
            renderShop()
            }
        })
    })

}
//mostrar varios
function showVarios(){
    varios.sort(function(a, b){return a.calorias - b.calorias});
    varios.forEach( (varios)  => {
        imgBox.innerHTML += `
            <h2>${varios.nombre}</h2>

            <p>Kcal: ${varios.calorias}</p>
            <img class="imagenes" src="${varios.image}" alt="${varios.nombre}">
            <p class="precioShop">Precio: $${varios.precio}</p>
            <button class="addBtn" id="${varios.nombre}">Add</button>
            <hr>
    `
    //capturar evento del boton clickeado
    imgBox.addEventListener("click", function(e){
        if(e.target.id == varios.nombre){
            console.log(`${e.target.id} was clicked and his price is ${varios.precio}`)
            //se envia al acumulador de productos el producto clickeado
            acumProductos.push(varios)
            console.log(acumProductos)
            renderShop()
            }
        })
    })

}

//vaciar carro
function vaciarCarro(){
    acumProductos.splice(acumProductos)
    resShop()
}

//reiniciar contenido shop
function resShop(){
    precioAcumulado = 0;
    while (shopBox.firstChild){
        shopBox.removeChild(shopBox.firstChild);
      };
      document.getElementById('precioTotal').innerHTML = `Total: $${Math.round(precioAcumulado)}`;
}
//crear contenido shop
function renderShop(){
    resShop()
    acumProductos.forEach( (fruta)  => {
        let frutaBox = document.createElement('div')
        precioAcumulado += fruta.precio;
        frutaBox.innerHTML = `
            <h2>${fruta.nombre}</h2>
            <p class="precioShop">$${fruta.precio}</p>
            <img class="imagenesShop" src="${fruta.image}" alt="${fruta.nombre}">
            <hr>
        `
        shopBox.appendChild(frutaBox)
        })
        document.getElementById('precioTotal').innerHTML = `Total: $${Math.round(precioAcumulado)}`;
}

function showData(resultado){
    imgBox.innerHTML = `
    <h2>${resultado.nombre}</h2>

    <p>Kcal: ${resultado.calorias}</p>
    <img class="imagenes" src="${resultado.image}" alt="${resultado.nombre}">
    <p class="precioShop">Precio: $${resultado.precio}</p>
    <button class="addBtn" id="${resultado.nombre}">Add</button>
    <hr>
    `
    imgBox.addEventListener("click", function(e){
        if(e.target.id == resultado.nombre){
            e.preventDefault()
            console.log(`${e.target.id} was clicked and his price is ${resultado.precio}`)
            //se envia al acumulador de productos el producto clickeado
            acumProductos.push(resultado)
            console.log(acumProductos)
            renderShop()
            }
        })
}
function borrarAll(){
    while (imgBox.firstChild){
        imgBox.removeChild(imgBox.firstChild);
      };
    inputVal.value = '';
}         

document.getElementById('out-open-close-modal').addEventListener("click",() => {
    productsBox.classList.toggle('moveLeft')
})

document.getElementById('open-close-cart').addEventListener("click", function(){
    document.querySelector('.contenedor-carro').classList.toggle('hide')
})


document.getElementById('showFrutas').addEventListener("click", showFrutas)

document.getElementById('showVegetales').addEventListener("click", showVegetales)

document.getElementById('showVarios').addEventListener("click", showVarios)

document.getElementById('delBtn').addEventListener("click", borrarAll)

document.getElementById('vaciarCarro').addEventListener("click", vaciarCarro)




