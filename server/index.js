import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
/* import from other files */
import connectDB from './src/database/db.js';
import userRoutes from './src/routes/user.route.js';
import bookmarkRoutes from './src/routes/bookmark.route.js';

const app=express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
cors(
    {
        origin:process.env.CLIENT_URL,
        credentials:true
    }
);
const PORT=process.env.PORT || 3000;

app.use('/api/v1/users',userRoutes);
app.use('/api/v1/bookmarks',bookmarkRoutes);

connectDB().then(
    app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    }
    )
).catch(
    err=>{
        console.log("Error connecting to the database", err);
        process.exit(1);
    }
);
