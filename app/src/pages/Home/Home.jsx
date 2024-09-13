import './Home.css';
import HomeNavbar from '../../components/HomeNavbar/HomeNavbar';
import { Separator } from "@/components/ui/separator"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  import {motion} from 'framer-motion';

function Home(){
   return(
      <div className="home">
            <HomeNavbar />
            <div className="home-body">
                <div className="body-upper">
                <motion.h1
                initial={{opacity:0, y:40}}
                whileInView={{opacity:1, y:0}}
                transition={{duration:0.8, delay:0.1}}
                >Bookmarks</motion.h1>
                <motion.h2
                 initial={{opacity:0, y:40}}
                 whileInView={{opacity:1, y:0}}
                 transition={{duration:0.8, delay:0.1}}
                >
                    made easy
                </motion.h2>
                </div>
                <div className="body-lower">
                <motion.p
                 initial={{opacity:0, y:40}}
                 whileInView={{opacity:1, y:0}}
                 transition={{duration:0.8, delay:0.1}}
                >
                Bookmark, tag, and find what you need, effortlessly!
                </motion.p>
                <button className='get-started'
                onClick={() => window.location.href = './register'}
                >Get Started
                </button>
                </div>

                <div className="hero-image">
                    <img src="./chrome_jW6RTg3vWo.png" alt="product-image" />
                </div>
            </div>
            <div className="page2">
                <motion.h1
                    initial={{opacity:0, y:50}}
                    whileInView={{opacity:1, y:0}}
                    transition={{duration:0.9, delay:0.1}}
                >
                    Manage all your bookmarks in one place
                </motion.h1>
                <motion.div 
                initial={{opacity:0, y:40}}
                whileInView={{opacity:1, y:0}}
                transition={{duration:0.8, delay:0.1}}
                className="features">
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
                </motion.div>
            </div>

            <div className="footer">
  
          <div className="flex h-5 items-center space-x-4 text-sm">
              <div>Made with love</div>
              <Separator orientation="vertical" />
             <div>
             <a href="https://github.com/Harmfulllll/Pandamarks/issues"
             target='_blank' 
             >Report a bug</a>
            </div>
           </div>
            </div>
           </div>
   )
}
export default Home;

