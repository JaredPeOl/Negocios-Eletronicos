// Importa las funciones necesarias de Vue Router y Vue
import { createRouter, createWebHashHistory } from 'vue-router';
import { createApp } from 'vue';

// Importa el componente principal de la aplicación
import App from './App.vue';

// Importa tus componentes personalizados
import HeaderComponent from './components/header-component.vue';
import ArticulosComponent from './components/articulos-component.vue';
import FooterComponent from './components/footer-component.vue';
import IndexComponent from './components/index-component.vue';
import ContactoComponent from './components/contacto-component.vue';
import RegistroComponent from './components/register-component.vue';
import PropiedadComponent from './components/propiedad-component.vue';
import TerminosComponent from './components/terminos-component.vue';

// Redirige a la página de inicio si la URL no termina en '#/index'
if (window.location.hash !== '#/index') {
  window.location.replace('#/index');
}

// Define las rutas de la aplicación
const routes = [
  {
    path: '/index',
    component: IndexComponent,
  },
  {
    path: '/header',
    component: HeaderComponent,
  },
  {
    path: '/articulos',
    component: ArticulosComponent,
  },
  {
    path: '/contacto',
    component: ContactoComponent,
  },
  {
    path: '/registro',
    component: RegistroComponent,
  },
  {
    path: '/propiedad',
    component: PropiedadComponent,
  },
  {
    path: '/terminos',
    component: TerminosComponent,
  },
  {
    path: '/footer',
    component: FooterComponent,
  }
];

// Crea una instancia del enrutador con las rutas y el historial de hash
const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// Crea una instancia de la aplicación Vue
const app = createApp(App);

// Usa el enrutador en la aplicación Vue
app.use(router);

// Monta la aplicación en el elemento con el ID 'app' en el DOM
app.mount('#app');
