import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { User } from 'src/schemas/user.schema';
import { LoginDto } from './dto/Login.dto';

@Controller('user')
export class UserController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUser(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get(':id')
  async getUser(@Param() { id }) {
    return this.usersService.getUsername(id);
  }

  @Post()
  async createUser(
    @Body()
    user: CreateUserDto,
  ): Promise<User> {
    return this.usersService.createUser(user);
  }

  @Post('login')
  async login(
    @Body()
    user: LoginDto,
  ) {
    return this.usersService.login(user);
  }

  @Put('password/:id')
  async changePassword(
    @Body()
    { password },
    @Param()
    { id },
  ) {
    console.log(id);
    return this.usersService.changePassword(id, password);
  }
}
