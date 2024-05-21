<template>
  <!-- Definición del componente de pie de página -->
  <footer>
    <!-- Lista de enlaces de navegación -->
    <ul>
      <!-- Enlaces a las diferentes páginas -->
      <li>
        <router-link to="/contacto">
          <p>Contactanos</p>
        </router-link>
      </li>
      <li>
        <router-link to="#">
          <p>Aviso de Privacidad Integral</p>
        </router-link>
      </li>
      <li>
        <router-link to="/terminos">
          <p>Términos y Condiciones</p>
        </router-link>
      </li>
      <li>
        <router-link to="/propiedad">
          <p>Propiedad intelectual</p>
        </router-link>
      </li>
      <li>
        <router-link to="#">
          <p>Legales</p>
        </router-link>
      </li>
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
/* Estilos específicos del pie de página */
footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #333;
  color: white;
}

ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
}

ul li {
  display: inline-block;
  margin: 10px;
}

ul li p {
  margin: 0;
  cursor: pointer;
}
</style>
