<template>
  <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
    <h2 class="text-2xl font-bold text-slate-900">Perpustakaan</h2>
    <p class="text-slate-600">Akses publikasi dan tabel data BPS Kota Bekasi.</p>

    <div v-if="!isGuest" class="mt-6 rounded-xl border bg-amber-50 p-4">
      <p class="text-sm text-amber-800">Anda belum masuk sebagai tamu. Silakan isi data diri singkat untuk melanjutkan.</p>
      <form @submit.prevent="saveGuest" class="mt-3 grid gap-3 md:grid-cols-2">
        <input v-model="name" required placeholder="Nama lengkap" class="ipt" />
        <input v-model="email" type="email" required placeholder="Email" class="ipt" />
        <input v-model="phone" placeholder="No. HP (opsional)" class="ipt md:col-span-2" />
        <button class="btn-primary md:w-max">Simpan & Lanjutkan</button>
      </form>
    </div>

    <div class="mt-8 grid gap-6 md:grid-cols-[1.2fr_.8fr] items-start">
      <div>
        <div class="rounded-xl border bg-white p-6 shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center gap-3">
            <input v-model="q" placeholder="Cari publikasi atau tabel data..." class="ipt flex-1" />
            <select v-model="category" class="ipt w-full sm:w-48">
              <option value="">Semua Kategori</option>
              <option>Publikasi</option>
              <option>Tabel Data</option>
            </select>
            <select v-model.number="year" class="ipt w-full sm:w-40">
              <option :value="0">Semua Tahun</option>
              <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
            </select>
          </div>

          <div class="mt-4 overflow-x-auto">
            <table class="min-w-full text-sm">
              <thead>
                <tr class="text-left text-slate-500 border-b">
                  <th class="py-2 pr-4">Judul</th>
                  <th class="py-2 pr-4">Kategori</th>
                  <th class="py-2 pr-4">Tahun</th>
                  <th class="py-2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="p in filtered" :key="p.id" class="border-b last:border-0">
                  <td class="py-2 pr-4 font-medium text-slate-900">{{ p.title }}</td>
                  <td class="py-2 pr-4">{{ p.category }}</td>
                  <td class="py-2 pr-4">{{ p.year }}</td>
                  <td class="py-2">
                    <button class="btn-outline" @click="select(p)">Pilih</button>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="!filtered.length" class="text-sm text-slate-500 py-6 text-center">Tidak ada data.</div>
          </div>

          <div class="mt-4 flex gap-2">
            <button class="btn-secondary" @click="onExportCSV">Export CSV</button>
            <button class="btn-outline" @click="window.print()">Cetak / Simpan PDF</button>
          </div>
        </div>

        <div class="print:block hidden mt-6">
          <h3 class="font-semibold text-slate-900">Daftar Terpilih</h3>
          <ul class="list-disc list-inside text-sm">
            <li v-for="p in selected" :key="p.id">{{ p.title }} ({{ p.category }} • {{ p.year }})</li>
          </ul>
        </div>
      </div>

      <aside class="rounded-xl border bg-white p-6 shadow-sm">
        <h3 class="font-semibold text-slate-900">Ringkasan</h3>
        <p class="text-sm text-slate-600">Pilih publikasi/tabel data yang Anda butuhkan.</p>
        <ul class="mt-3 space-y-2 text-sm">
          <li v-for="p in selected" :key="p.id" class="flex items-start justify-between gap-3">
            <div>
              <div class="font-medium text-slate-900">{{ p.title }}</div>
              <div class="text-slate-500">{{ p.category }} • {{ p.year }}</div>
            </div>
            <button class="text-rose-600 hover:underline" @click="remove(p.id)">Hapus</button>
          </li>
        </ul>
        <div v-if="!selected.length" class="text-sm text-slate-500 mt-2">Belum ada pilihan.</div>

        <div class="mt-6">
          <h4 class="font-medium text-slate-900">Beri Penilaian</h4>
          <form class="mt-2 grid gap-2" @submit.prevent="rate">
            <select v-model.number="score" class="ipt">
              <option :value="5">Sangat Puas (5)</option>
              <option :value="4">Puas (4)</option>
              <option :value="3">Cukup (3)</option>
              <option :value="2">Kurang (2)</option>
              <option :value="1">Buruk (1)</option>
            </select>
            <textarea v-model="comment" class="ipt" placeholder="Komentar (opsional)"></textarea>
            <button class="btn-primary">Kirim Penilaian</button>
          </form>
        </div>
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { state, guestLogin, exportCSV, addRating, Publication } from '@/store'

const isGuest = computed(() => state.authUser?.role === 'guest')
const name = ref('')
const email = ref('')
const phone = ref('')

function saveGuest() {
  guestLogin(name.value.trim(), email.value.trim())
}

const q = ref('')
const category = ref('')
const year = ref(0)
const years = Array.from({ length: 8 }, (_, i) => new Date().getFullYear() - i)

const filtered = computed(() => {
  return state.publications.filter((p) => {
    const okQ = !q.value || p.title.toLowerCase().includes(q.value.toLowerCase())
    const okC = !category.value || p.category === category.value
    const okY = !year.value || p.year === year.value
    return okQ && okC && okY
  })
})

const selected = ref<Publication[]>([])
function select(p: Publication) {
  if (!selected.value.find((x) => x.id === p.id)) selected.value.push(p)
}
function remove(id: string) {
  selected.value = selected.value.filter((x) => x.id !== id)
}

function onExportCSV() {
  exportCSV('publikasi_terpilih.csv', selected.value.map((x) => ({ judul: x.title, kategori: x.category, tahun: x.year })))
}

const score = ref(5)
const comment = ref('')
function rate() {
  addRating({ serviceType: 'perpustakaan', score: score.value, comment: comment.value })
  score.value = 5
  comment.value = ''
  alert('Terima kasih atas penilaiannya!')
}
</script>

<style scoped>
.ipt { @apply w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary; }
.btn-primary { @apply inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-white font-semibold shadow hover:bg-primary-600 active:bg-primary-700; }
.btn-secondary { @apply inline-flex items-center justify-center rounded-md bg-slate-900/80 px-4 py-2 text-white font-semibold hover:bg-slate-900; }
.btn-outline { @apply inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-50; }
@media print { .print\:block { display: block !important; } }
</style>
