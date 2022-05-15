import { IsAlpha, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDTO {
  @IsAlpha()
  @IsNotEmpty()
  firstName: string;

  @IsAlpha()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(5)
  @IsNotEmpty()
  password: string;
}

export class SignInDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(5)
  @IsNotEmpty()
  password: string;
}
