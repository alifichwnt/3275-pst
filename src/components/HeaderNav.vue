<template>
  <header
    class="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="h-10 w-10 rounded-md bg-white text-white grid place-items-center font-bold overflow-hidden shadow">
          <img src="/images/BPS.png" alt="Profile" class="h-full w-full object-cover" />
        </div>
        <div>
          <h1 class="text-slate-900 font-semibold leading-tight">Pelayanan Statistik Terpadu</h1>
          <p class="text-xs text-slate-500 -mt-0.5">BPS Kota Bekasi</p>
        </div>
      </div>
      <nav class="hidden md:flex items-center gap-6 text-sm">
        <a href="#/home" @click.prevent="goRoute('home')" :class="linkClass('home')">Beranda</a>
        <a href="#/layanan" @click.prevent="goRoute('layanan')" :class="linkClass('layanan')">Layanan</a>
        <a href="#/admin" @click.prevent="goRoute('admin')" :class="linkClass('admin')">Admin</a>
      </nav>
      <div class="flex items-center gap-2">
        <template v-if="authUser">
          <span class="text-xs text-slate-600 hidden sm:inline">{{ authUser.name }} • {{ authUser.role }}</span>
          <button class="btn-secondary" @click="onLogout">Keluar</button>
        </template>
        <template v-else>
          <button class="btn-outline" @click="$emit('openGuest')">Masuk Tamu</button>
          <button class="btn-primary" @click="$emit('openAdmin')">Login BPS</button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { route, go } from '@/router'
import { state, logout } from '@/store'

const current = computed(() => route.value)
const authUser = computed(() => state.authUser)

function linkClass(name: string) {
  const active = current.value.startsWith(name as any)
  return [
    'text-slate-600 hover:text-slate-900 font-medium transition-colors',
    active ? 'text-slate-900' : 'text-slate-600',
  ]
}

function goRoute(r: any) {
  go(r)
}

function onLogout() {
  logout()
}
</script>

<style scoped>
.btn-primary {
  @apply inline-flex items-center rounded-md bg-primary px-3 py-2 text-white shadow hover:bg-primary-600 active:bg-primary-700 transition-colors text-sm font-semibold;
}

.btn-secondary {
  @apply inline-flex items-center rounded-md bg-slate-900/80 px-3 py-2 text-white hover:bg-slate-900 transition-colors text-sm font-semibold;
}

.btn-outline {
  @apply inline-flex items-center rounded-md border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-50 transition-colors text-sm font-semibold;
}
</style>
