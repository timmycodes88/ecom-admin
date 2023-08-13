'use client'

import { StoreModal } from '@/components/modals/StoreModal'
import useIsHydrated from '@/hooks/useIsHydrated'

export const ModalProvider = () => {
  if (useIsHydrated()) return <StoreModal />
}
