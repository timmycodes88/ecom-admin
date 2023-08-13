'use client'

import * as z from 'zod'
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Store } from '@prisma/client'
import { Trash } from 'lucide-react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import AlertModal from '@/components/modals/alert-modal'
import ApiAlert from '@/components/ui/api-alert'
import useOrigin from '@/hooks/use-origin'

interface SettingFormProps {
  initialData: Store
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
})

type SettingFormValues = z.infer<typeof formSchema>

export default function SettingsForm({ initialData }: SettingFormProps) {
  const origin = useOrigin()
  const { storeId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })

  const onSubmit = async (values: SettingFormValues) => {
    try {
      setLoading(true)
      await axios.patch(`/api/stores/${storeId}`, values)
      router.refresh()
      toast.success('Store updated.')
    } catch (err: any) {
      toast.error(err.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${storeId}`)
      router.refresh()
      router.push('/')
    } catch (err: any) {
      toast.error(
        err.message ?? 'Make sure to delete all products and categories first.'
      )
    } finally {
      setOpen(false)
      setLoading(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading title='Settings' desc="Manage your store's settings" />
        <Button
          disabled={loading}
          variant={'destructive'}
          size={'sm'}
          onClick={() => setOpen(true)}
        >
          <Trash className='w-4 h-4' />
        </Button>
      </div>
      <Separator />
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Store name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            Save Changes
          </Button>
        </form>
      </FormProvider>
      <Separator />
      <ApiAlert
        title='NEXT_PUBLIC_API_URL'
        desc={`${origin}/api/stores/${storeId}`}
        variant='public'
      />
    </>
  )
}
