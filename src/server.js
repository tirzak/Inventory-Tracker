import {app} from './app'
import dotenv from 'dotenv'
dotenv.config()
const port = process.env.NODE_PORT || 8000

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

process.on('SIGINT', async () => {
    console.log('Stopping server...');
    await server.close({timeout:100})
    console.log('Server stopped');
    process.exit(0);
});//Closes the server
const server= app.listen(port, ()=>{
    console.log (`Listening on http://localhost:${port}`) 
})

export const closeApp = ()=>{
     server.close()
}