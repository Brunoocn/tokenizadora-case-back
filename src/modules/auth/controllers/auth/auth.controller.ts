import { Body, Controller, Post } from '@nestjs/common';
import { SkipAuth } from 'src/commom/decorators/skipAuth.decorator';
import {
  ILoginResponseDTO,
  IRegisterResponseDTO,
  LoginDTO,
  RegisterDTO,
} from './authController.dto';
import { LoginService } from '../../services/auth/login/login.service';
import { RegisterService } from '../../services/auth/register/register.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
  ) {}

  @SkipAuth()
  @Post('/login')
  async loginUser(
    @Body() { email, password }: LoginDTO,
  ): Promise<ILoginResponseDTO> {
    return this.loginService.execute({ email, password });
  }

  @SkipAuth()
  @Post('/register')
  async registerUser(
    @Body() { name, email, password }: RegisterDTO,
  ): Promise<IRegisterResponseDTO> {
    return this.registerService.execute({ name, email, password });
  }
}
