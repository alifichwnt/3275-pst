<template>
  <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
    <div class="grid md:grid-cols-[1.2fr_.8fr] gap-10 items-start">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Pilih Layanan</h2>
        <p class="text-slate-600 mt-1">Silakan pilih kebutuhan Anda. Untuk melanjutkan, masuk sebagai tamu terlebih dahulu.</p>
        <div class="mt-6 grid gap-6 md:grid-cols-3">
          <a href="#/layanan/perpustakaan" class="card">
            <div class="card-icon bg-primary/10 text-primary">📚</div>
            <div class="card-title">Perpustakaan</div>
            <p class="card-desc">Publikasi & tabel data.</p>
          </a>
          <a href="#/layanan/konsultasi" class="card">
            <div class="card-icon bg-emerald-100 text-emerald-600">💬</div>
            <div class="card-title">Konsultasi</div>
            <p class="card-desc">Konsultasi kebutuhan data.</p>
          </a>
          <a href="#/layanan/rekomendasi" class="card">
            <div class="card-icon bg-amber-100 text-amber-600">📝</div>
            <div class="card-title">Rekomendasi</div>
            <p class="card-desc">Saran atau usulan data.</p>
          </a>
        </div>
      </div>
      <div class="rounded-xl border bg-white p-6 shadow-sm">
        <h3 class="font-semibold text-slate-900">Masuk sebagai Tamu</h3>
        <p class="text-sm text-slate-600">Tidak perlu akun. Hanya isi nama dan email untuk melanjutkan proses layanan.</p>
        <form @submit.prevent="submitGuest" class="mt-4 grid gap-3">
          <input v-model="name" required placeholder="Nama lengkap" class="ipt" />
          <input v-model="email" type="email" required placeholder="Email" class="ipt" />
          <button class="btn-primary">Masuk</button>
        </form>
        <p class="text-xs text-slate-500 mt-3">Data Anda digunakan untuk keperluan layanan dan pelaporan.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { guestLogin } from '@/store'

const name = ref('')
const email = ref('')

function submitGuest() {
  guestLogin(name.value.trim(), email.value.trim())
  alert('Berhasil masuk sebagai tamu.')
}
</script>

<style scoped>
.card { @apply rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition block; }
.card-icon { @apply h-12 w-12 grid place-items-center rounded-lg text-xl; }
.card-title { @apply mt-4 font-semibold text-slate-900; }
.card-desc { @apply text-sm text-slate-600 mt-1; }
.ipt { @apply w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary; }
.btn-primary { @apply inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-white font-semibold shadow hover:bg-primary-600 active:bg-primary-700; }
</style>
