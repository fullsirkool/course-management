import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Res,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body() signInDto: SignInDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const token = await this.authService.signIn(signInDto);
      return res.status(HttpStatus.OK).json(token);
    } catch (error) {
      console.log(error);
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req, @Res() res: Response): Promise<Response> {
    try {
      const id = req.user.id;
      const user = await this.userService.findOne(id);
      return res.status(HttpStatus.OK).json(user);
    } catch (error) {
      console.log(error);
    }
  }
}
