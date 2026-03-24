import type { Tag } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface TagBadgeProps {
  tag: Tag
}

export default function TagBadge({ tag }: TagBadgeProps) {
  const tagName = getMetafieldValue(tag.metadata?.name) || tag.title

  return (
    <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 rounded-md">
      #{tagName}
    </span>
  )
}