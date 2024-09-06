import './HaveBookmarks.css';
import { useEffect } from 'react';
import Bookmark from "@/components/Bookmark/Bookmark"
import AddBookmark from '../AddBookmark/AddBookmark';
import useGetBookmarks from '@/hooks/useGetBookmarks';
import { useSelector } from 'react-redux';
import { Skeleton } from "@/components/ui/skeleton"

function HaveBookmarks({search}){
    
    const {bookmarksLoading, Bookmarks}= useGetBookmarks();
    useEffect(()=>{
        Bookmarks();
    },[]);
   let bookmarks= useSelector(state => state.bookmark.bookmarks);
   console.log(bookmarks[0].bookmarks);
    bookmarks= bookmarks[0].bookmarks;
/*   if(bookmarksLoading){
      return(
         <div className='bookmark-data'>
            <div className='bookmark-card'>
            <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
            </div>

         </div>

      )
  } */

    return(
        <div className="have-bookmarks">
            <div className="add-bookmark">
            <AddBookmark/>
            </div>
             
             <div className="bookmark-data">
                { 
                    bookmarks.filter(({title, url, })=>{
                        return title.indexOf(search)>=0 || url.indexOf(search)>=0;
                    })
                    .map((bookmark)=>(
                        <div className='bookmark-card'>
                            <Bookmark 
                            key={bookmark._id}
                            title={bookmark.title}
                            url={bookmark.url}
                            description={bookmark.description}
                            image={bookmark.image}
                            tags={bookmark.tags}
                            />
                        </div>

                    ))
                }
            </div>
        </div>
    )
}
export default HaveBookmarks;