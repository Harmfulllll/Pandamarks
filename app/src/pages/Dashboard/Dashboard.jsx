import  DashboardNavbar  from "@/components/DashboardNavbar/DashboardNavbar";
import DashboardBody from "@/components/DashboardBody/DashboardBody";
import './Dashboard.css';
function Dashboard() {
   return (
      <div className="dashboard">
         <div className="nav">
         <DashboardNavbar />
         </div>
         <div className="dash-body">
         <DashboardBody />

         </div>

      </div>
   )
}

export default Dashboard;