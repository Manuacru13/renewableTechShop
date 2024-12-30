window.addEventListener("load", function () {
  setTimeout(() => {
    document.getElementById("preloader").style.display = "none";
    document.getElementById("content").style.visibility = "visible";
  }, 2000);  // Cambiar la duración si es necesario
});

document.addEventListener("DOMContentLoaded", () => {
  
  // Leer el carrito desde localStorage
  const carritoItemsStorage = JSON.parse(localStorage.getItem('cart')) || [];
   
  // Obtener el elemento del contador en el carrito
  const cartCountElement = document.getElementById('cart-count');

  // Actualizar el contador de productos en el carrito
  if (cartCountElement) {
      const cartItemCount = carritoItemsStorage.length;
      cartCountElement.textContent = cartItemCount > 0 ? cartItemCount : '0';
  }

 const productosContainer = document.querySelector("#productos-container");

 //capturo los elementos html (botones) que necesito
 const prevBtn = document.getElementById("prev-btn");
 const nextBtn = document.getElementById("next-btn");
 const pageInfo = document.getElementById("page-info");

 const searchForm = document.getElementById("search-form");
 const searchInput = document.getElementById("search-input");


 //estan variables se utilizan para ver la pagina actual, la cantidad de elementos a mostrar y el total de elementos.
 let currentPage = 1;
 const limit = 9;
 let totalProductos = 0;
 let allProductos = []; // Array para almacenar todos los productos cargados para búsqueda


 // Función para actualizar el contador del carrito
 function updateCartCount() {
   const cartCount = document.getElementById('cart-count');
   let cart = JSON.parse(localStorage.getItem("cart")) || [];
   cartCount.textContent = cart.length;  // Actualiza el número de productos en el carrito
 }


 function fetchProductos(page) {
   //esta variable se usa para saber los elemtos que ya mostre y los que tienen que mostrar, o sea a partir del 2 en adelante
   const skip = (page - 1) * limit;

   fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
     .then((response) => response.json())
     .then((data) => {
       totalProductos = data.total;
       const productos = data.products;
       allProductos = productos; // Almacena los productos actuales

       renderProductos(productos);
       pageInfo.textContent = `Página ${currentPage}`;
       prevBtn.disabled = currentPage === 1;
       nextBtn.disabled = (currentPage * limit) >= totalProductos;
     })
     .catch((error) => console.error("Error fetching products:", error));
 }

 function renderProductos(productos) {
   // Limpia el contenedor de productos
   productosContainer.innerHTML = "";

   // Genera las cards de productos
   productos.forEach((product) => {
     const cardDiv = document.createElement("div");
     cardDiv.className = "col-md-4";

     cardDiv.innerHTML = `
           <div class="card mt-3">
             <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}" style="height: 200px; object-fit: cover;">
             <div class="card-body d-flex flex-column">
               <h5 class="card-title">${product.title}</h5>
               <p class="card-text">${product.description}</p>
               <p class="card-text fw-bold">Precio: $${product.price}</p>
               <button class="btn btn-success mt-auto">Agregar</button>
             </div>
           </div>
         `;

     // Agregar evento al botón "Agregar"
     const botonAgregar = cardDiv.querySelector("button");
     botonAgregar.addEventListener("click", () => {
       agregarAlCartito(product);
     });

     // Añadir la card al contenedor
     productosContainer.appendChild(cardDiv);
   });
 }

 // Función para agregar al carrito y actualizar la cantidad
 function agregarAlCartito(product) {
   let cart = JSON.parse(localStorage.getItem("cart")) || [];

   // Verificar si el producto ya está en el carrito, si es así, sumamos la cantidad
   const existingProduct = cart.find(item => item.id === product.id);
   if (existingProduct) {
     existingProduct.quantity += 1;  // Aumentamos la cantidad
   } else {
     // Si no está en el carrito, lo agregamos con cantidad 1
     product.quantity = 1;
     cart.push(product);
   }

   localStorage.setItem("cart", JSON.stringify(cart));
   alert(`${product.title} ha sido agregado al carrito!`);

   updateCartCount();  // Llamar a esta función para actualizar el contador inmediatamente después de agregar al carrito
 }

 searchForm.addEventListener("submit", (event) => {
   event.preventDefault();
   const query = searchInput.value.toLowerCase().trim();

   const filteredProductos = allProductos.filter(product =>
     product.title.toLowerCase().includes(query) ||
     product.category?.toLowerCase().includes(query)
   );

   renderProductos(filteredProductos);
 });

 prevBtn.addEventListener("click", () => {
   if (currentPage > 1) {
     currentPage--;
     fetchProductos(currentPage);
   }
 });


 nextBtn.addEventListener("click", () => {
   if ((currentPage * limit) < totalProductos) {
     currentPage++;
     fetchProductos(currentPage);
   }
 });


 fetchProductos(currentPage);
 updateCartCount();  // Actualizar el contador del carrito al cargar la página
});
