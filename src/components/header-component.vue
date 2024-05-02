<template>
  <!-- Estructura del componente de la barra de navegación -->
  <header>
    <nav>
      <ul>
        <!-- Logo de la aplicación con enlace a la página de inicio -->
        <div class="logo">
          <router-link to="/index">
            <img src="../assets/logo_transparent.png" alt="img" />
          </router-link>
        </div>

        <!-- Enlaces de navegación -->
        <li><router-link to="/index" class="selected">Inicio</router-link></li>
        <li><router-link to="/articulos" >¿Qué quieres comprar hoy?</router-link></li>

        <!-- Mostrar enlace de inicio de sesión/registro si el usuario no está autenticado -->
        <template v-if="!usuarioAutenticado">
          <li><router-link to="/registro" >Iniciar Sesión/Registrarse</router-link></li>
        </template>

        <!-- Mostrar información del usuario y enlace de cierre de sesión si está autenticado -->
        <template v-else>
          <li>{{ usuarioAutenticado.email }}</li>
          <li @click="cerrarSesion">Cerrar Sesión</li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export default {
  setup() {
    // Variable reactiva para almacenar la información del usuario autenticado
    const usuarioAutenticado = ref(null);

    // Función para cerrar sesión del usuario
    const cerrarSesion = async () => {
      const auth = getAuth();
      await signOut(auth);
    };

    // Hook de montaje para obtener y actualizar la información del usuario al cargar el componente
    onMounted(() => {
      const auth = getAuth();
      onAuthStateChanged(auth, (usuario) => {
        usuarioAutenticado.value = usuario;
      });
    });

    // Devolver las variables y funciones necesarias para el componente
    return {
      usuarioAutenticado,
      cerrarSesion,
    };
  },
};
</script>

<style lang="scss">
@import '../assets/style.scss';  // Importar estilos adicionales
</style>
