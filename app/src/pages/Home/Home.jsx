import './Home.css';
import HomeNavbar from '../../components/HomeNavbar/HomeNavbar';
import { Separator } from "@/components/ui/separator"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

function Home(){
   return(
      <div className="home">
            <HomeNavbar />
            <div className="home-body">
                <div className="body-upper">
                <h1>Bookmarks</h1>
                <h2>
                    made easy
                </h2>
                </div>
                <div className="body-lower">
                <p>
                Bookmark, tag, and find what you need, effortlessly!
                </p>
                <button className='get-started'>Get Started</button>
                </div>

                <div className="hero-image">
                    <img src="./chrome_ixkO1Y7I71.png" alt="product-image" />
                </div>
            </div>
            <div className="page2">
                <h1>
                    Manage all your bookmarks in one place
                </h1>
                <div className="features">
                <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger >Add your desired websites</AccordionTrigger>
        <AccordionContent >
            Copy and paste the URL of the website you want to bookmark. Its that simple!
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" >
        <AccordionTrigger>
            Tag your bookmarks
        </AccordionTrigger>
        <AccordionContent>
            Add tags to your bookmarks to make them easier to find.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
            Find your bookmarks
        </AccordionTrigger>
        <AccordionContent>
            Search for your bookmarks with ease. Just type in the name of the website or the tag you assigned to it.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
                </div>
            </div>

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
   )
}
export default Home;

