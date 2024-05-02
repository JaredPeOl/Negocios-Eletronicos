<template>
  <div>
    <!-- Componente del encabezado -->
    <header-component />
    
    <!-- Usar router-view para mostrar componentes dinámicamente según la ruta -->
    <router-view></router-view>
    
    <!-- Componente del pie de página -->
    <footer-component />
  </div>
</template>

<script setup>
// Importa los componentes del encabezado y del pie de página
import HeaderComponent from "./components/header-component.vue";
import FooterComponent from "./components/footer-component.vue";
</script>

<style>
/* Puedes agregar estilos específicos para este componente aquí */
</style>
