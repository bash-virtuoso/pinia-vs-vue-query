import { ref, watchEffect } from 'vue'

export const useIsWindowFocused = () => {
  const computeIsWindowFocused = () => 'visible' === document.visibilityState

  const isWindowFocused = ref(computeIsWindowFocused())

  const listener = () => {
    isWindowFocused.value = computeIsWindowFocused()
  }

  watchEffect((onCleanup) => {
    document.addEventListener('visibilitychange', listener)
    document.addEventListener('focus', listener)

    onCleanup(() => {
      document.removeEventListener('visibilitychange', listener)
      document.removeEventListener('focus', listener)
    })
  })

  return { isWindowFocused }
}
