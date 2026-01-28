import { Injectable } from '@nestjs/common';
import { LoginDto, LoginResponse } from './dto/login.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  private readonly validUsername = 'admin';
  private readonly validPassword = '123456';

  login(loginDto: LoginDto): LoginResponse {
    const { username, password } = loginDto;

    if (username === this.validUsername && password === this.validPassword) {
      return {
        code: 0,
        message: 'Login successful',
        data: {
          token: randomUUID(),
        },
      };
    }

    return {
      code: 1,
      message: 'Invalid username or password',
      data: null,
    };
  }
}
