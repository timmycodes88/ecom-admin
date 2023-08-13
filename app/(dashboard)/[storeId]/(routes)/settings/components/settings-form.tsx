'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Store } from '@prisma/client'
import { Trash } from 'lucide-react'

interface SettingFormProps {
  initialData: Store
}

export default function SettingsForm({ initialData }: SettingFormProps) {
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading title='Settings' desc="Manage your store's settings" />
        <Button variant={'destructive'} size={'sm'} onClick={() => {}}>
          <Trash className='w-4 h-4' />
        </Button>
      </div>
      <Separator />
    </>
  )
}
