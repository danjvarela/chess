import { useMutation } from "react-query"
import { CollectionHook, DocumentHook } from "react-firebase-hooks/firestore"

export const pickMutationProps = <T, U, V, X>(
  mutation: ReturnType<typeof useMutation<T, U, V, X>>
) => {
  const { mutate, data, isLoading, error } = mutation
  return { mutate, data, isLoading, error }
}

export const pickDocumentHookProps = <T>(
  firebaseHookValue: DocumentHook<T>
) => {
  const [data, isLoading, error] = firebaseHookValue
  return { data, isLoading, error }
}

export const pickCollectionHookProps = <T>(
  firebaseHookValue: CollectionHook<T>
) => {
  const [data, isLoading, error] = firebaseHookValue
  return { data, isLoading, error }
}
