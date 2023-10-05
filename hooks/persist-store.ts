import { useEffect } from "react"
import { StoreApi, create } from "zustand"

const usePersistStore = <T, U>(
  store: ReturnType<typeof create<StoreApi<T>>> & {
    persist: { rehydrate: () => void }
  },
  callback: (state: T) => U
) => {
  const result = store(callback)

  useEffect(() => {
    if (store.persist && typeof store.persist.rehydrate === "function") {
      store.persist.rehydrate()
    }
  }, [])

  return result
}

export default usePersistStore
