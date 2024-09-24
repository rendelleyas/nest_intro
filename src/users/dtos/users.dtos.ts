import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message: 'Role must be INTERN, ENGINEER or ADMIN',
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}

// has the same property with CreateUserDto, but not required to have all
export class UpdateUserDto extends PartialType(CreateUserDto) {}
