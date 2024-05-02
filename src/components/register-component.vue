<script setup>
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { ref } from "vue";
import { useRouter } from 'vue-router';

// Variables reactivas para el formulario de registro
const emailRegistro = ref("");
const passwordRegistro = ref("");

// Variables reactivas para el formulario de inicio de sesión
const emailInicioSesion = ref("");
const passwordInicioSesion = ref("");

const router = useRouter();

// Función para registrar un nuevo usuario
const register = async () => {
  try {
    const auth = getAuth();
    // Crear un nuevo usuario con correo y contraseña
    const userCredential = await createUserWithEmailAndPassword(auth, emailRegistro.value, passwordRegistro.value);
    const user = userCredential.user;

    // Iniciar sesión automáticamente después del registro
    await auth.signInWithEmailAndPassword(emailRegistro.value, passwordRegistro.value);

    console.log("Registrado correctamente y sesión iniciada!", user);
    router.push('/index');
  } catch (error) {
    console.error(error.code, error.message);
    alert(error.message);
  }
}

// Función para iniciar sesión con Google
const signInWithGoogle = async () => {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    // Iniciar sesión con Google mediante un popup
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    console.log("Registrado correctamente con Google!", user);
    router.push('/index');
  } catch (error) {
    console.error(error.code, error.message);
    alert(error.message);
  }
}

// Función para iniciar sesión con correo y contraseña
const login = async () => {
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, emailInicioSesion.value, passwordInicioSesion.value);
    router.push('/index');
  } catch (error) {
    console.error(error.code, error.message);
    alert(error.message);
  }
}
</script>

<template>
  <main>
    <div class="indexImg">
      <!-- Sección de registro -->
      <div class="tarjeta">
        <h1>Crea una cuenta</h1>
        <p><label for="emailRegistro">Correo </label><input type="email" id="emailRegistro" placeholder="Ingrese su correo" v-model="emailRegistro" required></p>
        <p><label for="passwordRegistro">Contraseña</label><input type="password" id="passwordRegistro" placeholder="" v-model="passwordRegistro" required></p>
        <p><button @click="register">Registrar</button></p>
        <p><button @click="signInWithGoogle">Registrar con Google</button></p>
      </div>

      <!-- Sección de inicio de sesión -->
      <div class="tarjeta">
        <h1>Iniciar Sesión</h1>
        <p><label for="emailInicioSesion">Correo </label><input type="email" id="emailInicioSesion" placeholder="Ingrese su correo" v-model="emailInicioSesion" required></p>
        <p><label for="passwordInicioSesion">Contraseña</label><input type="password" id="passwordInicioSesion" placeholder="" v-model="passwordInicioSesion" required></p>
        <p><button @click="login">Iniciar Sesión</button></p>
        <p><button @click="signInWithGoogle">Iniciar Sesión con Google</button></p>
      </div>
    </div>
  </main>
</template>
