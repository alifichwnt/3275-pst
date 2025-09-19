<template>
  <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
    <h2 class="text-2xl font-bold text-slate-900">Area Admin BPS</h2>
    <p class="text-slate-600">Kelola publikasi/tabel data, tanggapi konsultasi & rekomendasi, serta ekspor penilaian.</p>

    <div v-if="!isAdmin" class="mt-6 rounded-xl border bg-white p-6 shadow-sm max-w-md">
      <h3 class="font-semibold text-slate-900">Login BPS</h3>
      <form class="mt-3 grid gap-3" @submit.prevent="login">
        <input v-model="username" placeholder="Username" class="ipt" />
        <input v-model="password" type="password" placeholder="Password" class="ipt" />
        <button class="btn-primary">Masuk</button>
      </form>
      <p class="text-xs text-slate-500 mt-2">Gunakan kredensial yang telah ditentukan oleh administrator.</p>
    </div>

    <div v-else class="mt-6">
      <div class="flex flex-wrap gap-2">
        <button class="tab" :class="{ 'tab-active': tab==='publikasi' }" @click="tab='publikasi'">Publikasi & Tabel</button>
        <button class="tab" :class="{ 'tab-active': tab==='konsultasi' }" @click="tab='konsultasi'">Konsultasi</button>
        <button class="tab" :class="{ 'tab-active': tab==='rekomendasi' }" @click="tab='rekomendasi'">Rekomendasi</button>
        <button class="tab" :class="{ 'tab-active': tab==='penilaian' }" @click="tab='penilaian'">Penilaian</button>
      </div>

      <div v-if="tab==='publikasi'" class="mt-4 rounded-xl border bg-white p-6 shadow-sm">
        <h3 class="font-semibold text-slate-900">Kelola Publikasi/Tabel</h3>
        <form @submit.prevent="addOrUpdate" class="mt-3 grid gap-3 md:grid-cols-4">
          <input v-model="form.title" required placeholder="Judul" class="ipt md:col-span-2" />
          <select v-model="form.category" class="ipt">
            <option>Publikasi</option>
            <option>Tabel Data</option>
          </select>
          <input v-model.number="form.year" type="number" placeholder="Tahun" class="ipt" />
          <button class="btn-primary md:col-span-4 md:w-max">{{ form.id? 'Simpan Perubahan' : 'Tambah' }}</button>
        </form>

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
              <tr v-for="p in publications" :key="p.id" class="border-b last:border-0">
                <td class="py-2 pr-4 font-medium text-slate-900">{{ p.title }}</td>
                <td class="py-2 pr-4">{{ p.category }}</td>
                <td class="py-2 pr-4">{{ p.year }}</td>
                <td class="py-2 flex gap-2">
                  <button class="btn-outline" @click="form = { ...p }">Edit</button>
                  <button class="btn-danger" @click="remove(p.id)">Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-if="tab==='konsultasi'" class="mt-4 rounded-xl border bg-white p-6 shadow-sm">
        <h3 class="font-semibold text-slate-900">Tanggapi Konsultasi</h3>
        <div v-if="!consultations.length" class="text-sm text-slate-500">Belum ada konsultasi.</div>
        <div v-for="c in consultations" :key="c.id" class="mt-4 rounded-lg border p-4">
          <div class="font-medium">{{ c.user.name }} • <span class="text-slate-500">{{ c.topic }}</span></div>
          <p class="text-sm text-slate-700">{{ c.message }}</p>
          <div class="mt-2 grid gap-2">
            <textarea v-model="responses[c.id]" class="ipt" placeholder="Tulis tanggapan..."></textarea>
            <div class="flex gap-2">
              <button class="btn-primary" @click="sendResponse('k', c.id)">Kirim</button>
              <button type="button" class="btn-outline" @click="quick(c.id)">Jawab Cepat</button>
            </div>
          </div>
          <div v-if="c.response" class="mt-2 text-sm text-emerald-700 bg-emerald-50 border rounded p-2">Terkirim: {{ c.response }}</div>
        </div>
      </div>

      <div v-if="tab==='rekomendasi'" class="mt-4 rounded-xl border bg-white p-6 shadow-sm">
        <h3 class="font-semibold text-slate-900">Tanggapi Rekomendasi</h3>
        <div v-if="!recommendations.length" class="text-sm text-slate-500">Belum ada rekomendasi.</div>
        <div v-for="r in recommendations" :key="r.id" class="mt-4 rounded-lg border p-4">
          <div class="font-medium">{{ r.user.name }} • <span class="text-slate-500">{{ r.subject }}</span></div>
          <p class="text-sm text-slate-700">{{ r.message }}</p>
          <div class="mt-2 grid gap-2">
            <textarea v-model="responses[r.id]" class="ipt" placeholder="Tulis tanggapan..."></textarea>
            <button class="btn-primary w-max" @click="sendResponse('r', r.id)">Kirim</button>
          </div>
          <div v-if="r.response" class="mt-2 text-sm text-sky-700 bg-sky-50 border rounded p-2">Terkirim: {{ r.response }}</div>
        </div>
      </div>

      <div v-if="tab==='penilaian'" class="mt-4 rounded-xl border bg-white p-6 shadow-sm">
        <h3 class="font-semibold text-slate-900">Rekap & Ekspor</h3>
        <div class="grid gap-3 md:grid-cols-3">
          <div class="rounded-lg border p-4">
            <div class="text-sm text-slate-500">Total Publikasi</div>
            <div class="text-2xl font-bold">{{ publications.length }}</div>
          </div>
          <div class="rounded-lg border p-4">
            <div class="text-sm text-slate-500">Konsultasi</div>
            <div class="text-2xl font-bold">{{ consultations.length }}</div>
          </div>
          <div class="rounded-lg border p-4">
            <div class="text-sm text-slate-500">Rekomendasi</div>
            <div class="text-2xl font-bold">{{ recommendations.length }}</div>
          </div>
        </div>
        <div class="mt-4 flex flex-wrap gap-2">
          <button class="btn-secondary" @click="exportConsultations">Export Konsultasi (CSV)</button>
          <button class="btn-secondary" @click="exportRecommendations">Export Rekomendasi (CSV)</button>
          <button class="btn-secondary" @click="exportRatings">Export Penilaian (CSV)</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { adminLogin, exportCSV, removePublication, respondConsultation, respondRecommendation, state, addPublication, updatePublication } from '@/store'

const isAdmin = computed(() => state.authUser?.role === 'admin')
const username = ref('')
const password = ref('')

function login() {
  const ok = adminLogin(username.value.trim(), password.value)
  if (!ok) alert('Kredensial salah')
}

const tab = ref<'publikasi' | 'konsultasi' | 'rekomendasi' | 'penilaian'>('publikasi')

const publications = computed(() => state.publications)
const consultations = computed(() => state.consultations)
const recommendations = computed(() => state.recommendations)

const form = reactive({ id: '', title: '', category: 'Publikasi', year: new Date().getFullYear() })

function addOrUpdate() {
  if (!form.title) return
  if (form.id) {
    updatePublication({ id: form.id, title: form.title, category: form.category, year: Number(form.year) })
  } else {
    addPublication({ title: form.title, category: form.category, year: Number(form.year) })
  }
  form.id = ''
  form.title = ''
  form.category = 'Publikasi'
  form.year = new Date().getFullYear()
}

function remove(id: string) {
  removePublication(id)
}

const responses = reactive<Record<string, string>>({})
function sendResponse(type: 'k' | 'r', id: string) {
  const text = responses[id]
  if (!text) return
  if (type === 'k') respondConsultation(id, text)
  else respondRecommendation(id, text)
  responses[id] = ''
}
function quick(id: string) {
  responses[id] = 'Terima kasih. Permintaan Anda telah kami terima dan akan diproses.'
}

function exportConsultations() {
  exportCSV('konsultasi.csv', state.consultations.map(c => ({ id: c.id, tgl: c.createdAt, nama: c.user.name, email: c.user.email, topik: c.topic, pesan: c.message, tanggapan: c.response || '' })))
}
function exportRecommendations() {
  exportCSV('rekomendasi.csv', state.recommendations.map(r => ({ id: r.id, tgl: r.createdAt, nama: r.user.name, email: r.user.email, subjek: r.subject, pesan: r.message, tanggapan: r.response || '' })))
}
function exportRatings() {
  exportCSV('penilaian.csv', state.ratings.map(x => ({ id: x.id, tgl: x.createdAt, layanan: x.serviceType, skor: x.score, komentar: x.comment || '' })))
}
</script>

<style scoped>
.ipt { @apply w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary; }
.btn-primary { @apply inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-white font-semibold shadow hover:bg-primary-600 active:bg-primary-700; }
.btn-secondary { @apply inline-flex items-center justify-center rounded-md bg-slate-900/80 px-4 py-2 text-white font-semibold hover:bg-slate-900; }
.btn-outline { @apply inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-50; }
.btn-danger { @apply inline-flex items-center justify-center rounded-md bg-rose-600 px-3 py-1.5 text-white hover:bg-rose-700; }
.tab { @apply rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50; }
.tab-active { @apply border-primary text-primary bg-primary/10; }
</style>
