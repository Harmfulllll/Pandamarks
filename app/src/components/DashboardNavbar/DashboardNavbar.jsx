import './DashboardNavbar.css';
import { useState } from 'react';
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


 function DashboardNavbar() {
  const [search, setSearch] = useState("");
  const {Logout } = useLogout();
  const user= useSelector(state=>state.auth.user);
  const bookmarks = useSelector(state => state.bookmark.bookmarks);

  console.log(bookmarks);

  const handleLogout= async()=>{
    await Logout();
  }

    return(
        <div className="dashboard-navbar">
             <div className='dashboard-navbar-left'>
                <img src="./vite.svg" alt="" />
                <h1>Bookmarks</h1>
             </div>
             <div className='dashboard-navbar-right'>
                <div className="search">
          <input
            
            type="text"
            placeholder="Search..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
      
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' size='default'
                         >Profile</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <Drawer>
                         <DrawerTrigger asChild>
                      <Button variant="outline"
                        className=" block text-left w-full outline-none border-none"
                       >Profile Stats</Button> 
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
                            <p>{bookmarks.length}</p>
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
                       <DropdownMenuSeparator />
                            <DropdownMenuItem>
                               Edit profile
                            </DropdownMenuItem>
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


