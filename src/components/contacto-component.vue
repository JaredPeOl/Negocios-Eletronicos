<template>
  <main>

    <div class="propiedad">
    <h1 class="text-center">¡Bienvenido a Digital Emporium!</h1>
    <p class="lead text-center">En Digital Emporium, nos enorgullece ofrecer productos nuevos, una amplia variedad y un servicio excepcional. Estamos aquí para atenderte, responder tus consultas y hacer tu experiencia de compra inigualable.</p>

    <div class="row mt-5">
      <div class="col-md-6">
        <h2>Información de Contacto</h2>

        <p><strong>Dirección:</strong> Descubre nuestras instalaciones en La Piedad Michoacán, tu destino para productos de calidad y ofertas irresistibles.</p>

        <p><strong>Teléfono:</strong> ¿Necesitas asistencia inmediata? Llámanos al 352-102-88-49 durante nuestras horas de operación.</p>

        <p><strong>Correo Electrónico:</strong> Para preguntas, sugerencias o cualquier otra consulta, escríbenos a ShopSmartly@gmail.com.</p>

        <h2>Horario de Atención</h2>
        <p><strong>Lunes a Domingo:</strong> Desde las 09:00 a.m hasta las 10:00 p.m. Tus necesidades son nuestra prioridad, y nos esforzamos por responder a todas las consultas en un plazo de 24 horas.</p>

        <h2>Redes Sociales</h2>
        <p>Conéctate con nosotros en nuestras redes sociales para descubrir las últimas ofertas, eventos y novedades.</p>
        <ul>
          <li><a :href="facebookLink" target="_blank"> <img src="../assets/Logo_de_Facebook.png" alt=""></a></li>
          <li><a :href="instagramLink" target="_blank"><img src="../assets/Instagram_icon.png" alt=""></a></li>
          <li><a :href="twitterLink" target="_blank"><img src="../assets/twitter.png" alt=""></a></li>
        </ul>
      </div>

     

      </div>
    </div>
 
  </main>
 
</template>

<script setup>
const facebookLink = "https://www.facebook.com/";
const instagramLink = "https://www.instagram.com/";
const twitterLink = "https://twitter.com/?lang=es";
</script>

<style lang="scss" >
@import '../assets/style.scss'

</style>
