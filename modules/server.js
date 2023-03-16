import express from "express";
import cors from "cors"

import router from "../routes/userRoutes.js";

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.userPath = '/api/users'

    this.middleware();
    //Rutas
    this.routes();

  }
  middleware() {
    //CORS
    this.app.use( cors());
    
    //Parseo del body
    this.app.use(express.json());

    //Directorio Publico
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(this.userPath,router )
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server started on port ${this.port}`);
    });
  }
}
export default Server;
