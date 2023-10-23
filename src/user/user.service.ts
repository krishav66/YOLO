import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async register(userData: any): Promise<User> {
    
    const existingUser = await this.userModel.findOne({ username: userData.username });
    if (existingUser) {
      throw new Error('Username is already taken.');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = new this.userModel({
      username: userData.username,
      password: hashedPassword,
    });

    return await newUser.save();
  }

  async login(user: User): Promise<{ accessToken: string }> {
    
    const dummyAccessToken = 'dummyAccessToken';

    return { accessToken: dummyAccessToken };
  }

  async logout() {
   
    return { message: 'Logout successful' };
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async update(id: string, updateUserDto: any): Promise<User> {
    const existingUser = await this.userModel.findById(id).exec();
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (updateUserDto.username) {
      existingUser.username = updateUserDto.username;
    }

    if (updateUserDto.password) {
      existingUser.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return existingUser.save();
  }

  async remove(id: string): Promise<User> {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return deletedUser;
  }
}
