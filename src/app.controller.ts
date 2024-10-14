import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDto, RegisterDto } from './auth/dtos/register.dto';
import { JwtService } from '@nestjs/jwt';
import { response } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private jwtService: JwtService,
  ) {}

  @Post('auth/login')
  async login(@Body(ValidationPipe) loginDto: LoginDto) {
    const user = await this.appService.findByEmail(loginDto.email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    // response.cookie('jwt', jwt, { httpOnly: true });

    return jwt;
  }

  @Post('auth/register')
  async register(@Body(ValidationPipe) registerDto: RegisterDto) {
    const user = await this.appService.findByEmail(registerDto.email);

    if (user) {
      throw new BadRequestException('Credentials already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 12);

    return this.appService.register({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
    });
  }
}
