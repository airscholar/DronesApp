import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDTO, SignupDTO } from 'src/auth/dto/auth.dto';
import { Repository } from 'typeorm';
import { User } from './entities/User.entity';
import * as argon from 'argon2';
import serverConfig from 'src/config/env.config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwt: JwtService,
    @InjectRepository(User) private authRepository: Repository<User>,
  ) {}

  async signin(dto: SignInDTO) {
    const isExist = await this.authRepository.findOne({
      email: dto.email,
    });

    if (!isExist) {
      throw new UnauthorizedException('Authentication failed!');
    }

    const isValid = await argon.verify(isExist.password, dto.password);

    if (!isValid) {
      throw new UnauthorizedException('Authentication failed!');
    }

    delete isExist.password;

    return {
      message: 'Signed in successfully',
      data: {
        user: isExist,
        token: await this.signToken(isExist.id, isExist.email),
      },
    };
  }

  async signup(dto: SignupDTO) {
    const hash = await argon.hash(dto.password);

    const user = new User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.password = hash;

    try {
      const savedUser = await this.authRepository.save(user);
      return {
        message: 'Registration successful',
        data: await this.signToken(savedUser.id, savedUser.email),
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };
    return await this.jwt.signAsync(payload, {
      expiresIn: '1h',
      secret: serverConfig.JWT_SECRET,
    });
  }
}
