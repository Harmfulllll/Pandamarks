import  DashboardNavbar  from "@/components/DashboardNavbar/DashboardNavbar";
import DashboardBody from "@/components/DashboardBody/DashboardBody";
import './Dashboard.css';
function Dashboard() {
   return (
      <div className="dashboard">
         <DashboardNavbar />
          <DashboardBody />
      </div>
   )
}

export default Dashboard;