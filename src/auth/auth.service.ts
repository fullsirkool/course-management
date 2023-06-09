import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(verifyDto: SignInDto): Promise<any> {
    const { email, password } = verifyDto;
    const user = await this.userService.verifyUser(email, password);
    if (user) {
      const payload = { id: user.id, email: user.email, role: user.role };
      return {
        access_token: await this.jwtService.signAsync(payload),
      }
    }

    return new UnauthorizedException();
    // TODO: Generate a JWT and return it here
    // instead of the user object
  }

}
