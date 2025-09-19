import { reactive, watch } from 'vue'

export type Role = 'guest' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

export interface Publication {
  id: string
  title: string
  category: string
  year: number
  url?: string
}

export interface PersonForm {
  nik?: string
  name: string
  email: string
  phone?: string
  institution?: string
}

export interface Consultation {
  id: string
  createdAt: string
  user: PersonForm
  topic: string
  message: string
  response?: string
}

export interface Recommendation {
  id: string
  createdAt: string
  user: PersonForm
  subject: string
  message: string
  response?: string
}

export interface Rating {
  id: string
  createdAt: string
  serviceType: 'perpustakaan' | 'konsultasi' | 'rekomendasi'
  score: number
  comment?: string
}

export interface State {
  authUser: User | null
  publications: Publication[]
  consultations: Consultation[]
  recommendations: Recommendation[]
  ratings: Rating[]
}

const STORAGE_KEY = 'pst-bps-bekasi'

function uid(prefix = ''): string {
  return `${prefix}${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36).slice(-4)}`
}

function loadState(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as State
  } catch {}
  const initial: State = {
    authUser: null,
    publications: [
      { id: uid('pub_'), title: 'Statistik Daerah Kota Bekasi 2024', category: 'Publikasi', year: 2024 },
      { id: uid('pub_'), title: 'Produk Domestik Regional Bruto (PDRB) Kota Bekasi 2023', category: 'Tabel Data', year: 2023 },
      { id: uid('pub_'), title: 'Indeks Pembangunan Manusia Kota Bekasi 2022', category: 'Publikasi', year: 2022 },
    ],
    consultations: [],
    recommendations: [],
    ratings: [],
  }
  return initial
}

export const state = reactive<State>(loadState())

watch(
  () => state,
  () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state)),
  { deep: true }
)

export function guestLogin(name: string, email: string): User {
  const user: User = { id: uid('usr_'), name, email, role: 'guest' }
  state.authUser = user
  return user
}

export function adminLogin(username: string, password: string): boolean {
  // Simple mock auth: change credentials here if needed
  if (username === 'bpsbekasi' && password === 'admin123') {
    state.authUser = { id: uid('adm_'), name: 'Admin BPS', email: 'admin@bps.bekasi', role: 'admin' }
    return true
  }
  return false
}

export function logout() {
  state.authUser = null
}

export function addPublication(p: Omit<Publication, 'id'>) {
  state.publications.push({ ...p, id: uid('pub_') })
}

export function updatePublication(p: Publication) {
  const idx = state.publications.findIndex((x) => x.id === p.id)
  if (idx >= 0) state.publications[idx] = { ...p }
}

export function removePublication(id: string) {
  state.publications = state.publications.filter((x) => x.id !== id)
}

export function addConsultation(c: Omit<Consultation, 'id' | 'createdAt'>) {
  state.consultations.push({ ...c, id: uid('kon_'), createdAt: new Date().toISOString() })
}

export function respondConsultation(id: string, response: string) {
  const item = state.consultations.find((x) => x.id === id)
  if (item) item.response = response
}

export function addRecommendation(r: Omit<Recommendation, 'id' | 'createdAt'>) {
  state.recommendations.push({ ...r, id: uid('rek_'), createdAt: new Date().toISOString() })
}

export function respondRecommendation(id: string, response: string) {
  const item = state.recommendations.find((x) => x.id === id)
  if (item) item.response = response
}

export function addRating(rt: Omit<Rating, 'id' | 'createdAt'>) {
  state.ratings.push({ ...rt, id: uid('rat_'), createdAt: new Date().toISOString() })
}

export function exportCSV(filename: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return
  const headers = Object.keys(rows[0])
  const csv = [headers.join(','), ...rows.map((r) => headers.map((h) => JSON.stringify((r as any)[h] ?? '')).join(','))].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  link.click()
  URL.revokeObjectURL(link.href)
}
