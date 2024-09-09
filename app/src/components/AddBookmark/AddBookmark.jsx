import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useAddBookmark from "@/hooks/useAddBookmark"
import { useState } from "react";
import { BeatLoader } from "react-spinners";

export default function AddBookmark() {
  const {bookmarkLoading, AddBookmark}= useAddBookmark();

  const [url, setUrl] = useState('');
  const addBookmark = async () => {
     await AddBookmark(url);
      setUrl('');
      window.location.reload();
    
  }
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="https://"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        disabled={bookmarkLoading}
        className='border-zinc-600'
       />
      <Button type="submit"
       onClick={
        addBookmark
      } disabled={bookmarkLoading}
      >
        {bookmarkLoading ? <BeatLoader size={8} color="white" /> : "Add Url"}
      </Button>
    </div>
  )
}
