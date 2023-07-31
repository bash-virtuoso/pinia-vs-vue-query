import { watch } from 'vue'
import { useIsWindowFocused } from './useIsWindowFocused'

export const onWindowFocused = (callback: () => void) => {
  const { isWindowFocused } = useIsWindowFocused()

  watch(
    isWindowFocused,
    (isWindowFocused) => {
      if (isWindowFocused) callback()
    },
    { immediate: true },
  )
}
