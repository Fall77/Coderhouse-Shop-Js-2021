let inputVal = document.querySelector('#modalInput')
let imgBox = document.querySelector('#imgBox')
let productsBox = document.querySelector('.modal-fruit') 
let shopBox = document.getElementById('shopCart')
let animacionBox = document.getElementById('animacion-box')

let precioAcumulado = 0;

const URL1 = "https://raw.githubusercontent.com/Fall77/Coderhouse-Shop-Js-2021/main/json/frutas.json"

const URL2 = "https://raw.githubusercontent.com/Fall77/Coderhouse-Shop-Js-2021/main/json/vegetales.json"

const URL3 = "https://raw.githubusercontent.com/Fall77/Coderhouse-Shop-Js-2021/main/json/varios.json"

let frutas = []

let vegetales = []

let varios = []

fetch(URL3).then( (resp) => resp.json())
    .then(function(info){
        varios = [...info]
    })
    .catch((err) => {
  console.error('Error:', err);
});

fetch(URL2).then( (resp) => resp.json())
    .then(function(info){
        vegetales = [...info]
    })
    .catch((err) => {
  console.error('Error:', err);
});

fetch(URL1).then( (resp) => resp.json())
    .then(function(info){
        frutas = [...info]
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

//function que setea data en el local storage
function storeData(var1, var2){
    localStorage.setItem(var1, JSON.stringify(var2));
    storedData = JSON.parse(localStorage.getItem(var1))
    renderShop()}

//mostrar todas las frutas
function showFrutas(){
    imgBox.innerHTML = '';
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
            e.stopImmediatePropagation()
            //se envia al acumulador de productos el producto clickeado
            showAnimation(fruta.image)

            setTimeout(function(){
                if(acumProductos.includes(fruta)){
                    fruta.cantidad++;
                    storeData("Products", acumProductos)
                }else{
                    fruta.cantidad = 1;
                    acumProductos.push(fruta)
                    storeData("Products", acumProductos)}
                    }, 1500);
                    clearTimeout();  
            }
        })
    })
}
//mostrar todos los vegetales
function showVegetales(){
    imgBox.innerHTML = '';
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
            e.stopImmediatePropagation()
            //se envia al acumulador de productos el producto clickeado
            showAnimation(vegetal.image)
            setTimeout(function(){
                if(acumProductos.includes(vegetal)){
                    vegetal.cantidad++;
                    storeData("Products", acumProductos)
                }else{
                    vegetal.cantidad = 1;
                    acumProductos.push(vegetal)
                    storeData("Products", acumProductos)}
                    }, 1500);
                    clearTimeout(); 
            }
        })
    })
}
//mostrar varios
function showVarios(){
    imgBox.innerHTML = '';
    varios.forEach( (vario)  => {
        imgBox.innerHTML += `
            <h2>${vario.nombre}</h2>

            <p>Kcal: ${vario.calorias}</p>
            <img class="imagenes" src="${vario.image}" alt="${vario.nombre}">
            <p class="precioShop">Precio: $${vario.precio}</p>
            <button class="addBtn" id="${vario.nombre}">Add</button>
            <hr>
    `
    //capturar evento del boton clickeado
    imgBox.addEventListener("click", function(e){
        if(e.target.id == vario.nombre){
            console.log(`${e.target.id} was clicked and his price is ${varios.precio}`)
            e.stopImmediatePropagation()
            //se envia al acumulador de productos el producto clickeado
            showAnimation(vario.image)
            setTimeout(function(){
                if(acumProductos.includes(vario)){
                    vario.cantidad++;
                    storeData("Products", acumProductos)
                }else{
                    vario.cantidad = 1;
                    acumProductos.push(vario)
                    storeData("Products", acumProductos)}
                    }, 1500);
                    clearTimeout();  
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
      document.getElementById('precioTotal').innerHTML = `Total: $${Math.floor(precioAcumulado)}`;
}
//crear contenido shop
function renderShop(){
    resShop()
    acumProductos.forEach( (producto)  => {
        let frutaBox = document.createElement('div')
        precioAcumulado += producto.precio * producto.cantidad;
        frutaBox.innerHTML = `
            <h2>${producto.nombre}</h2>
            <p class="precioShop">c/u: $${producto.precio}</p>
            <img class="imagenesShop" src="${producto.image}" alt="${producto.nombre}">
            <p> Cantidad: ${producto.cantidad} </p>
            <hr>
        `
        shopBox.appendChild(frutaBox)
        })
        document.getElementById('precioTotal').innerHTML = `Total: $${Math.floor(precioAcumulado)}`;
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
            e.stopImmediatePropagation()
            //se envia al acumulador de productos el producto clickeado
            showAnimation(resultado.image)
            setTimeout(function(){
                if(acumProductos.includes(resultado)){
                    resultado.cantidad++;
                    storeData("Products", acumProductos)
                }else{
                    resultado.cantidad = 1;
                    acumProductos.push(resultado)
                    storeData("Products", acumProductos)}
                    }, 1500);
                clearTimeout();  
            }
        })
}

function showAnimation(imgSrc){
    let box = document.createElement('div')
    let img = document.createElement('img')
    img.classList.add('imgSize')
    img.setAttribute("src", `${imgSrc}`)
    box.setAttribute("style", "width: 50vw; height: 100px; transform: rotate(155deg)")
    box.appendChild(img)
    animacionBox.appendChild(box)
    setTimeout(function(){
       animacionBox.removeChild(animacionBox.firstChild)
    }, 1500);
    clearTimeout()
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




