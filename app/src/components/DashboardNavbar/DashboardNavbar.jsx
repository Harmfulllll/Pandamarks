import './DashboardNavbar.css';
import useLogout from '@/hooks/useLogout';
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


 function DashboardNavbar({ search, setSearch }) {
  const {Logout } = useLogout();
  const navigate = useNavigate();
  const user= useSelector(state=>state.auth.user);
  let bookmarks = useSelector(state => state.bookmark.bookmarks);
  
  if (bookmarks && bookmarks.length > 0 && bookmarks[0].bookmarks) {
    bookmarks = bookmarks[0].bookmarks;
} else {
    bookmarks = []; 
}  
  
  const handleLogout= async()=>{
    await Logout();
    navigate('/');
  }

    return(
        <div className="dashboard-navbar">
             <div className='dashboard-navbar-left'>
                <img src="./favicon-32x32.png" alt="" />
                <h1>PandaMarks</h1>
             </div>
             <div className='dashboard-navbar-right'>
                <div className="search">
          <input
            
            type="text"
            placeholder="Search by title or url..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
      
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' size='default'
                        className=' border-zinc-600'
                         >Profile</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <Drawer>
                         <DrawerTrigger asChild>
                        {<div className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground
                         ">
                        Profile Stats
                    </div> }
                   </DrawerTrigger>
                   <DrawerContent>
                      <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                    <DrawerTitle className='flex justify-center'>Hello {user.name}</DrawerTitle>
                  <DrawerDescription className='flex justify-center'>{user.email}</DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 ">
                      <div className="flex items-center justify-center space-x-2">

                        <div className="text-7xl font-bold tracking-tighter">
                       {
                          bookmarks ? ( 
                            <>
                            <p>
                              {bookmarks.length}
                            </p>
                            </>
                          ) :
                          (
                            <>
                            <p>0</p>
                            </>
                          )
                       }
                        </div>
                         <div className="text-[0.70rem] uppercase text-muted-foreground">
                         bookmarks added till now
                         </div> 
                     </div>
                    </div>
                     <div className='flex justify-center'>
                         We love to see you here.Enjoy!
                     </div>
                   </div>
                 <DrawerClose>
                 <Button variant="outline" className='mt-10 mb-10'>Cancel</Button>
                  </DrawerClose>
                    </DrawerContent>
                       </Drawer>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          onClick={() => {
                             handleLogout();
                          }}
                        >
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
             </div>
        </div>
    )
}

export default DashboardNavbar;


