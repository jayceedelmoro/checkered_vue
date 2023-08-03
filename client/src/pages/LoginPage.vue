<script setup>
    import { ref } from 'vue';
  import LoginComponent from '../components/LoginComponent.vue';

  let loginPageDisplay = ref('ty');

  const toggleDisplay = (event) => {
    loginPageDisplay.value = event.target.value;
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
                        placeholder="username"
                    >
                    <input
                        type="password"
                        placeholder="password"
                    >
                    <button
                        type="submit"
                        @click=""
                    >
                        Log In
                    </button>

                    <p>
                        OR
                    </p>

                    <button
                        type="button"
                        value="register"
                        @click="toggleDisplay"
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
                        placeholder="username"
                    >
                    <input
                        type="email"
                        placeholder="email"
                    >
                    <input
                        type="password"
                        placeholder="password"
                    >
                    <button
                        type="submit"
                        @click=""
                    >
                        Sign Up
                    </button>

                    <p>
                        OR
                    </p>

                    <button
                        type="button"
                        value="login"
                        @click="toggleDisplay"
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
                <p>
                    You've signed up! <br />Please check your email to verify account.
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