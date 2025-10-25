import { Search } from "lucide-react"

import { Label } from "@/components/ui/label"
import { SidebarInput } from "@/components/ui/sidebar"
import { useId, type ComponentProps } from "react"

export function SearchForm({ ...props }: ComponentProps<"form">) {
  const id = useId();
  return (
    <form {...props}>
      <div className="relative">
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <SidebarInput
          id={id}
          placeholder="Type to search..."
          className="h-8 pl-7"
        />
        <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-2 size-4 select-none opacity-50" />
      </div>
    </form>
  )
}
