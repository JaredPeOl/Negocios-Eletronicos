<script setup>
defineProps({
  msg: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      EL MEJOR ALBUM DE ALICE IN CHAINS LANZADO EN 1990
   
    </h3>
  </div>
</template>

