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

function Bookmark({
    title, url, description, image, tags, domain
}){
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
          <h2 className="card-title ">{title}</h2>
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
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </div>
          </div>
          <div className="card-tags">
            {tags.map((tag, index) => (
              <span key={index} className="card-tag">
                {tag}
              </span>
            ))}
          </div>
          <a href={url} target='_blank' className='card-link'>{url}</a>
          <p className="card-description truncate">
            {description}
          </p>

        <i className="external-link-icon"></i>
    
      </div>
   )
}

export default Bookmark;