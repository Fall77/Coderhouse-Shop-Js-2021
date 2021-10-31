let inputVal = document.querySelector('#modalInput')
let imgBox = document.querySelector('#imgBox')
let productsBox = document.querySelector('.modal-fruit') 
let shopBox = document.getElementById('shopCart')
let animacionBox = document.getElementById('animacion-box')
let notifModal = document.getElementById('notification-modal')

let precioAcumulado = 0;

const URL1 = "https://raw.githubusercontent.com/Fall77/Coderhouse-Shop-Js-2021/main/json/frutas.json"

const URL2 = "https://raw.githubusercontent.com/Fall77/Coderhouse-Shop-Js-2021/main/json/vegetales.json"

const URL3 = "https://raw.githubusercontent.com/Fall77/Coderhouse-Shop-Js-2021/main/json/varios.json"

let frutas = []

let vegetales = []

let varios = []

//fetch de productos varios
fetch(URL3).then( (resp) => resp.json())
    .then(function(info){
        varios = [...info]
    })
    .catch((err) => {
  console.error('Error:', err);
});
//fetch de vegetales
fetch(URL2).then( (resp) => resp.json())
    .then(function(info){
        vegetales = [...info]
    })
    .catch((err) => {
  console.error('Error:', err);
});
//fetch de frutas
fetch(URL1).then( (resp) => resp.json())
    .then(function(info){
        frutas = [...info]
    })
    .catch((err) => {
  console.error('Error:', err);
});

//tecla enter en el input recupera su valor
inputVal.onkeydown = (e) => {
    if(e.key == 'Enter'){
        getInputValue()
    }
}
//acumulador de frutas en las que se presiono el boton "Add"
const acumProductos = JSON.parse(localStorage.getItem("Products")) || [];

//Tomar valor del input
function getInputValue(){ 
    const valor = inputVal.value
    const valorLow = valor.toLowerCase()
    getSingleProduct(valorLow)
}

//comparar valor del input con concatenacion de todos los productos
function getSingleProduct(valor){
    let todo = frutas.concat(vegetales, varios)
    const resultado = todo.find( producto => producto.nombre === valor );
    showData(resultado)
}

//cargar data del storage, almacenada en el array acumProductos, si existe
document.addEventListener("DOMContentLoaded", function(){
    if(localStorage.getItem("Products")){
        renderShop()
        }else{
    console.log("No data stored")
    }
})

//mostrar todas las frutas en el menu izquierdo "imgBox"
function showFrutas(){
    showProductList()
    //vacia el contenido del menu
    imgBox.innerHTML = '';
    //rellena el menu con nuevo contenido
    frutas.forEach( (fruta)  => {
        imgBox.innerHTML += `
            <h2>${fruta.nombre}</h2>
            <p>Kcal: ${fruta.calorias}</p>
            <img class="imagenes" src="${fruta.image}" alt="${fruta.nombre}">
            <p class="precioShop">Price: $${fruta.precio}</p>
            <button class="addBtn" id="${fruta.nombre}">Add</button>
            <hr>`
        //capturar evento del boton clickeado
        imgBox.addEventListener("click", function(e){
            if(e.target.id == fruta.nombre){
                e.stopImmediatePropagation()//detiene la propagacion de clicks que generaba multiples llamadas simultaneas por click
                //Se activa la animacion y se envia al "Carro" el producto clickeado
                showAnimation(fruta.image)

                setTimeout(function(){
                    //se busca el producto clickeado dentro del array "acumProductos"
                    let productoEncontrado = acumProductos.find( producto => producto.nombre === fruta.nombre);
                    if(acumProductos.includes(productoEncontrado)){
                        //Si es encontrado, se le aumenta la cantidad en 1
                        productoEncontrado.cantidad++;
                        modal()
                        //se guarda en storage cantidad actualizada
                        localStorage.setItem("Products", JSON.stringify(acumProductos));
                        //se crea nuevamente el shop con la informacion actualizada
                        renderShop()
                    }else{
                        //Si el producto no es encontrado, se agrega uno nuevo, inicializado con cantidad 1
                        modal()
                        fruta.cantidad = 1;
                        acumProductos.push(fruta)
                        localStorage.setItem("Products", JSON.stringify(acumProductos));
                        renderShop();}
                    }, 1500);
                clearTimeout();  
            }
        })
    })
}
//mostrar todos los vegetales
function showVegetales(){
    showProductList()
    imgBox.innerHTML = '';
    vegetales.forEach( (vegetal)  => {
        imgBox.innerHTML += `
            <h2>${vegetal.nombre}</h2>

            <p>Kcal: ${vegetal.calorias}</p>
            <img class="imagenes" src="${vegetal.image}" alt="${vegetal.nombre}">
            <p class="precioShop">Price: $${vegetal.precio}</p>
            <button class="addBtn" id="${vegetal.nombre}">Add</button>
            <hr>
    `
    //capturar evento del boton clickeado
    imgBox.addEventListener("click", function(e){
        if(e.target.id == vegetal.nombre){
            e.stopImmediatePropagation()
            //se envia al acumulador de productos el producto clickeado
            showAnimation(vegetal.image)
            setTimeout(function(){
                let productoEncontrado = acumProductos.find( producto => producto.nombre === vegetal.nombre);
                if(acumProductos.includes(productoEncontrado)){
                    productoEncontrado.cantidad++;
                    modal()
                    localStorage.setItem("Products", JSON.stringify(acumProductos));
                    renderShop()
                }else{
                    modal()
                    vegetal.cantidad = 1;
                    acumProductos.push(vegetal)
                    localStorage.setItem("Products", JSON.stringify(acumProductos));
                    renderShop();}
                }, 1500);
                clearTimeout(); 
            }
        })
    })
}
//mostrar varios
function showVarios(){
    showProductList()
    imgBox.innerHTML = '';
    varios.forEach( (vario)  => {
        imgBox.innerHTML += `
            <h2>${vario.nombre}</h2>

            <p>Kcal: ${vario.calorias}</p>
            <img class="imagenes" src="${vario.image}" alt="${vario.nombre}">
            <p class="precioShop">Price: $${vario.precio}</p>
            <button class="addBtn" id="${vario.nombre}">Add</button>
            <hr>
    `
    //capturar evento del boton clickeado
    imgBox.addEventListener("click", function(e){
        if(e.target.id == vario.nombre){
            e.stopImmediatePropagation()
            //se envia al acumulador de productos el producto clickeado
            showAnimation(vario.image)
            setTimeout(function(){
                let productoEncontrado = acumProductos.find( producto => producto.nombre === vario.nombre);
                if(acumProductos.includes(productoEncontrado)){
                    productoEncontrado.cantidad++;
                    modal()
                    localStorage.setItem("Products", JSON.stringify(acumProductos));
                    renderShop()
                }else{
                    modal()
                    vario.cantidad = 1;
                    acumProductos.push(vario)
                    localStorage.setItem("Products", JSON.stringify(acumProductos));
                    renderShop();}
                }, 1500);
                clearTimeout();  
            }
        })
    })

}

//vaciar carro y storage
function vaciarCarro(){
    acumProductos.splice(acumProductos)
    localStorage.clear()
    console.log("Storage Cleared")
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
    document.querySelector('.contenedor-carro').classList.remove('hide')
    acumProductos.forEach( (producto)  => {
        let frutaBox = document.createElement('div')
        precioAcumulado += producto.precio * producto.cantidad;
        frutaBox.innerHTML = `
            <h2>${producto.nombre}</h2>
            <p class="precioShop"> $${producto.precio}</p>
            <img class="imagenesShop" src="${producto.image}" alt="${producto.nombre}">
            <p> Amount: ${producto.cantidad} </p>
            <hr>
        `
        shopBox.appendChild(frutaBox)
        })
        document.getElementById('precioTotal').innerHTML = `Total: $${Math.floor(precioAcumulado)}`;
}
//funcion vinculada al input y al boton "search", busca productos individualmente
function showData(resultado){
    if(resultado){
        //si el ingreso es correcto se abrira la lista de productos "automaticamente"
        showProductList()
        imgBox.innerHTML = `
        <h2>${resultado.nombre}</h2>

        <p>Kcal: ${resultado.calorias}</p>
        <img class="imagenes" src="${resultado.image}" alt="${resultado.nombre}">
        <p class="precioShop">Price: $${resultado.precio}</p>
        <button class="addBtn" id="${resultado.nombre}">Add</button>
        <hr>
        `
        inputColor("none", "#80ff80")
        imgBox.addEventListener("click", function(e){
            if(e.target.id == resultado.nombre){
                e.preventDefault()
                e.stopImmediatePropagation()
            //se envia al acumulador de productos el producto clickeado
            showAnimation(resultado.image)
            setTimeout(function(){
                let productoEncontrado = acumProductos.find( producto => producto.nombre === resultado.nombre);
                if(acumProductos.includes(productoEncontrado)){
                    modal()
                    productoEncontrado.cantidad++;
                    localStorage.setItem("Products", JSON.stringify(acumProductos));
                    renderShop()
                }else{
                    resultado.cantidad = 1;
                    modal()
                    acumProductos.push(resultado)
                    localStorage.setItem("Products", JSON.stringify(acumProductos));
                    renderShop()}
                }, 1500);
                clearTimeout();  
            }
        })
    }else{
        inputColor("1px solid red", "#ff9999")
        console.log("Product not found")
    }
}

function inputColor(border, color){
    inputVal.style.border = border
    inputVal.style.backgroundColor = color
    setTimeout(function(){
        inputVal.value = '';
        inputVal.style.border = "none"
        inputVal.style.backgroundColor = "#ffffff"
    }, 3000)
    clearTimeout();
}

//creacion de animacion y eliminacion de la misma despues de 1.5s
function showAnimation(imgSrc){
    let box = document.createElement('div')
    let img = document.createElement('img')
    img.classList.add('imgSize')
    img.setAttribute("src", `${imgSrc}`)
    box.setAttribute("style", "width: 65vw; height: 100px; transform: rotate(165deg)")
    box.appendChild(img)
    animacionBox.appendChild(box)
    setTimeout(function(){
       animacionBox.removeChild(animacionBox.firstChild)
    }, 1500);
    clearTimeout()
}

function modal(){
    notifModal.classList.remove('hide')
    setTimeout(function(){
        notifModal.classList.add('hide')
    }, 1500)
    clearTimeout();
}

//funcion vaciar lista productos (izq)
function borrarAll(){
    while (imgBox.firstChild){
        imgBox.removeChild(imgBox.firstChild);
      };
    inputVal.value = '';
}

//mostrar lista productos
function showProductList(){
    productsBox.classList.add('moveLeft')
}
//deslizar lista de productos (izq)
document.getElementById('out-open-close-modal').addEventListener("click",() => {
    productsBox.classList.toggle('moveLeft')
})
//mostrar/ocultar carro
document.getElementById('open-close-cart').addEventListener("click", function(){
    document.querySelector('.contenedor-carro').classList.toggle('hide')
})

//botones para traer productos a la lista
document.getElementById('showFrutas').addEventListener("click", showFrutas)

document.getElementById('showVegetales').addEventListener("click", showVegetales)

document.getElementById('showVarios').addEventListener("click", showVarios)

//boton para borrar lista (izq) y boton para vaciar carro (derecha)
document.getElementById('delBtn').addEventListener("click", borrarAll)

document.getElementById('vaciarCarro').addEventListener("click", vaciarCarro)




