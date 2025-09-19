import { ref } from 'vue'

export type Route =
  | 'home'
  | 'layanan'
  | 'layanan/perpustakaan'
  | 'layanan/konsultasi'
  | 'layanan/rekomendasi'
  | 'admin'
  | 'admin/publikasi'
  | 'admin/konsultasi'
  | 'admin/rekomendasi'
  | 'admin/penilaian'

function parseHash(): Route {
  const h = (location.hash || '').replace(/^#\/?/, '') as Route
  return (h && (h as Route)) || 'home'
}

export const route = ref<Route>(parseHash())

export function go(to: Route) {
  route.value = to
  const hash = to === 'home' ? '' : `#/${to}`
  history.replaceState(null, '', `${location.pathname}${hash}`)
}

window.addEventListener('hashchange', () => {
  route.value = parseHash()
})
