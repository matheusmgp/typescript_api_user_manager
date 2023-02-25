import { AuthController } from '@src/controllers/users/auth/auth.controller';
import express, { Router } from 'express';

export class AuthRoutes {
  public router: Router;
  private controller: AuthController = new AuthController();

  constructor() {
    this.router = express.Router();
    this.registerRoutes();
  }

  protected registerRoutes(): void {
    this.router.post('/login', this.controller.login);
  }
}
