import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AddBookmark() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="https://" />
      <Button type="submit">Add url</Button>
    </div>
  )
}
