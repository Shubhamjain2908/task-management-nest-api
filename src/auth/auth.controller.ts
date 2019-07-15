import { Controller, Post, Body } from '@nestjs/common';
import { AuthCredientialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signup(@Body() authDto: AuthCredientialsDto): Promise<void> {
        return this.authService.signup(authDto);
    }
}
