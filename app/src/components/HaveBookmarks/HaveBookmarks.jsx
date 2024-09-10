import { Skeleton } from "@/components/ui/skeleton";
import { useState,useEffect } from 'react';
import Bookmark from "@/components/Bookmark/Bookmark";
import AddBookmark from '../AddBookmark/AddBookmark';
import useGetBookmarks from '@/hooks/useGetBookmarks';
import { useSelector} from 'react-redux';
import './HaveBookmarks.css';

function HaveBookmarks({ search}) {
    const { bookmarksLoading, Bookmarks } = useGetBookmarks();

    const [refresh, setRefresh] = useState(false);

   useEffect(() => {
        Bookmarks();
    }, []); 

   let bookmarks = useSelector(state => state.bookmark.bookmarks);
    const user = useSelector(state => state.auth.user.id);

    if (bookmarks && bookmarks.length > 0 && bookmarks[0].bookmarks) {
        bookmarks = bookmarks[0].bookmarks;
    } else {
        bookmarks = []; 
    }  
/*      
    const handleRefresh = () => {
        setRefresh(prev => !prev);
    }; */
/* 
    console.log(bookmarks[0].tags[0].taglist); */


   if (bookmarksLoading) {
        return (
            <div className="bookmark-data mt-24">
            {
                bookmarks.filter(({ title, url }) => {
                    return title.indexOf(search) >= 0 || url.indexOf(search) >= 0;
                })
                    .map((bookmark) => (
                        <div className='bookmark-card' key={bookmark._id}>
                         <div className="flex flex-col space-y-3">
                        <Skeleton className="h-[150px] w-[350px] rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[350px]" />
                            <Skeleton className="h-4 w-[300px]" />
                        </div>
                    </div>
                        </div>
                    ))
            }
        </div>
        );

    } 
 
  /*   let tags= bookmarks[0].tags;
    tags = bookmarks[0].tags.filter(tag => tag.userId === user);
  
    tags = tags[0].taglist; */



    return (
        <div className="have-bookmarks">
            <div className="add-bookmark">
                <AddBookmark />
            </div>
            <div className="bookmark-data">
                {
                    bookmarks.filter(({ title, url }) => {
                        return title.indexOf(search) >= 0 || url.indexOf(search) >= 0;
                    })
                    .sort((a, b) => b.pinned - a.pinned) 
                        .map((bookmark) => {
                            const userTags = bookmark.tags.filter(tag => tag.userId === user);
                            const taglist = userTags.length > 0 ? userTags[0].taglist : [];
                            return(
                            <div className='bookmark-card' key={bookmark._id}>
                                <Bookmark
                                    title={bookmark.title}
                                    url={bookmark.url}
                                    description={bookmark.description}
                                    image={bookmark.image}
                                    tags={taglist}
                                    domain={bookmark.sitename}
                                    id={bookmark._id}
                                    pinned={bookmark.pinned}
                                />
                            </div>
                            )
})
                }
            </div>
        </div>
    );
}

export default HaveBookmarks;