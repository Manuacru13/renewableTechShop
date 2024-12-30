document.addEventListener("DOMContentLoaded", () => {
    const carritoItemsStorage = JSON.parse(localStorage.getItem('cart')) || [];
    const carritoTableBody = document.getElementById('carrito-items');
    const totalElement = document.getElementById('total');
    const cartCountElement = document.getElementById('cart-count'); // Elemento para mostrar cantidad de productos en el carrito

    let total = 0;

    // Función para actualizar el total y la cantidad de productos en el carrito
    function actualizarCarrito() {
        // Calcular el total sumando los precios de los productos en el carrito
        const totalCarrito = carritoItemsStorage.reduce((sum, item) => sum + item.price, 0);

        // Actualizar el total en la página del carrito
        totalElement.textContent = totalCarrito.toFixed(2);

        // Actualizar la cantidad de productos en el carrito
        const cantidadProductos = carritoItemsStorage.length;
        cartCountElement.textContent = cantidadProductos; // Actualiza la cantidad junto al ícono
    }

    // Cargar los productos en la tabla
    carritoItemsStorage.forEach((item, index) => {
        const row = document.createElement('tr');

        // Nombre del producto
        const nombreCelda = document.createElement('td');
        nombreCelda.textContent = item.title;
        row.appendChild(nombreCelda);

        // Precio del producto
        const precioCelda = document.createElement('td');
        precioCelda.textContent = `$${item.price}`;
        row.appendChild(precioCelda);

        // Cantidad (por defecto 1)
        const cantidadCelda = document.createElement('td');
        cantidadCelda.textContent = 1;
        row.appendChild(cantidadCelda);

        // Subtotal
        const subtotalCelda = document.createElement('td');
        subtotalCelda.textContent = `$${item.price}`;
        row.appendChild(subtotalCelda);

        // Botón "Eliminar"
        const accionesCelda = document.createElement('td');
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.classList.add('btn', 'btn-danger', 'btn-sm');
        eliminarBtn.addEventListener('click', () => eliminarProducto(index));
        accionesCelda.appendChild(eliminarBtn);
        row.appendChild(accionesCelda);

        // Agregar fila a la tabla
        carritoTableBody.appendChild(row);

        // Sumar al total
        total += item.price;
    });

    // Actualizar el total y la cantidad de productos en el carrito
    actualizarCarrito();

    // Función para eliminar un producto específico
    function eliminarProducto(index) {
        carritoItemsStorage.splice(index, 1); // Eliminar producto del array
        localStorage.setItem('cart', JSON.stringify(carritoItemsStorage)); // Actualizar localStorage
        actualizarCarrito(); // Actualizar el total y la cantidad
        window.location.reload(); // Recargar la página
    }

    // Función para agregar un producto al carrito (ejemplo de cómo agregar productos al carrito)
    function agregarProductoAlCarrito(producto) {
        carritoItemsStorage.push(producto); // Agregar producto al carrito
        localStorage.setItem('cart', JSON.stringify(carritoItemsStorage)); // Actualizar localStorage
        actualizarCarrito(); // Actualizar el total y la cantidad
    }

    // Ejemplo de agregar un producto
    // agregarProductoAlCarrito({ title: 'Producto Ejemplo', price: 200 });

    // Botón para limpiar el carrito y volver al inicio
    document.getElementById('limpiar-carrito').addEventListener('click', () => {
        localStorage.removeItem('cart'); // Limpiar el carrito
        window.location.href = 'index.html'; // Redirigir al inicio
    });

    // Botón para finalizar la compra
    document.getElementById('finalizar-compra').addEventListener('click', () => {
        Swal.fire({
            title: 'Compra Procesada',
            text: '¡Gracias por tu compra!',
            icon: 'success',
            confirmButtonText: 'Aceptar',
        });

        localStorage.removeItem('cart'); // Limpiar el carrito
        setTimeout(() => window.location.href = 'index.html', 4000); // Redirigir al inicio
    });
});





