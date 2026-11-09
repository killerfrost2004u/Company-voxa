import { useEffect, useState, useCallback } from 'react'

export type RouteType = 'home' | 'blog' | 'post' | 'admin'

export interface RouteState {
  type: RouteType
  path: string
  slug?: string
}

export function parseRoute(pathname = window.location.pathname): RouteState {
  const path = pathname.replace(/\/+$/, '') || '/'

  if (path === '' || path === '/') {
    return { type: 'home', path: '/' }
  }

  if (path === '/blog') {
    return { type: 'blog', path: '/blog' }
  }

  if (path.startsWith('/blog/')) {
    const slug = decodeURIComponent(path.slice('/blog/'.length))
    return { type: 'post', path, slug }
  }

  if (path === '/admin' || path === '/admin/blog') {
    return { type: 'admin', path }
  }

  return { type: 'home', path: '/' }
}

export function navigate(to: string) {
  if (typeof window === 'undefined') return

  if (to.startsWith('#')) {
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', `/${to}`)
      window.dispatchEvent(new PopStateEvent('popstate'))
      setTimeout(() => {
        const el = document.querySelector(to)
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      window.history.pushState(null, '', to)
      const el = document.querySelector(to)
      el?.scrollIntoView({ behavior: 'smooth' })
    }
    return
  }

  if (to !== window.location.pathname) {
    window.history.pushState(null, '', to)
    window.dispatchEvent(new PopStateEvent('popstate'))
    window.scrollTo({ top: 0, behavior: 'instant' })
  }
}

export function useRouter() {
  const [route, setRoute] = useState<RouteState>(() => {
    if (typeof window === 'undefined') return { type: 'home', path: '/' }
    return parseRoute(window.location.pathname)
  })

  useEffect(() => {
    const onLocationChange = () => {
      setRoute(parseRoute(window.location.pathname))
    }

    window.addEventListener('popstate', onLocationChange)
    return () => window.removeEventListener('popstate', onLocationChange)
  }, [])

  const push = useCallback((to: string) => {
    navigate(to)
  }, [])

  return {
    route,
    navigate: push,
  }
}
