import './DashboardBody.css';
import NoBookmarks from '../NoBookmarks/NoBookmarks';
import HaveBookmarks from '../HaveBookmarks/HaveBookmarks';
import { useSelector } from 'react-redux';

function DashboardBody() {
  const user= useSelector(state=>state.auth.user);
  const bookmarks = useSelector(state => state.bookmark.bookmarks);
  return (
    <div className="dashboard-body">
      {
        !bookmarks ? <NoBookmarks /> : <HaveBookmarks bookmarks={bookmarks} />
      }
    </div>
  );
}
export default DashboardBody;