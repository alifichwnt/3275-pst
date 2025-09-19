<template>
  <footer class="mt-16 border-t border-slate-200 bg-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid gap-6 md:grid-cols-3">
      <div>
        <div class="flex items-center gap-3">
          <div class="h-10 w-10 rounded-md bg-primary text-white grid place-items-center font-bold">PST</div>
          <div class="text-slate-800 font-semibold">BPS Kota Bekasi</div>
        </div>
        <p class="text-sm text-slate-600 mt-3">Pelayanan Statistik Terpadu untuk publik dan instansi, menyediakan akses publikasi, konsultasi, dan rekomendasi statistik.</p>
      </div>
      <div>
        <h3 class="font-semibold text-slate-800 mb-2">Kontak</h3>
        <ul class="text-sm text-slate-600 space-y-1">
          <li>Email: bekasikota@bps.go.id</li>
          <li>Telepon: (021) 123-4567</li>
          <li>Alamat: Jl. KH. Agus Salim, Kota Bekasi</li>
        </ul>
      </div>
      <div>
        <h3 class="font-semibold text-slate-800 mb-2">Tautan</h3>
        <ul class="text-sm text-slate-600 space-y-1">
          <li><a class="hover:text-primary" href="#/layanan">Layanan</a></li>
          <li><a class="hover:text-primary" href="#/admin">Admin</a></li>
          <li><a class="hover:text-primary" href="#/home">Beranda</a></li>
        </ul>
      </div>
    </div>
    <div class="text-center text-xs text-slate-500 py-4 border-t border-slate-100">© {{ new Date().getFullYear() }} BPS Kota Bekasi • PST</div>
  </footer>
</template>

<script setup lang="ts"></script>

<style scoped></style>
