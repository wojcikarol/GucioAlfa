import Index from './index';
import IndexController from "./controllers/index.controller";
import DataController from "./controllers/data.controller";
import UserController from "./controllers/user.controller";
import CarsController from './controllers/cars.controller';

const app: Index = new Index([
    new CarsController(),
    new UserController(),
    new DataController(),
    new IndexController()
]);

app.listen();
