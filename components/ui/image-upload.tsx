'use client'

import useIsHydrated from '@/hooks/useIsHydrated'
import { Button } from './button'
import { ImagePlus, Trash } from 'lucide-react'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'

interface ImageUploadProps {
  disabled?: boolean
  onChange: (value: string) => void
  onRemove: (value: string) => void
  value: string[]
}

export default function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url)
  }

  if (useIsHydrated())
    return (
      <div>
        <div className='mb-4 flex items-center gap-4'>
          {value.map(url => (
            <div
              key={url}
              className='relative w-[200px] h-[200px] rounded-md overflow-hidden'
            >
              <div
                className='z-10 absolute top-2 right-2'
                onClick={() => onRemove(url)}
              >
                <Button size={'icon'} variant='destructive'>
                  <Trash className='w-4 h-4' />
                </Button>
              </div>
              <Image src={url} alt='billboard' fill className='object-cover' />
            </div>
          ))}
        </div>
        <CldUploadWidget onUpload={onUpload} uploadPreset='gywozrho'>
          {({ open }) => {
            return (
              <Button
                type='submit'
                variant={'secondary'}
                onClick={() => open()}
                disabled={disabled}
              >
                <ImagePlus className='w-4 h-4 mr-2' />
                Upload an Image
              </Button>
            )
          }}
        </CldUploadWidget>
      </div>
    )
}
