'use client'

import * as z from 'zod'
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
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
import { Billboard } from '@prisma/client'
import ImageUpload from '@/components/ui/image-upload'

const formSchema = z.object({
  label: z.string().min(1, 'Name is required'),
  imageUrl: z.string().min(1),
})

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
  initialData: Billboard | null
}

export default function BillboardForm({ initialData }: BillboardFormProps) {
  const origin = useOrigin()
  const { storeId, billboardId } = useParams()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit Billboard' : 'Create Billboard'
  const desc = initialData ? 'Edit your billboard' : 'Create a new billboard'
  const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created.'
  const action = initialData ? 'Save Changes' : 'Create'

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ?? {
      label: '',
      imageUrl: '',
    },
  })

  const onSubmit = async (values: BillboardFormValues) => {
    try {
      setLoading(true)
      if (initialData)
        await axios.patch(`/api/${storeId}/billboards/${billboardId}`, values)
      else await axios.post(`/api/${storeId}/billboards`, values)
      router.refresh()
      toast.success(toastMessage)
    } catch (err: any) {
      toast.error(err.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${storeId}/billboards/${billboardId}`)
      router.refresh()
      router.push('/')
    } catch (err: any) {
      toast.error(
        'Make sure to delete all categories for this billboard first.'
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
        <Heading title={title} desc={desc} />
        {initialData && (
          <Button
            disabled={loading}
            variant={'destructive'}
            size={'sm'}
            onClick={() => setOpen(true)}
          >
            <Trash className='w-4 h-4' />
          </Button>
        )}
      </div>
      <Separator />
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 w-full'
        >
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={url => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Billboard label'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className='ml-auto' type='submit'>
            {action}
          </Button>
        </form>
      </FormProvider>
      <Separator />
      {/* <ApiAlert
        title='NEXT_PUBLIC_API_URL'
        desc={`${origin}/api/stores/${storeId}`}
        variant='public'
      /> */}
    </>
  )
}
