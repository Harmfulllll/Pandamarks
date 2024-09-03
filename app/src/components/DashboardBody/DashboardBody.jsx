import './DashboardBody.css';
import NoBookmarks from '../NoBookmarks/NoBookmarks';
import HaveBookmarks from '../HaveBookmarks/HaveBookmarks';

function DashboardBody() {
  return (
    <div className="dashboard-body">
         <HaveBookmarks/>
    </div>
  );
}
export default DashboardBody;