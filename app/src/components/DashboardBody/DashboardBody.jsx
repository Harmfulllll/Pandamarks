import './DashboardBody.css';
import NoBookmarks from '../NoBookmarks/NoBookmarks';
import HaveBookmarks from '../HaveBookmarks/HaveBookmarks';
import { useSelector } from 'react-redux';

function DashboardBody({search}) {
  const user= useSelector(state=>state.auth.user);
  const bookmarks = useSelector(state => state.bookmark.bookmarks);
  return (
    <div className="dashboard-body">
      {
        !bookmarks ? <NoBookmarks /> : <HaveBookmarks search={search}/>
      }
    </div>
  );
}
export default DashboardBody;