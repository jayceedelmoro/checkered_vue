<script setup>
  import { ref } from 'vue';
  import axios from 'axios';
  
  import { toast } from 'vue3-toastify';
  import 'vue3-toastify/dist/index.css';

  import LoginComponent from '../components/LoginComponent.vue';

  const loginPageDisplay = ref('login');

  const username = ref('');
  const password = ref('');
  const email = ref('');

  const toggleDisplay = (text) => {
    loginPageDisplay.value = text;
  }

  const loginHandler = () => {
    axios.post(`http://localhost:8000/api/v1/users/login`, {'username': username.value, 'password': password.value } ).then(dbResponse => {
        toast.success(dbResponse.data.message, {
            autoClose: 1000,
        });
    })
    .catch(error => {
        toast.error(error.response.data.message, {
            autoClose: 1000,
        });
    })
  }

  const registerHandler = () => {
  axios.post(`http://localhost:8000/api/v1/users/register`, {'username': username.value, 'email': email.value, 'password': password.value } ).then(dbResponse => {
        toast.success(dbResponse.data.message, {
            autoClose: 1000,
        });
        toggleDisplay('ty');
  })
  .catch(error => {
        toast.error(error.response.data.message, {
            autoClose: 1000,
        });
  })
}
</script>

<template>
    <div class='page-container'>
        <LoginComponent>

            <!-- START LOGIN FORM -->
            <template  v-if="loginPageDisplay == 'login'" #content>
                <form>
                    <input
                        type="text"
                        v-model="username"
                        placeholder="username"
                    >
                    <input
                        type="password"
                        v-model="password"
                        placeholder="password"
                    >
                    <button
                        type="submit"
                        @click.prevent="loginHandler"
                    >
                        Log In
                    </button>

                    <p>
                        OR
                    </p>

                    <button
                        type="button"
                        value="register"
                        @click="toggleDisplay('register')"
                    >
                        Register
                    </button>
                </form>
            </template>

            <!-- END LOGIN FORM -->


            <!-- START REGISTER FORM -->

            <template  v-else-if="loginPageDisplay == 'register'" #content>
                <form>
                    <input
                        type="text"
                        v-model="username"
                        placeholder="username"
                    >
                    <input
                        type="email"
                        v-model="email"
                        placeholder="email"
                    >
                    <input
                        type="password"
                        v-model="password"
                        placeholder="password"
                    >
                    <button
                        type="submit"
                        @click.prevent="registerHandler"
                    >
                        Sign Up
                    </button>

                    <p>
                        OR
                    </p>

                    <button
                        type="button"
                        value="login"
                        @click="toggleDisplay('login')"
                    >
                        LOG IN
                    </button>
                </form>
            </template>

            <!-- END REGISTER FORM -->


            <!-- START CONFIRM SUBMISSION -->

            <template  v-else-if="loginPageDisplay == 'ty'" #content>
                <img
                    src="../assets/images/SIGN%20UP%20CHECK.png"
                    alt="email"
                >
                <p class="confirmation_text">
                    You've signed up! <br />Please check your email to verify account.
                </p>
                <br />
                <p
                    class="loginLink"
                    @click="toggleDisplay('login')"
                >
                    LOGIN
                </p>
            </template>

            <!-- END CONFIRM SUBMISSION -->
        </LoginComponent>
    </div>
</template>

<style scoped>
    .page-container {
        display: flex;
        place-items: center;
        height: 100vh;
        background: linear-gradient(0deg, rgba( 252, 178, 0, 0.3 ), rgba( 252, 178, 0, 0.3 )), url('../assets/images/BACKGROUND.jpg');
        background-position: center;
        background-size: cover;
    }

    /* ---------- START FORM ---------- */

    form * {
        border: none;
        border-radius: 10px;
        padding: 1rem;
        margin: 20px auto;
    }

    form p {
        color: var(--white);
        font-size: 22px;
        font-weight: 600;
        text-align: center;
    }

    .confirmation_text,
    .loginLink {
        font-size: 18px;
        text-align: center;
    }

    .loginLink {
        color: var(--white);
        font-size: 20px;
        text-decoration: underline;
    }

    .loginLink:hover {
        cursor: pointer;
    }

    input {
        width: 100%;
        font-size: 20px;
    }

    button {
        display: block;
        min-width: 250px;
        color: var(--main-color);
        font-size: 25px;
        font-weight: 600;
        text-transform: uppercase;
        background: var(--white);
        cursor: pointer;
    }

    button[type=button] {
        min-width: 160px;
        font-size: 16px;
    }

    input:focus {
        outline: none;
    }
    
    /* ---------- END FORM ---------- */

    
    /* ---------- START SUBMISSION ---------- */

    img {
        width: 100%;
        padding: 0 15%;
    }

    /* ---------- START SUBMISSION ---------- */
</style>