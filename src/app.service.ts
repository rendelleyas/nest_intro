import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  findOne(id: number) {
    const user = this.userRepository.findOne({ where: { id: id } });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email: email } });
  }

  login(loginDto: { email: string; password: string }) {
    return this.userRepository.findOne({ where: { email: loginDto.email } });
  }

  register(data) {
    return this.userRepository.save(data);
  }
}
