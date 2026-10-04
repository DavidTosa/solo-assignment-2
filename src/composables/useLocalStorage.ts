import { ref, watch } from 'vue'

export function useLocalStorage<T>(key: string, initialValue: T) {
  const stored = window.localStorage.getItem(key)
  const value = ref<T>(stored === null ? initialValue : JSON.parse(stored))

  watch(value, newValue => {
    window.localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })

  return value
}
