import  DashboardNavbar  from "@/components/DashboardNavbar/DashboardNavbar";
import DashboardBody from "@/components/DashboardBody/DashboardBody";
import './Dashboard.css';
import { Separator } from "@/components/ui/separator"

function Dashboard() {
   return (
      <div className="dashboard">
         <div className="nav">
         <DashboardNavbar />
         </div>
         <div className="dash-body">
         <DashboardBody />
         <div className="footer">
  
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Made with love</div>
        <Separator orientation="vertical" />
        <div>
         <a href="">Report a bug</a>
        </div>
      </div>
         </div>
         </div>

      </div>
   )
}

export default Dashboard;