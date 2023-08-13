'use client'

import { Store } from '@prisma/client'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useStoreModal } from '@/hooks/useStoreModal'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command'

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[]
}

export default function StoreSwitcher({
  items = [],
  className,
}: StoreSwitcherProps) {
  const storeModal = useStoreModal()
  const { storeId } = useParams()
  const router = useRouter()

  const formatedItems = items.map(({ name, id }) => ({
    label: name,
    value: id,
    curr: id === storeId,
  }))

  const currStore = formatedItems.find(({ curr }) => curr)

  const [open, setOpen] = useState(false)

  const onStoreSelect = (store: {
    value: string
    curr: boolean
    label: string
  }) => {
    setOpen(false)
    router.push(`/${store.value}`)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          size={'sm'}
          role='combobox'
          aria-expanded={open}
          aria-label='Select store'
          className={cn('w-[200px] justify-between', className)}
        >
          <StoreIcon className='mr-2 h-4 w-4' />
          {currStore?.label}
          <ChevronsUpDown className='ml-auto shrink-0 opacity-50 h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search store' />
            <CommandEmpty>No Store Found.</CommandEmpty>
            <CommandGroup heading='Stores'>
              {formatedItems.map(store => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                >
                  <StoreIcon className='mr-2 h-4 w-4' />
                  {store.label}
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      store.curr ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false)
                  storeModal.onOpen()
                }}
              >
                <PlusCircle className='mr-2 h-5 w-5' />
                Create a new store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
