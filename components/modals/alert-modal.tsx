'use client'

import useIsHydrated from '@/hooks/useIsHydrated'
import Modal from '../modal'
import { Button } from '../ui/button'

interface AlertModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}

export default function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
}: AlertModalProps) {
  if (useIsHydrated())
    return (
      <Modal
        title='Are you sure?'
        desc='This action can not be undone'
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
          <Button disabled={loading} onClick={onClose} variant='outline'>
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={loading} variant='destructive'>
            Confirm
          </Button>
        </div>
      </Modal>
    )
}
