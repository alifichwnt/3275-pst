<script setup lang="ts">
import HeaderNav from '@/components/HeaderNav.vue'
import FooterBar from '@/components/FooterBar.vue'
import HomeView from '@/views/HomeView.vue'
import LayananHub from '@/views/LayananHub.vue'
import LibraryView from '@/views/LibraryView.vue'
import KonsultasiView from '@/views/KonsultasiView.vue'
import RekomendasiView from '@/views/RekomendasiView.vue'
import AdminView from '@/views/AdminView.vue'
import { route, go } from '@/router'
</script>

<template>
  <div class="min-h-svh bg-slate-50 text-slate-800">
    <HeaderNav @openGuest="go('layanan')" @openAdmin="go('admin')" />

    <main>
      <component
        :is="
          route === 'home'
            ? HomeView
            : route === 'layanan'
              ? LayananHub
              : route === 'layanan/perpustakaan'
                ? LibraryView
                : route === 'layanan/konsultasi'
                  ? KonsultasiView
                  : route === 'layanan/rekomendasi'
                    ? RekomendasiView
                    : AdminView
        "
        @go="go"
      />
    </main>

    <FooterBar />
  </div>
</template>

<style scoped></style>
