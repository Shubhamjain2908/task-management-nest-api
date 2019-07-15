import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredientialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        private readonly jwtService: JwtService,
    ) { }

    async signup(authDto: AuthCredientialsDto): Promise<void> {
        return this.userRepository.signup(authDto);
    }

    async signin(authDto: AuthCredientialsDto): Promise<{ accessToken: string }> {
        const username = await this.userRepository.validateUserPasssword(authDto);

        if (!username) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const payLoad: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payLoad);

        return { accessToken };
    }

}
