import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import {config} from 'dotenv'
import router from './router/route.js'
import path from 'path'
import { fileURLToPath } from 'url'; // Import for __dirname alternative

/* import connection file */
import connect from './database/conn.js'

const app = express()


/*app middlewares */
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
config()

/*application port */
const port = process.env.PORT || 8080

/*static files */
// Static files (using fileURLToPath for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../client/build')));

/*routes */
app.use('/api', router)  /*apis */

app.get('*', function(req,res){
   res.sendFile(path.join(__dirname, '../client/build/index.html'))
})



/* start server only when we have valid connection */



connect().then(() => {
try{

    app.listen(port, ()=>{
        console.log(`Server connected to http://localhost:${port}`)
    })
    
}  catch(error){
console.log('Cannot connect to the server')
}
}).catch(error => {
    console.log('Invalid Database Connection')
})

