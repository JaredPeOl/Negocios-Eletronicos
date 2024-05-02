<template>
  <!-- Definición del componente de pie de página -->
  <footer>
    <!-- Lista de enlaces de navegación -->
    <ul>
      <!-- Enlace a la página de contacto -->
      <li>
        <router-link to="/contacto">
          <p>Contactanos</p>
        </router-link>
      </li>
      <!-- Enlace a la página de aviso de privacidad -->
      <li>
        <router-link to="#">
          <p>Aviso de Privacidad Integral</p>
        </router-link>
      </li>
      <!-- Enlace a la página de términos y condiciones -->
      <li>
        <router-link to="/terminos">
          <p>Términos y Condiciones</p>
        </router-link>
      </li>
      <!-- Enlace a la página de propiedad intelectual -->
      <li>
        <router-link to="/propiedad">
          <p>Propiedad intelectual</p>
        </router-link>
      </li>
      <!-- Enlace a la página de legales -->
      <li>
        <router-link to="#">
          <p>Legales</p>
        </router-link>
      </li>
      <!-- Enlace a la página de devoluciones -->
      <li>
        <router-link to="#">
          <p>Devoluciones</p>
        </router-link>
      </li>
    </ul>
  </footer>
</template>

<script>
// Puedes agregar lógica JavaScript específica del componente aquí
</script>

<style lang="scss">
// Importa estilos definidos en el archivo style.scss
@import '../assets/style.scss';
</style>
