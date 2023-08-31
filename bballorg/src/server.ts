import App from './app';
import UsersRoute from './routes/user.route';

const app = new App([new UsersRoute()]);

app.listen()
