import './DashboardBody.css';
import NoBookmarks from '../NoBookmarks/NoBookmarks';
import HaveBookmarks from '../HaveBookmarks/HaveBookmarks';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import useGetBookmarks from '@/hooks/useGetBookmarks';

function DashboardBody({search}) {
  const user= useSelector(state=>state.auth.user);
  const { bookmarksLoading, Bookmarks } = useGetBookmarks();

  useEffect(() => {
    Bookmarks();
}, []); 

let bookmarks = useSelector(state => state.bookmark.bookmarks);
 
/* console.log(bookmarks);

if (bookmarks && bookmarks.length > 0 && bookmarks[0].bookmarks) {
    bookmarks = bookmarks[0].bookmarks;
} else {
    bookmarks = []; 
}

   */

  
  return (
    <div className="dashboard-body">
      {
        !bookmarks ? <NoBookmarks /> : <HaveBookmarks search={search} />
      }
    </div>
  );
}
export default DashboardBody;