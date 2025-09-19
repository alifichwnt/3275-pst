<template>
  <section>
    <div
      class="relative isolate overflow-hidden bg-gradient-to-br from-primary/15 via-sky-50 to-emerald-50"
    >
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div class="grid md:grid-cols-2 items-center gap-10">
          <div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Pelayanan Statistik Terpadu
            </h2>
            <p class="mt-3 text-slate-600 text-lg">
              Portal layanan terpadu Badan Pusat Statistik Kota Bekasi. Akses publikasi, konsultasi,
              dan rekomendasi statistik dalam satu tempat.
            </p>
            <div class="mt-6 flex gap-3">
              <a href="#/layanan" class="btn-primary">Mulai Layanan</a>
              <a href="#/admin" class="btn-outline">Area Admin</a>
            </div>
            <dl class="mt-10 grid grid-cols-2 gap-6 text-sm">
              <div class="rounded-lg border bg-white p-4">
                <dt class="text-slate-500">Publikasi & Tabel Data</dt>
                <dd class="mt-1 font-semibold text-slate-900">Diakses cepat</dd>
              </div>
              <div class="rounded-lg border bg-white p-4">
                <dt class="text-slate-500">Konsultasi & Rekomendasi</dt>
                <dd class="mt-1 font-semibold text-slate-900">Responsif</dd>
              </div>
            </dl>
          </div>
          <div class="relative">
            <div class="rounded-2xl bg-white shadow-xl border p-6">
              <h3 class="font-semibold text-slate-900">Alur Layanan Singkat</h3>
              <ol class="mt-3 space-y-2 text-sm text-slate-700 list-decimal list-inside">
                <li>Login sebagai Tamu atau Akun BPS</li>
                <li>Pilih jenis layanan: Perpustakaan, Konsultasi, atau Rekomendasi</li>
                <li>Isi data diri dan kebutuhan</li>
                <li>Dapatkan hasil, unduh, dan beri penilaian</li>
              </ol>
              <div class="mt-4 text-xs text-slate-500">
                Berdasarkan flowchart & use case yang disediakan.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <h3 class="text-xl font-semibold text-slate-900">Layanan Utama</h3>
      <div class="mt-6 grid gap-6 md:grid-cols-3">
        <div class="card" @click="$emit('go', 'layanan/perpustakaan')">
          <div class="card-icon bg-primary/10 text-primary">📚</div>
          <div class="card-title">Perpustakaan</div>
          <p class="card-desc">Akses publikasi dan tabel data resmi BPS Kota Bekasi.</p>
        </div>
        <div class="card" @click="$emit('go', 'layanan/konsultasi')">
          <div class="card-icon bg-emerald-100 text-emerald-600">💬</div>
          <div class="card-title">Konsultasi</div>
          <p class="card-desc">Konsultasikan kebutuhan data dan analisis statistik Anda.</p>
        </div>
        <div class="card" @click="$emit('go', 'layanan/rekomendasi')">
          <div class="card-icon bg-amber-100 text-amber-600">📝</div>
          <div class="card-title">Rekomendasi</div>
          <p class="card-desc">Ajukan rekomendasi terkait publikasi atau data statistik.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped>
.card {
  @apply cursor-pointer rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition;
}
.card-icon {
  @apply h-12 w-12 grid place-items-center rounded-lg text-xl;
}
.card-title {
  @apply mt-4 font-semibold text-slate-900;
}
.card-desc {
  @apply text-sm text-slate-600 mt-1;
}
.btn-primary {
  @apply inline-flex items-center rounded-md bg-primary px-4 py-2 text-white shadow hover:bg-primary-600 active:bg-primary-700;
}
.btn-outline {
  @apply inline-flex items-center rounded-md border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50;
}
</style>
