import './HomeNavbar.css';

function HomeNavbar() {
   return(
       <div className="home-nav">
           <div className="home-nav-left">
               <img src="./vite.svg" alt="" />
               <h1>
                  Bookmarks
               </h1>
           </div>
           <div className="home-nav-right">
               <h4>
                <a href="./login">Login</a>
               </h4>
           </div>
       </div>
   )
}
export default HomeNavbar;