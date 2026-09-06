import { forwardRef, type InputHTMLAttributes } from 'react'
import { Search } from 'lucide-react'

export const SearchInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function SearchInput({ className = '', ...props }, ref) {
  return <label className={`relative block ${className}`}><Search aria-hidden="true" size={15} className="absolute start-3 top-1/2 -translate-y-1/2 text-muted" /><input ref={ref} className="ff-input ps-9" type="search" {...props} /></label>
})
