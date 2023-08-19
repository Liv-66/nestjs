import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  async getUsers() {
    return await this.usersService.getUsers();
  }
}
