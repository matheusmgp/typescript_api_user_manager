import { Router } from 'express';
import { AuthRoutes } from './auth.routes';
import { UserRoutes } from './user.routes';

const router = Router();

router.use(new UserRoutes().router);
router.use(new AuthRoutes().router);

export { router };
