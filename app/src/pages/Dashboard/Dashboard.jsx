import  DashboardNavbar  from "@/components/DashboardNavbar/DashboardNavbar";
import DashboardBody from "@/components/DashboardBody/DashboardBody";
import './Dashboard.css';
import { Separator } from "@/components/ui/separator"
import { useState } from 'react';

function Dashboard() {
   const [search, setSearch] = useState("");
   return (
      <div className="dashboard">
         <div className="nav">
         <DashboardNavbar search={search} setSearch={setSearch} />
         </div>
         <div className="dash-body">
         <DashboardBody search={search} />
         <div className="footer">
  
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Made with love</div>
        <Separator orientation="vertical" />
        <div>
         <a  href="https://github.com/Harmfulllll/Pandamarks/issues"
             target='_blank' >Report a bug</a>
        </div>
      </div>
         </div>
         </div>

      </div>
   )
}

export default Dashboard;