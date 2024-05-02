<template>
  <!-- La estructura principal de la página -->
  <main>
    <div>
      <!-- Encabezado de la sección de consolas -->
      <h1>Articulos</h1>

      <!-- Contenedor de las tarjetas de consolas -->
      <div class="tarjeta-container">
        <!-- Iterar sobre las consolas y mostrar sus detalles en tarjetas -->
        <div v-for="consola in consolas" :key="consola.id" class="tarjeta">
          <h2>{{ consola.nombre }}</h2>
          <img :src="consola.img" alt="Img">
          <p>Marca: {{ consola.marca }}</p>
          <p>Precio: ${{ consola.precio }}</p>
          <p>Existencia: {{ consola.existencia }}</p>
          <button @click="agregarAlCarrito(consola)" class="botoncin">Agregar al carrito</button>
        </div>
      </div>

      <!-- Sección del carrito -->
      <div id="carrito">
        <!-- Mostrar carrito solo si hay productos agregados -->
       
          <!-- Opciones de método de pago -->
          <div>
            <label for="metodoPago">Seleccione Método de Pago:</label>
            <select v-model="metodoPago" id="metodoPago">
              <option value="Efectivo">Efectivo</option>
              <option value="Tarjeta">Tarjeta</option>
            </select>
          </div>

          <!-- Ventana flotante para ingresar detalles de tarjeta -->
          <div v-if="metodoPago === 'Tarjeta'" class="modal">
            <div class="modal-content">
              <label for="numeroTarjeta">Número de Tarjeta:</label>
              <input v-model="numeroTarjeta" type="text" id="numeroTarjeta">

              <!-- Otros campos de la tarjeta (fecha de vencimiento, etc.) -->

              <div>
                <button @click="aceptarTarjeta">Aceptar</button>
                <button @click="cancelarTarjeta">Cancelar</button>
              </div>
            </div>
          </div>

          <h2>Carrito</h2>

          <!-- Iterar sobre los productos agregados al carrito y mostrar detalles -->
          <div v-for="productoAgregado in productosAgregados" :key="productoAgregado.consola.id"
            class="producto-agregado">
            <div class="producto-info">
              <img :src="productoAgregado.consola.img" alt="Producto">
              <span>
                {{ productoAgregado.consola.nombre }} <br>
                Cantidad: {{ productoAgregado.cantidad }} Total: ${{ productoAgregado.total.toFixed(2) }}
              </span>
            </div>
            <br>
            <!-- Botón para restar del carrito -->
            <button @click="restarDelCarrito(productoAgregado)" class="restar"
              :data-id="productoAgregado.consola.id">Restar</button>
          </div>

          <!-- Mostrar el total de la compra, método de pago y botón de pagar -->
          <p>Total Compra: ${{ carritoTotal.toFixed(2) }}</p>
          <p>Método de Pago: {{ metodoPago }}</p>
          <button @click="confirmarCompra" id="btnPagar">Pagar</button>

        
      </div>
    </div>
  </main>
</template>

<!-- Resto del código -->



<script setup>
import { db } from "../assets/firebase.js";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'vue-router';

const consolas = ref([]);
const productosAgregados = ref([]);
let carritoTotal = ref(0);
const router = useRouter();
const confirmacionCompra = ref(false); // Variable para rastrear si la compra ha sido confirmada
const metodoPago = ref("Efectivo"); // Inicialmente, establecer como "Efectivo"
const numeroTarjeta = ref("");

onMounted(async () => {
  cargarCarritoDesdeLocalStorage();
  let consolasCollection = await getDocs(collection(db, 'consolas'));
  consolasCollection.forEach((consola) => {
    consolas.value.push({ ...consola.data(), id: consola.id });
  });
});

const verificarInicioSesion = async () => {
  return new Promise((resolve) => {
    const auth = getAuth();
    onAuthStateChanged(auth, (usuario) => {
      if (!usuario) {
        alert('Debe iniciar sesión para realizar compras.');
        router.push('/registro');
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}; 

const agregarAlCarrito = async (consola) => {
   const inicioSesion = await verificarInicioSesion(); 
   if (inicioSesion) { 
    if (consola.existencia > 0) {
      const consolaExistente = productosAgregados.value.find(item => item.consola.id === consola.id);

      if (consolaExistente) {
        if (consolaExistente.cantidad < consolaExistente.existenciaOriginal) {
          consolaExistente.cantidad++;
          consolaExistente.total += consola.precio;

          carritoTotal.value += consola.precio;

          carritoTotal.value = parseFloat(carritoTotal.value.toFixed(2));
          guardarCarritoEnLocalStorage();
        } else {
          alert('No puedes agregar más unidades de este producto, la cantidad supera la existencia.');
        }
      } else {
        productosAgregados.value.push({
          consola: consola,
          cantidad: 1,
          total: consola.precio,
          existenciaOriginal: consola.existencia
        });

        carritoTotal.value += consola.precio;

        carritoTotal.value = parseFloat(carritoTotal.value.toFixed(2));
        guardarCarritoEnLocalStorage();
      }
    } else {
      alert('Producto agotado');
    }
   } 
};

const restarDelCarrito = async (productoAgregado) => {
   const inicioSesion = await verificarInicioSesion(); 

   if (inicioSesion) { 
    if (productoAgregado.cantidad > 0) {
      const consolaExistente = productosAgregados.value.find(item => item.consola.id === productoAgregado.consola.id);
      consolaExistente.cantidad--;
      consolaExistente.total -= productoAgregado.consola.precio;

      carritoTotal.value -= productoAgregado.consola.precio;
      carritoTotal.value = parseFloat(carritoTotal.value.toFixed(2));

      productoAgregado.consola.existencia++;

      // Actualizar existencia en Firestore solo si no se ha confirmado la compra
      if (!confirmacionCompra.value) {
        // eslint-disable-next-line no-undef
        await actualizarExistencia(productoAgregado.consola);
      }

      guardarCarritoEnLocalStorage();
    } else {
      alert('No se puede restar más');
    }
  } 
};

const confirmarCompra = async () => {
   const inicioSesion = await verificarInicioSesion();
 
  if (inicioSesion) { 
    if (carritoTotal.value > 0) {
      // Construir un mensaje con los detalles de la compra
      const mensaje = productosAgregados.value
        .filter(agregada => agregada.cantidad > 0)
        .map(agregada => `${agregada.cantidad} ${agregada.consola.nombre} - Total: $${agregada.total.toFixed(2)}`)
        .join('\n');

      // Confirmar la compra con el usuario
      const confirmarCompra = window.confirm(`¿Está seguro de proceder con la compra?\n${mensaje}\nTotal de la compra: $${carritoTotal.value}\nMétodo de Pago: ${metodoPago.value}`);

      if (confirmarCompra) {
        // Actualizar la existencia de los productos comprados en Firestore
        for (const productoAgregado of productosAgregados.value) {
          const consolaRef = doc(db, 'consolas', productoAgregado.consola.id);
          await updateDoc(consolaRef, {
            existencia: productoAgregado.consola.existencia - productoAgregado.cantidad
          });
        }

        // Limpiar el carrito después de realizar cambios en la base de datos
        productosAgregados.value = [];
        carritoTotal.value = 0;
        confirmacionCompra.value = true; // Indicar que la compra ha sido confirmada
        guardarCarritoEnLocalStorage();

        alert('Compra realizada con éxito');
        location.reload();
      } else {
        alert('Compra cancelada');
      }
    } else {
      alert('El carrito está vacío');
    }
   } 
};

const aceptarTarjeta = () => {
  // Validar el número de tarjeta u otros campos según sea necesario
  if (numeroTarjeta.value.trim() === "") {
    alert("Por favor, ingrese un número de tarjeta válido.");
    return;
  }

  
  // Actualizar la variable metodoPago antes de confirmar la compra
  metodoPago.value = "Tarjeta";

  // Cierra la ventana flotante
  cerrarModal();
  confirmarCompra();

  
};

const cancelarTarjeta = () => {
  // Cierra la ventana flotante sin realizar ninguna acción
  location.reload()
};

const guardarCarritoEnLocalStorage = () => {
  localStorage.setItem('carrito', JSON.stringify(productosAgregados.value));
};

const cargarCarritoDesdeLocalStorage = () => {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    productosAgregados.value = JSON.parse(carritoGuardado);
    recalcularTotal();
  }
};

const recalcularTotal = () => {
  carritoTotal.value = productosAgregados.value.reduce((total, producto) => total + producto.total, 0);
};

const cerrarModal = () => {
  metodoPago.value = "Tarjeta"; 
  numeroTarjeta.value = ""; 
};

</script>

<style>
h1 {
  text-align: center;
}

.tarjeta-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.tarjeta {
  width: 290px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.tarjeta img {
  width: 200px;
  height: auto;
}

#carrito {
  text-align: center;
  margin: 0 auto; 
  max-width: 600px; 
}

.producto-agregado {
  text-align: left; 
}
/* Estilos CSS para el modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  /* Fondo oscuro */
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}
</style>
