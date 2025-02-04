import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { readdirSync, statSync, existsSync } from "fs";
import { any } from 'bluebird';


(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  
  
  //localhost:{{PORT}}/filteredimage?image_url=https://timedotcom.files.wordpress.com/2019/03/kitten-report.jpg
  app.get( "/filteredimage/", async ( req, res ) => {

    let{ image_url } = req.query;
    if(!image_url){
      return res.status(400)
              .send("Image url is missing");
      
    }

    var path = require('path');
    const fs = require('fs');

    //Directory to save file
    const tmpDirectory = path.join(__dirname, '/util/tmp/');

    var fileList : string[] ;
    
    
    //save image in request url to local
    //filterImageFromURL(image_url);
    async function getMyImage() {
      try {
        let myImg = await filterImageFromURL(image_url); 
        console.log('myImg', myImg);
        //send image absolute path
        res.sendFile(myImg);
        //console.log('Econtrol is here');
        
      } catch(e) {
        //catch any errors caused 
        console.log('Error caught');
      }
    };

    getMyImage();

    //Get list of files from the directory
   
    //Delete files in the directory

            
  } );
  
  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();