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

let product = [
    {
        id: 0,
        imagen: './img/producto.jpg',
        titulo: 'Filtro de agua',
        precio: 100,
        categoria: 'Productos del hogar'
    },
    {  
       id: 1,
       imagen: './img/producto.jpg',
       titulo: 'Escoba 3en1',
       precio: 40,
       categoria: 'Productos del hogar'
    },
    {
        id: 2,
        imagen: './img/producto.jpg',
        titulo: 'Mascarillas faciales',
        precio: 80,
        categoria: 'Skincare'
    },
    {
        id: 3,
        imagen: './img/producto.jpg',
        titulo: 'Jabón de rostro',
        precio: 15,
        categoria: 'Skincare'
    },
    {
        id: 4,
        imagen: './img/producto.jpg',
        titulo: 'Peluche Kawaii',
        precio: 30,
        categoria: 'Kawaii'
    },
    {
        id: 5,
        imagen: './img/producto.jpg',
        titulo: 'Polera kawaii',
        precio: 60,
        categoria: 'Kawaii'
    },
    {
        id: 6,
        imagen: './img/producto.jpg',
        titulo: 'Aspiradora robot',
        precio: 200,
        categoria: 'Tecnología'
    },
    {
        id: 7,
        imagen: './img/producto.jpg',
        titulo: 'Parlante smart',
        precio: 100,
        categoria: 'Tecnología'
    },
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

//En esta primera parte está la lógica de los botones de categoria
const filters = [...new Set(btns.map((btn) => 
    {return btn}))]

    document.getElementById('btns').innerHTML = filters.map((btn) => {
        let {categoria, id} = btn;
        return(
            "<button class= 'fil-p' onclick = 'filterItems("+(id)+`)'>${categoria}</button>`
        )
    }).join('');


// función para mostrar todos los productos con el boton Home
const mostrarTodos = () => {
    mostrarItem(product);
}

    document.getElementById('btns').innerHTML = filters.map((btn) => {
        let {categoria, id, idBtn} = btn; // agrega idBtn aquí
        return(
        `<button id="${idBtn || ''}" class="fil-p" onclick="filterItems(${id})">${categoria}</button>`
       )
    }).join('');



document.getElementById('btn-home').addEventListener('click', mostrarTodos);


const categories = [...new Set(product.map((item) =>
    {return item}))]
    let i=0;

//Aqui filtro los items por categorias al clickar en los botones del sidebar
//En este código, la función de devolución de llamada que se pasa al método filter() 
//comprueba si el id del elemento es igual a a y devuelve true si es así. Luego, el resultado filtrado se pasa a la función mostrarItem.

const filterItems = (a) => {
    const filterCategories = categories.filter(item => item.id === a);
    mostrarItem(filterCategories);
  };


const mostrarItem = (items) => {
    document.getElementById('root').innerHTML = items.map((item) =>
    {
        let {imagen, titulo, precio, id} = item;
        
        return(
           `<div class = 'box'>
            <h3>${titulo}</h3>
            <div class = 'img-box'>
            <img class = 'images' src = ${imagen}></img>
            </div>
            <div class = 'bottom'>
            <h2>S/.${precio}.00</h2>` +
            "<a class='enlace' href=#carrito onClick = 'addToCart("+id+")'>Añadir al carrito</a>" +
            `</div>
            </div>`
           
        )}).join(''); 

      };

    mostrarItem(categories);

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
    carrito = JSON.parse(localStorage.getItem('carrito'))
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

   





