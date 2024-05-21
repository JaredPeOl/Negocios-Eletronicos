<script>

</script>

<template>
  <!-- Contenido principal de la página de inicio -->
  <main>
    <h1>Bienvenido a Digital Emporium</h1>

    <!-- Sección de tarjetas con imágenes y enlaces a la página de artículos -->
    <div class="indexImg">
      <!-- Tarjeta 1 -->
      <div class="tarjeta">
        <!-- Enlace a la página de artículos -->
        <router-link to="/articulos">
          <!-- Imagen de la tarjeta -->
          <img src="@/assets/indexFoto1.png" alt="img">
        </router-link>
        <!-- Título y descripción de la tarjeta -->
        <h2>Entrega a partir de 60 minutos</h2>
        <p>Todos los productos en tienda a precios bajos todos los días</p>
      </div>

      <!-- Tarjeta 2 -->
      <div class="tarjeta">
        <!-- Enlace a la página de artículos -->
        <router-link to="/articulos">
          <!-- Imagen de la tarjeta -->
          <img src="@/assets/indexFoto2.png" alt="img">
        </router-link>
        <!-- Título y descripción de la tarjeta -->
        <h2>Millones de productos desde 24 horas</h2>
        <p>Envío a todo México</p>
      </div>
    </div>
  </main>
</template>

<style lang="scss">


// Importa estilos definidos en el archivo style.scss
@import '../assets/style.scss';
</style>
