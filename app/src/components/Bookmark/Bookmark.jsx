import './Bookmark.css';
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { TiPin } from "react-icons/ti";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
import useDeleteBookmark from '@/hooks/useDeleteBookmark';
import usePinBookmark from '@/hooks/usePinBookmark';
import useAddTags from '@/hooks/useAddTags';


function Bookmark({
    title, url, description, image, tags, domain ,id, pinned
}){
  const {deleteBookmarkLoading, DeleteBookmark} = useDeleteBookmark();
  const {tagsLoading, AddTags} = useAddTags();
  const {PinBookmark} = usePinBookmark();
  const [tagInputs, setTagInputs] = useState('');
  const { toast} = useToast();

  const handlePin = async()=>{
    await PinBookmark(id);
    window.location.reload(); 
  }

  const handleAddTags = async()=>{
    const tagsArray= tagInputs.split(',').map(tag=>tag.trim());
    await AddTags(tagsArray,id);
    setTagInputs('');
    window.location.reload();
  }


  const copyUrl = () => {
    navigator.clipboard.writeText(url);
    toast({
      title: 'Url copied to clipboard',
      type: 'success',
      duration:1000
    })
  };

  const handleDelete = async()=>{
    await DeleteBookmark(id);
    window.location.reload();
    toast({
      title: 'Bookmark deleted',
      type: 'success',
      duration:1000
    })
  }
   return(
      <div className="card">
      <div className='card-image'>
        <img
          src={image}
          alt="Project Preview"
        />
        {
           pinned && <TiPin className='pin-badge'/>
        }
          </div>
        <div className="card-top">
          <div className="card-header">
          <img src={`https://icon.horse/icon/${domain}`} alt={`${title}icon`} className='icon' />
          <h2 className="card-title">{title}</h2>
          </div>
          <div className="dropdown-menu">
          <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={copyUrl}
          >
            Copy URL
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handlePin}>
            {pinned ? 'Unpin' : 'Pin'}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <AlertDialog>
<AlertDialogTrigger asChild>
<Button variant="destructive" className=' block border-none w-full outline-none text-left'>Delete</Button>
</AlertDialogTrigger>
<AlertDialogContent>
  <AlertDialogHeader>
    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
    <AlertDialogDescription>
      This action cannot be undone. This will permanently delete your
      account and remove your data from our servers.
    </AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter>
    <AlertDialogCancel>Cancel</AlertDialogCancel>
    <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>
</AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
           </div>
          </div>
          <div className="card-tags ">
          <div className="tags flex flex-wrap truncate">
          {Array.isArray(tags) && tags.length > 0 ? (
        tags.map((tag, index) => (
            <span key={index} className="card-tag border-transparent">
                {tag}
            </span>
        ))
    ) : (
        <p>Add tags...</p>
    )} </div>
              <div className="dropdown-menu">
              <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add tags</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add new tags</DialogTitle>
          <DialogDescription>
            Add tags to categorize your bookmarks
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Tags
            </Label>
            <Input id="tags"
             className="col-span-3" 
              value={tagInputs}
              onChange={(e) => setTagInputs(e.target.value)}
              placeholder="Enter tags separated by commas"
             />
          </div>
        </div>
          <Button onClick={handleAddTags} disabled={tagsLoading} 
          >Save changes</Button>
        
      </DialogContent>
    </Dialog>
    </div>
          </div>
          <a href={url} target='_blank' className='card-link'>{url}</a>
          <p className="card-description line-clamp-3">
            {description}
          </p>

        <i className="external-link-icon"></i>
    
      </div>
   )
}

export default Bookmark;




