<template>
  <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
    <h2 class="text-2xl font-bold text-slate-900">Rekomendasi</h2>
    <p class="text-slate-600">Sampaikan saran atau rekomendasi terkait publikasi maupun data.</p>

    <div class="mt-6 grid gap-6 md:grid-cols-[1.2fr_.8fr] items-start">
      <div class="rounded-xl border bg-white p-6 shadow-sm">
        <form class="grid gap-3" @submit.prevent="submit">
          <div class="grid md:grid-cols-2 gap-3">
            <input v-model="form.name" required placeholder="Nama lengkap" class="ipt" />
            <input v-model="form.email" type="email" required placeholder="Email" class="ipt" />
            <input v-model="form.phone" placeholder="No. HP (opsional)" class="ipt md:col-span-2" />
          </div>
          <input v-model="subject" required placeholder="Judul/Topik Rekomendasi" class="ipt" />
          <textarea
            v-model="message"
            required
            rows="6"
            class="ipt"
            placeholder="Tuliskan rekomendasi Anda..."
          ></textarea>
          <div class="flex gap-2">
            <button class="btn-primary">Kirim</button>
            <button type="button" class="btn-outline" @click="window.print()">
              Cetak / Simpan PDF
            </button>
          </div>
        </form>

        <div v-if="lastResponse" class="mt-6 rounded-lg border bg-sky-50 p-4 text-sky-900">
          <div class="font-semibold">Tanggapan Petugas</div>
          <p class="text-sm mt-1">{{ lastResponse }}</p>
        </div>
      </div>

      <aside class="rounded-xl border bg-white p-6 shadow-sm">
        <h3 class="font-semibold text-slate-900">Penilaian Layanan</h3>
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
      </aside>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { addRating, addRecommendation, respondRecommendation, state } from '@/store'

const form = ref({
  name: state.authUser?.name || '',
  email: state.authUser?.email || '',
  phone: '',
})
const subject = ref('')
const message = ref('')
const lastResponse = ref('')

function submit() {
  addRecommendation({ user: form.value as any, subject: subject.value, message: message.value })
  const id = state.recommendations[state.recommendations.length - 1]?.id
  const auto =
    'Terima kasih atas rekomendasi yang disampaikan. Kami akan menindaklanjuti secepatnya.'
  respondRecommendation(id, auto)
  lastResponse.value = auto
  subject.value = ''
  message.value = ''
  alert('Rekomendasi terkirim.')
}

const score = ref(5)
const comment = ref('')
function rate() {
  addRating({ serviceType: 'rekomendasi', score: score.value, comment: comment.value })
  score.value = 5
  comment.value = ''
  alert('Terima kasih atas penilaiannya!')
}
</script>

<style scoped>
.ipt {
  @apply w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary;
}
.btn-primary {
  @apply inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-white font-semibold shadow hover:bg-primary-600 active:bg-primary-700;
}
.btn-outline {
  @apply inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-1.5 text-slate-700 hover:bg-slate-50;
}
</style>
