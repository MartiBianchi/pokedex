import { useEffect, useState } from "react"

export const useDebouncedValue = ( input: string = '', time: number = 500 ) => {

  const [debouncedValue, setDebouncedValue] = useState(input)

  useEffect(() => {

    const timeout = setTimeout(() => {
      setDebouncedValue(input)
    }, time)

    // Reinicia el timeout cada vez que cambia el state
    return () => {
      clearTimeout( timeout )
    }
  }, [input])

  return debouncedValue
}
