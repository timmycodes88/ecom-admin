'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

export default function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname()
  const params = useParams()
  const routes = [
    {
      href: `/${params.storeId}`,
      label: 'Dashboard',
      isActive: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: 'Billboards',
      isActive: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: 'Settings',
      isActive: pathname === `/${params.storeId}/settings`,
    },
  ]
  return (
    <nav className={cn(className, 'flex items-center space-x-4 lg:space-x-6')}>
      {routes.map(({ href, label, isActive }) => (
        <Link
          key={href}
          href={href}
          className={cn(
            'text-sm font-md transition-colors hover:text-primary hover:underline',
            isActive
              ? 'text-black font-semibold dark:text-white '
              : 'text-muted-foreground'
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
