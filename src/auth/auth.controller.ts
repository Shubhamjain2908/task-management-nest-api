import { Controller, Post, Body, ValidationPipe, Param } from '@nestjs/common';
import { AuthCredientialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

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
}
