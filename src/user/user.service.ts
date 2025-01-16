import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dto/CreateUser.dto';
import { LoginDto } from './dto/Login.dto';
// import { UpdateUserDto } from './dto/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser({ username, password }: CreateUserDto) {
    if ((await this.userModel.find({ username: username })).length > 0) {
      throw new ConflictException(`Username "${username}" is already in use.`);
    }
    const newUser = new this.userModel({ username, password });
    return newUser.save();
  }
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async getUsername(id: string) {
    const user = await this.userModel.findById(id);
    return { name: user.username };
  }

  async login({ username, password }: LoginDto) {
    const user = await this.userModel.findOne({ username }).exec();

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (password !== user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      message: 'Login successful',
      user: {
        id: user._id,
        username: user.username,
      },
    };
  }

  async changePassword(id: string, newPassword: string) {
    // console.log(id);
    if (!Types.ObjectId.isValid(id)) {
      throw new Error('Invalid ID format');
    }

    const result = await this.userModel.findByIdAndUpdate(
      id,
      {
        password: newPassword,
      },
      { new: true },
    );
    console.log(result);

    return {
      message: 'Updated successful',
      update: result,
    };
  }
}
