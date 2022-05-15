import { Body, Controller, Post } from '@nestjs/common';
import { SignInDTO, SignupDTO } from 'src/auth/dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  async signin(@Body() dto: SignInDTO) {
    return await this.authService.signin(dto);
  }

  @Post('signup')
  async signup(@Body() dto: SignupDTO) {
    return await this.authService.signup(dto);
  }
}
