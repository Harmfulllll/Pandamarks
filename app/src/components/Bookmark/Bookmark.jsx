import './Bookmark.css';
import { Button } from "@/components/ui/button"
import { BeatLoader } from 'react-spinners';
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
import useDeleteBookmark from '@/hooks/useDeleteBookmark';
import usePinBookmark from '@/hooks/usePinBookmark';


function Bookmark({
    title, url, description, image, tags, domain ,id, pinned
}){
  const {deleteBookmarkLoading, DeleteBookmark} = useDeleteBookmark();
  const {PinBookmark} = usePinBookmark();
  const { toast} = useToast();

  const handlePin = async()=>{
    await PinBookmark(id);
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
          <div className="card-tags truncate">

            { tags.length>0 ? tags.map((tag, index) => (
              <span key={index} className="card-tag">
                {tag}
              </span>
            )) : (
              <p>
                Add tags...
              </p>
            )
          }
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




