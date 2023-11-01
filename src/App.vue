
<script setup>

import MiComponente from './components/MiComponente.vue';
</script>

<template>
  <header>
    <img alt="facelift" class="logo" src="./assets/facelift.jpg" width="125" height="125" />

    <div class="wrapper">
      <MiComponente msg="EL MEJOR ALBUM DE ALICE IN CHAINS" />
    </div>
  </header>
</template>

<component :is="componentId">





</component>