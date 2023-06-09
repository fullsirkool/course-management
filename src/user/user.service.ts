import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ResponseUserDto } from './dto/response-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Boolean> {
    try {
      const { username, email, password, roleId } = createUserDto;
      const salt = +process.env.HASH_SALT;
      const hash = await bcrypt.hash(password, salt);
      const user = { username, email, password: hash, roleId };
      await this.userRepository.save(user);
      return true;
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number): Promise<ResponseUserDto> {
    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
      const { username, email, roleId, createdAt } = user;
      const responseUser = { username, email, roleId, createdAt } as ResponseUserDto;
      return responseUser;
    } catch (error) {
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({
        where: { email: email },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async verifyUser(email: string, password: string): Promise<User> {
    try {
      const findUser = await this.findOneByEmail(email);
      const isMatch = await bcrypt.compare(password, findUser.password);
      return isMatch ? findUser : null;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
