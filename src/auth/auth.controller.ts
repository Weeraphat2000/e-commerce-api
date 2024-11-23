import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, LoginDTO } from './dto/create-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BcryptService } from 'src/config/bcrypt.service';
import { JwtService } from 'src/config/jwt.service';
import { Auth } from './decorators/auth.decoratos';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/register')
  @ApiOperation({ summary: 'Register', description: 'Register new user' })
  async create(@Body() createAuthDto: CreateAuthDto) {
    const user = await this.authService.findUserByEmail(createAuthDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    createAuthDto.password = await this.bcryptService.hash(
      createAuthDto.password,
    );

    const newUser = await this.authService.create(createAuthDto);
    delete newUser.password;
    return {
      token: this.jwtService.sign({ email: newUser.email }),
      user: newUser,
    };
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login', description: 'Login user' })
  async login(@Body() body: LoginDTO) {
    const user = await this.authService.findUserByEmail(body.email);
    if (!user) {
      throw new BadRequestException('User not found or invalid password');
    }
    if (!user.enabled) {
      throw new BadRequestException('User is disabled');
    }
    const isValid = await this.bcryptService.compare(
      body.password,
      user.password,
    );
    if (!isValid) {
      throw new BadRequestException('User not found or invalid password');
    }
    delete user.password;

    return {
      token: this.jwtService.sign({ email: user.email }),
      user,
    };
  }

  @Auth()
  @ApiOperation({ summary: 'Get me', description: 'Get user profile' })
  @Get('/me')
  async findAll(@Headers('authorization') authorization: string) {
    if (!authorization) {
      throw new BadRequestException('Authorization header is required');
    }
    if (!authorization.startsWith('Bearer ')) {
      throw new BadRequestException('Invalid authorization header');
    }
    const token = authorization.split(' ')[1];
    const payload = this.jwtService.verify(token);
    const user = await this.authService.findUserByEmail(payload.email);
    delete user.password;
    return user;
  }
}
