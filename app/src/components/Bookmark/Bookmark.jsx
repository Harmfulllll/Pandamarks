import './Bookmark.css';
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import useDeleteBookmark from '@/hooks/useDeleteBookmark';

function Bookmark({
    title, url, description, image, tags, domain ,id
}){
  const {deleteBookmarkLoading, DeleteBookmark} = useDeleteBookmark();

  const handleDelete = async()=>{
    await DeleteBookmark(id);
  }
   return(
      <div className="card">
      <div className='card-image'>
        <img
          src={image}
          alt="Project Preview"
        />
          </div>
        <div className="card-top">
          <div className="card-header">
          <img src={`https://icon.horse/icon/${domain}`} alt={`${title}icon`} className='icon' />
          <h2 className="card-title">{title}</h2>
          </div>
          <div className="dropdown-menu">
          <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Copy URL
          </DropdownMenuItem>
          <DropdownMenuItem>
             Pin
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuItem onClick={()=>handleDelete(id)} 
        >Delete</DropdownMenuItem>
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
          <p className="card-description">
            {description}
          </p>

        <i className="external-link-icon"></i>
    
      </div>
   )
}

export default Bookmark;