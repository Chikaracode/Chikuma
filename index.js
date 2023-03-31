let btns = [
    {
        id: 0,
        categoria: 'Home',
        idBtn: 'btn-home' // se agrega el id aquí
    },
    {
        id: 1,
        categoria: 'Productos del hogar'
    },
    {
        id:2,
        categoria: 'Skincare'
    },
    {
        id:3,
        categoria: 'Kawaii'
    },
    {
        id:4,
        categoria: 'Tecnología'
    }
];

let product = [];

fetch("./data.json")
.then((res) => res.json())

.then((data) => {
    product = data
    mostrarItem(data);
});

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//En esta primera parte está la lógica de los botones de categoria
const filters = [...new Set(btns.map((btn) => 
    {return btn}))]

    document.getElementById('btns').innerHTML = filters.map((btn) => {
        let {categoria, id} = btn;
        return(
            `<button class= 'fil-p' onclick = "filterItems('${categoria}')">${categoria}</button>`
        )
    }).join('');


// función para mostrar todos los productos con el boton Home
const mostrarTodos = () => {
    mostrarItem(product);
}

    document.getElementById('btns').innerHTML = filters.map((btn) => {
        let {categoria, idBtn} = btn; // agrega idBtn aquí
        return(
        `<button id="${idBtn || ''}" class="fil-p" onclick="filterItems('${categoria}')">${categoria}</button>`
       )
    }).join('');



document.getElementById('btn-home').addEventListener('click', mostrarTodos);


const categories = [...new Set(product.map((item) =>
    {return item}))]
    let i=0;

//Aqui filtro los items por categorias al clickar en los botones del sidebar
//En este código, la función de devolución de llamada que se pasa al método filter() 
//comprueba si el id del elemento es igual a a y devuelve true si es así. Luego, el resultado filtrado se pasa a la función mostrarItem.

const filterItems = (categoria) => {
    Array.from(document.querySelectorAll("[data-categoria]")).forEach((producto => producto.style.display = 'none'))
    const productosFiltrados = Array.from(document.querySelectorAll("[data-categoria='"+categoria+"']"))
    productosFiltrados.forEach((producto => producto.style.display = 'block'))
  };



const mostrarItem = (data) => {
    product = data;
    const contenedor = document.getElementById('root');
    contenedor.innerHTML=''
    product.forEach((producto, indice) => {
        let card = document.createElement('div');
        card.setAttribute('class', 'box')
        card.setAttribute('data-categoria', producto.categoria)
        card.classList.add('root');
        card.innerHTML = `<h3>${producto.titulo}</h3>
        <div class = 'img-box'>
        <img class = 'images' src = ${producto.imagen}></img>
        </div>
        <div class = 'bottom'>
        <h2>S/.${producto.precio}.00</h2>
        <a class='enlace' href=#carrito onClick = 'addToCart(${indice})'>Añadir al carrito</a>
        </div>
        `;
        contenedor.appendChild(card); 
    });
}
    mostrarItem(product);

const addToCart = (i) => {
    const clickProduct = carrito.findIndex((elemento) => elemento.id === i)
    if(clickProduct === -1){
        const addProduct = product[i];
        addProduct.cantidad = 1
        carrito.push(addProduct)
    localStorage.setItem('carrito', JSON.stringify(carrito))
    displayCart(i);

    } else {
        const newCart = [...carrito]
        newCart[clickProduct].cantidad +=1
        carrito = newCart
    localStorage.setItem('carrito', JSON.stringify(carrito))
    displayCart(i);
    }
   
}


function delElement(a){
    carrito.splice(a, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito))
    displayCart(a);
}


function displayCart(a){
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let j = 0; total = 0;
    document.getElementById('count').innerHTML = carrito.length;
    if(carrito.length == 0){
        document.getElementById('cartItem').innerHTML = 'El carrito está vacío';
        document.getElementById('total').innerHTML = "S/. " +0+ " .00";
    }else{
        document.getElementById('cartItem').innerHTML = carrito.map((items)=>{
            let {imagen, titulo, precio, cantidad} = items;
            total=  total + precio;
            document.getElementById('total').innerHTML = "S/. " +(cantidad * total) + " .00";
            return(
                `<div class='cart-item'>
                 <div class='row-img'>
                    <img class='rowimg' src=${imagen}>
                 </div>
                 <p style='font-size: 12px;'>${titulo}</p>
                 <h2 style='font-size: 15px;'>${cantidad}</h2>
                 <h2 style='font-size: 15px;'> S/. ${precio}.00</h2> <br>` +
                 "<i class = 'fa-solid fa-trash' onClick='delElement("+(j++)+")'></i></div> "
            );
        }).join('');
    }
}



document.addEventListener('DOMContentLoaded', displayCart)

   





