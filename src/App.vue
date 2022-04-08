<script setup lang="ts"></script>

<template>
  <div
    class="font-body text-app-white w-screen min-h-screen bg-gradient-to-b from-app-bg1 to-app-bg2 pt-8"
  >
    <div class="container my-8 mx-auto flex space-x-12 px-3 sm:px-6">
      <router-link class="text-2xl lg:text-3xl uppercase" to="/"
        >Video Games</router-link
      >
      <router-link class="text-2xl lg:text-3xl uppercase" to="/contact"
        >Contact</router-link
      >
    </div>
    <router-view />
  </div>
</template>

<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  @apply font-heading;
}
p {
  @apply text-app-text-default;
}
</style>
