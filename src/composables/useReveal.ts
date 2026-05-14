import { onMounted, onBeforeUnmount } from 'vue'

/**
 * Adds `.in` to any element with `.reveal` once it scrolls into view.
 * Mount once at the app root (or any persistent component).
 */
export function useReveal() {
  let observer: IntersectionObserver | null = null
  let mo: MutationObserver | null = null

  const observe = (el: Element) => {
    if (!observer) return
    if (!el.classList.contains('in')) observer.observe(el)
  }

  onMounted(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            observer?.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.05 },
    )

    document.querySelectorAll('.reveal').forEach(observe)

    mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.classList?.contains('reveal')) observe(node)
          node.querySelectorAll?.('.reveal').forEach(observe)
        })
      }
    })
    mo.observe(document.body, { childList: true, subtree: true })
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    mo?.disconnect()
  })
}
