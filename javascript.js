// Ramiro Landajo y Martin Ruseff
'use strict';


let jjkLista    = document.getElementsByClassName('jjk');
let csmlista    = document.getElementsByClassName('csm');
let bleachLista = document.getElementsByClassName('bleach');

function mostrarTodo() {
    for (let item of jjkLista) {
        item.style.display = 'block';
    }
    for (let item of csmlista) {
        item.style.display = 'block';
    }
    for (let item of bleachLista) {
        item.style.display = 'block';
    }
}
function mostrarJjk() {
    for (let item of jjkLista) {
        item.style.display = 'block';
    }
    for (let item of csmlista) {
        item.style.display = 'none';
    }
    for (let item of bleachLista) {
        item.style.display = 'none';
    }
}
function mostrarCsm() {
    for (let item of jjkLista) {
        item.style.display = 'none';
    }
    for (let item of bleachLista) {
        item.style.display = 'none';
    }
    for (let item of csmlista) {
        item.style.display = 'block';
    }
}
function mostrarBleach() {
    for (let item of csmlista) {
        item.style.display = 'none';
    }
    for (let item of jjkLista) {
        item.style.display = 'none';
    }
    for (let item of bleachLista) {
        item.style.display = 'block';
    }
}

let cartBtn = document.getElementById('cart-icon2');
let insideBtn = document.getElementById('close-cart');
let body = document.body;
cartBtn.addEventListener('click', () => {
    body.classList.toggle('show-offCanvas');
})
insideBtn.addEventListener('click', () => {
    body.classList.toggle('show-offCanvas');
})

let carrito = [];
let productos = [
    {id: 1,     nombre: 'Jujutsu Kaisen 0',     precio: '750',  imagen: 'images/jjk0.jpg'},
    {id: 2,     nombre: 'Jujustu Kaisen 1',     precio: '750',  imagen: 'images/jjk1.jpg'},
    {id: 3,     nombre: 'Jujutsu Kaisen 2',     precio: '750',  imagen: 'images/jjk2.png'},
    {id: 4,     nombre: 'Jujutsu Kaisen 3',     precio: '750',  imagen: 'images/jjk3.jpg'},
    {id: 5,     nombre: 'Chainsaw Man 1',       precio: '700',  imagen: 'images/csm1.jpg'},
    {id: 6,     nombre: 'Chainsaw Man 2',       precio: '700',  imagen: 'images/csm2.jpg'},
    {id: 7,     nombre: 'Chainsaw Man 3',       precio: '700',  imagen: 'images/csm3.jpg'},
    {id: 8,     nombre: 'Chainsaw Man 4',       precio: '700',  imagen: 'images/csm4.jpg'},
    {id: 9,     nombre: 'Bleach 8',             precio: '800',  imagen: 'images/Bleach8.jpg'},
    {id: 10,    nombre: 'Bleach 13',            precio: '800',  imagen: 'images/Bleach13.jpg'},
    {id: 11,    nombre: 'Bleach 25',            precio: '800',  imagen: 'images/Bleach25.jpg'},
    {id: 12,    nombre: 'Bleach 57',            precio: '800',  imagen: 'images/Bleach57.jpg'},
];


let divCarrito = document.getElementById('carrito');

//for para agregar boton a cada producto
let j = 0;
for (let prod of productos) {
    j++;
    let button  = document.createElement('button');
    button.innerHTML = 'Add to Cart';
    button.setAttribute('data-id', prod.id);
    button.setAttribute('data-nombre', prod.nombre);
    button.setAttribute('data-precio', prod.precio);
    button.setAttribute('data-imagen', prod.imagen);
    button.setAttribute('class', 'btn');

    let div = document.getElementById('div-btn'+j);
    div.append(button);
    button.addEventListener('click', Agregar)
};

function Agregar (e) {
    e.target.innerHTML = 'Item Added!'
    e.target.style.backgroundColor = 'var(--turquesaClaro)';
    let idProd = e.target.dataset.id;
    let nombreProd = e.target.dataset.nombre;
    let precioProd = e.target.dataset.precio;
    let imgProd = e.target.dataset.imagen;

    let existe = false;
    //chequeo si hay algo en localstorage
    if (localStorage.getItem('infoCarrito')!= null){
        carrito = JSON.parse(localStorage.getItem('infoCarrito'));
    }
    for (let item of carrito) {
        if (item.id == idProd) {
            item.cantidad++;
            existe = true
        }
    }
    if (!existe) {
        let nuevoProd = {img: imgProd, id: idProd, nombre: nombreProd, precio: precioProd, cantidad: 1};
        console.log(imgProd,idProd,nombreProd,precioProd);
        carrito.push(nuevoProd);
    }
    //lo guardo en local storage
    localStorage.setItem('infoCarrito', JSON.stringify(carrito));
    console.log(carrito);

    mostrar();
};

function mostrar() {
    //agregamos local Storage y chequeamos si hay algo
    if (localStorage.getItem('infoCarrito') != null) {
        carrito = JSON.parse(localStorage.getItem('infoCarrito'));
    }
    let ul  = document.createElement('ul');
    let li;
    divCarrito.innerHTML = '';
    let total = 0;
    let cantidadTotal = 0;
    for (let item of carrito) {
        let btnEliminar = document.createElement('button');
        btnEliminar.innerHTML = 'Delete';
        btnEliminar.classList.add('btn-li');
        btnEliminar.setAttribute('data-id', item.id);
        btnEliminar.setAttribute('onclick', 'eliminarCantidad('+item.id+');');

        let btnAgregar = document.createElement('button');
        btnAgregar.innerHTML = 'Add';
        btnAgregar.classList.add('btn-li');
        btnAgregar.setAttribute('data-id', item.id);
        btnAgregar.setAttribute('onclick', 'agregarCantidad('+item.id+');');

        let divLi = document.createElement('div');
        divLi.classList.add('div-li-carrito');

        let divBtnLi = document.createElement('div');
        divBtnLi.classList.add('div-btn-li');

        let img = document.createElement('img');
        img.src = item.img;
        img.setAttribute('class', 'img-carrito');
        li  = document.createElement('li');
        li.append(img);
        divLi.innerHTML += 
        `<p>Nombre: ${item.nombre}</p>
        <p>Precio: ${item.precio}</p>
        <p>Cantidad: ${item.cantidad}</p>`;
        divBtnLi.append(btnEliminar,btnAgregar);
        divLi.append(divBtnLi);
        li.append(divLi);
        li.setAttribute('class','item-carrito');
        ul.append(li);
        total += parseInt(item.precio)*parseInt(item.cantidad);
        cantidadTotal += parseInt(item.cantidad);
    }
    let precioTotal = document.createElement('p');
    precioTotal.setAttribute('class', 'precio-carrito');
    precioTotal.append(`Total overall: ` + total + '\n Items in cart: ' + cantidadTotal);

    if (carrito.length > 0) {
        divCarrito.append(precioTotal);
        divCarrito.append(ul);
        let btnVaciar = document.createElement('button');
        btnVaciar.innerHTML = 'Empty Cart';
        btnVaciar.classList.add('btn-vaciar')
        btnVaciar.addEventListener('click', vaciar);
        divCarrito.append(btnVaciar);
    }

};

function vaciar() {
    localStorage.removeItem('infoCarrito');
    carrito = [];
    divCarrito.innerHTML = '';
}

function eliminarCantidad(prodId) {
    for (let indice in carrito) {
        if (carrito[indice].id == prodId) {
            if (carrito[indice].cantidad > 1) {

                carrito[indice].cantidad--;
            } else {
                carrito.splice(indice,1);
            }
        }
        //lo guardo en localStorage
    }
    localStorage.setItem('infoCarrito', JSON.stringify(carrito));
    mostrar();
}

function agregarCantidad(prodId) {
    for (let indice in carrito) {
        if (carrito[indice].id == prodId) {
                carrito[indice].cantidad++;
            } 
        }
    //lo guardo en localStorage
    localStorage.setItem('infoCarrito', JSON.stringify(carrito));
    mostrar();
}

//para agregarle el titulo a cada producto
let mangaTitles = ['Jujustu Kaisen #0', 'Jujustu Kaisen #1', 'Jujustu Kaisen #2', 'Jujustu Kaisen #3', 'Chainsaw Man #1', 'Chainsaw Man #2', 'Chainsaw Man #3', 'Chainsaw Man #4', 'Bleach #8', 'Bleach #13', 'Bleach #25', 'Bleach #57'];

let i = 0;
for (let value of mangaTitles) {
    i++;
    let title = document.querySelector('#id'+ i)
    title.innerHTML = value
};

mostrar();