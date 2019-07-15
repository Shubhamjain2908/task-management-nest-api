import { Controller, Post, Body, ValidationPipe, Get, UseGuards } from '@nestjs/common';
import { AuthCredientialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signup(@Body(ValidationPipe) authDto: AuthCredientialsDto): Promise<void> {
        return this.authService.signup(authDto);
    }

    @Post('/signin')
    async signin(@Body(ValidationPipe) authDto: AuthCredientialsDto): Promise<{ accessToken: string }> {
        return this.authService.signin(authDto);
    }

    @Get('/me')
    @UseGuards(AuthGuard())
    async getUser(@GetUser() user: User): Promise<User> {
        return user;
    }
}
