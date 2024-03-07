import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-users.dto';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}
  async create(CreateUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(CreateUserDto.password, 10);
    const newUser = new this.userModel({
      ...CreateUserDto,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id);
  }
}
