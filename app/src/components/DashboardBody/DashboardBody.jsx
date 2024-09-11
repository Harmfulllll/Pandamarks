import './DashboardBody.css';
import NoBookmarks from '../NoBookmarks/NoBookmarks';
import HaveBookmarks from '../HaveBookmarks/HaveBookmarks';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import useGetBookmarks from '@/hooks/useGetBookmarks';
import { useToast } from '@/hooks/use-toast';
import { BeatLoader } from 'react-spinners';


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


  if(bookmarksLoading){
    return (
        <> 
            <div className="
            flex flex-col items-center justify-center mt-24 space-y-4 text-center text-gray-500

             ">
                <div className="loader">
                    <BeatLoader size={8} color="gray" />
                </div>
            </div>
        </>
    );
  } 
  
  return (
    <div className="dashboard-body">
      {
       !bookmarks.length ? <NoBookmarks /> : <HaveBookmarks search={search} />
      }
    </div>
  );
}
export default DashboardBody;