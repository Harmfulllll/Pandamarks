import './DashboardBody.css';
import NoBookmarks from '../NoBookmarks/NoBookmarks';
import HaveBookmarks from '../HaveBookmarks/HaveBookmarks';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import useGetBookmarks from '@/hooks/useGetBookmarks';
import { useToast } from '@/hooks/use-toast';


function DashboardBody({search}) {
  const user= useSelector(state=>state.auth.user);
  const {bookmarksLoading, Bookmarks}= useGetBookmarks();
  const {toast}= useToast();

  useEffect(()=>{
    if(user){
      Bookmarks();
    }
  },[user]);

  

  let bookmarks = useSelector(state => state.bookmark.bookmarks);

  

    
  if (bookmarks && bookmarks.length > 0 && bookmarks[0].bookmarks) {
    bookmarks = bookmarks[0].bookmarks;
} else {
    bookmarks = []; 
} 

  
  return (
    <div className="dashboard-body">
      {
        !bookmarks.length>0 ? <NoBookmarks /> : <HaveBookmarks search={search} />
      }
    </div>
  );
}
export default DashboardBody;