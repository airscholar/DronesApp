import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import serverConfig from 'src/config/env.config';
import { AuthRepository } from '../auth.repository';
import { User } from '../entities/User.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @InjectRepository(User) private readonly authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: serverConfig.JWT_SECRET,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    // console.log(payload);
    const user = await this.authRepository.findOne({
      email: payload.email,
    });

    return user ?? null;
  }
}
