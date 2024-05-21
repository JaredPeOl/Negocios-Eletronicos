<template>
  <main>
    <div>
      <h1>Articulos</h1>
      <div class="tarjeta-container">
        <h1>Consolas</h1>

      </div>
      <div class="tarjeta-container">
        <div v-for="consola in consolas" :key="consola.id" class="tarjeta">
          <h2>{{ consola.nombre }}</h2>
          <img :src="consola.img" alt="Img">
          <p>Marca: {{ consola.marca }}</p>
          <p>Precio: ${{ consola.precio }}</p>
          <p>Existencia: {{ consola.existencia }}</p>
          <button @click="agregarAlCarrito(consola)" class="botoncin">Agregar al carrito</button>
        </div>
      </div>

      <div class="tarjeta-container">
        <h1>Computadoras</h1>
      </div>
      <div class="tarjeta-container">
        
        <!-- Mostrar computadoras -->
        <div v-for="computadora in computadoras" :key="computadora.id" class="tarjeta">
          <h2>{{ computadora.nombre }}</h2>
          <img :src="computadora.img" alt="Img">
          <p>Marca: {{ computadora.marca }}</p>
          <p>Precio: ${{ computadora.precio }}</p>
          <p>Existencia: {{ computadora.existencia }}</p>
          <button @click="agregarAlCarrito(computadora)" class="botoncin">Agregar al carrito</button>
        </div>
      </div>
      <div class="tarjeta-container">
  <h1>Audio y Video</h1>
  </div>
      <div class="tarjeta-container">
  <div v-for="audioVideo in audioVideos" :key="audioVideo.id" class="tarjeta">
    <h2>{{ audioVideo.nombre }}</h2>
    <img :src="audioVideo.img" alt="Img">
    <p>Marca: {{ audioVideo.marca }}</p>
    <p>Precio: ${{ audioVideo.precio }}</p>
    <p>Existencia: {{ audioVideo.existencia }}</p>
    <button @click="agregarAlCarrito(audioVideo)" class="botoncin">Agregar al carrito</button>
  </div>
</div>


      <!-- Botón para abrir/cerrar el carrito -->
      <button class="toggle-carrito" @click="toggleCarrito">
        {{ carritoVisible ? 'Cerrar Carrito' : 'Abrir Carrito' }}
      </button>

      <!-- Sección del carrito en el lateral -->
      <div id="carrito" :class="{ 'carrito-visible': carritoVisible }">
        <div class="carrito-content">
          <h2>Carrito</h2>

          <div v-if="productosAgregados.length">
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
              <button @click="restarDelCarrito(productoAgregado)" class="restar"
                :data-id="productoAgregado.consola.id">Restar</button>
            </div>

            <p>Total Compra: ${{ carritoTotal.toFixed(2) }}</p>
            <p>Método de Pago: {{ metodoPago }}</p>
            <div>
              <label for="metodoPago">Seleccione Método de Pago:</label>
              <select v-model="metodoPago" id="metodoPago">
                <option value="Efectivo">Efectivo</option>
                <option value="Tarjeta">Tarjeta</option>
              </select>
            </div>

            <div v-if="metodoPago === 'Tarjeta'" class="modal">
              <div class="modal-content">
                <label for="numeroTarjeta">Número de Tarjeta:</label>
                <input v-model="numeroTarjeta" type="text" id="numeroTarjeta">
                <div>
                  <button @click="aceptarTarjeta">Aceptar</button>
                  <button @click="cancelarTarjeta">Cancelar</button>
                </div>
              </div>
            </div>

            <button @click="confirmarCompra" id="btnPagar">Pagar</button>
          </div>
          <div v-else>
            <p>El carrito está vacío.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { db } from "../assets/firebase.js";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";
import { ref, onMounted } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'vue-router';

const audioVideos = ref([]);
const consolas = ref([]);
const computadoras = ref([]);
const productosAgregados = ref([]);
let carritoTotal = ref(0);
const router = useRouter();
const confirmacionCompra = ref(false);
const metodoPago = ref("Efectivo");
const numeroTarjeta = ref("");
const carritoVisible = ref(false); // Variable para manejar la visibilidad del carrito

onMounted(async () => {
  cargarCarritoDesdeLocalStorage();
  let consolasCollection = await getDocs(collection(db, 'consolas'));
  consolasCollection.forEach((consola) => {
    consolas.value.push({ ...consola.data(), id: consola.id });
  });
  let computadorasCollection = await getDocs(collection(db, 'Computadoras'));
  computadorasCollection.forEach((computadora) => {
    computadoras.value.push({ ...computadora.data(), id: computadora.id });
  });
  let audioVideoCollection = await getDocs(collection(db, 'audioVideo'));
  audioVideoCollection.forEach((audioVideo) => {
    audioVideos.value.push({ ...audioVideo.data(), id: audioVideo.id });
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
      const index = productosAgregados.value.findIndex(item => item.consola.id === productoAgregado.consola.id);

      if (index !== -1) {
        const consolaExistente = productosAgregados.value[index];
        consolaExistente.cantidad--;
        consolaExistente.total -= productoAgregado.consola.precio;

        carritoTotal.value -= productoAgregado.consola.precio;
        carritoTotal.value = parseFloat(carritoTotal.value.toFixed(2));

        if (consolaExistente.cantidad === 0) {
          // Si la cantidad llega a 0, eliminar el producto del carrito
          productosAgregados.value.splice(index, 1);
        }

        productoAgregado.consola.existencia++;

        if (!confirmacionCompra.value) {
          await actualizarExistencia(productoAgregado.consola);
        }

        guardarCarritoEnLocalStorage();
      }
    } else {
      alert('No se puede restar más');
    }
  }
};


const confirmarCompra = async () => {
   const inicioSesion = await verificarInicioSesion();
 
  if (inicioSesion) { 
    if (carritoTotal.value > 0) {
      const mensaje = productosAgregados.value
        .filter(agregada => agregada.cantidad > 0)
        .map(agregada => `${agregada.cantidad} ${agregada.consola.nombre} - Total: $${agregada.total.toFixed(2)}`)
        .join('\n');

      const confirmarCompra = window.confirm(`¿Está seguro de proceder con la compra?\n${mensaje}\nTotal de la compra: $${carritoTotal.value}\nMétodo de Pago: ${metodoPago.value}`);

      if (confirmarCompra) {
        for (const productoAgregado of productosAgregados.value) {
          const consolaRef = doc(db, 'consolas', productoAgregado.consola.id);
          await updateDoc(consolaRef, {
            existencia: productoAgregado.consola.existencia - productoAgregado.cantidad
          });
        }

        productosAgregados.value = [];
        carritoTotal.value = 0;
        confirmacionCompra.value = true;
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
  if (numeroTarjeta.value.trim() === "") {
    alert("Por favor, ingrese un número de tarjeta válido.");
    return;
  }

  metodoPago.value = "Tarjeta";
  cerrarModal();
  confirmarCompra();
};

const cancelarTarjeta = () => {
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

const toggleCarrito = () => {
  carritoVisible.value = !carritoVisible.value;
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

.toggle-carrito {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

#carrito {
  position: fixed;
  top: 60px; /* Ajuste para que no oculte el header */
  right: -400px; /* Carrito inicialmente oculto */
  width: 400px;
  height: calc(100% - 160px); /* Ajuste de altura para dejar espacio para el header y el footer */
  background-color: #f8f9fa;
  overflow-y: auto;
  transition: right 0.3s ease;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
}

#carrito.carrito-visible {
  right: 0; /* Mostrar carrito cuando está visible */
}

.carrito-content {
  padding: 20px;
}

.producto-agregado {
  text-align: left;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}

/* Asegura que el contenido principal no se solape con el carrito */
main {
  padding-bottom: 100px; /* Deja espacio para el footer */
  padding-top: 60px; /* Deja espacio para el header */
}
</style>
