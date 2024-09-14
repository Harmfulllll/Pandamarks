import './HomeNavbar.css';

function HomeNavbar() {
   return(
       <div className="home-nav">
           <div className="home-nav-left">
               <img src="./favicon-32x32.png" alt="" />
               <h1
                 onClick={() => window.location.href = "./"}
               >
                  Pandamarks
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