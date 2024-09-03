import './HaveBookmarks.css';
import Bookmark from "@/components/Bookmark/Bookmark"
import AddBookmark from '../AddBookmark/AddBookmark';


function HaveBookmarks(){
    
    const bookmarks = [
        {
            title: "Title hwleo jdo sjsk sjsj",
            url: "https://www.google.com",
            description: "Organize your bookmarks with ease. Contribute to br4adam/bookmarks development by creating an account on GitHub.",
            image: "https://via.placeholder.com/150",
            tags: ["tag1","tag2","tag3"]
        },
        {
            title: "Title hwleo jdo sjsk sjsj",
            url: "https://www.google.com",
            description: "Organize your bookmarks with ease. Contribute to br4adam/bookmarks development by creating an account on GitHub.",
            image: "https://via.placeholder.com/150",
            tags: ["tag1","tag2","tag3"]
        },
        {
            title: "Title hwleo jdo sjsk sjsj",
            url: "https://www.google.com",
            description: "Organize your bookmarks with ease. Contribute to br4adam/bookmarks development by creating an account on GitHub.",
            image: "https://via.placeholder.com/150",
            tags: ["tag1","tag2","tag3"]
        },
        {
            title: "Title hwleo jdo sjsk sjsj",
            url: "https://www.google.com",
            description: "Organize your bookmarks with ease. Contribute to br4adam/bookmarks development by creating an account on GitHub.",
            image: "https://via.placeholder.com/150",
            tags: ["tag1","tag2","tag3"]
        },        {
            title: "Title hwleo jdo sjsk sjsj",
            url: "https://www.google.com",
            description: "Organize your bookmarks with ease. Contribute to br4adam/bookmarks development by creating an account on GitHub.",
            image: "https://via.placeholder.com/150",
            tags: ["tag1","tag2","tag3"]
        }
    ]

    return(
        <div className="have-bookmarks">
            <div className="add-bookmark">
            <AddBookmark/>
            </div>
             
             <div className="bookmark-data">
            {bookmarks.map((bookmark, index) => (
                <div className="bookmark-card">
                <Bookmark
                    key={index}
                    title={bookmark.title}
                    url={bookmark.url}
                    description={bookmark.description}
                    image={bookmark.image}
                    tags={bookmark.tags}
                /> </div>
            ))} </div>
        </div>
    )
}
export default HaveBookmarks;