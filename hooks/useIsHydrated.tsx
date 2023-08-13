import { useState, useEffect } from 'react'

export default function useIsHydrated() {
  const [isHydrate, setIsHydrate] = useState<boolean>(false)

  useEffect(() => {
    setIsHydrate(true)
  }, [])

  return isHydrate
}
