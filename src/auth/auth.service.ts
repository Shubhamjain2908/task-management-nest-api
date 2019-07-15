import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredientialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
    ) { }

    async signup(authDto: AuthCredientialsDto): Promise<void> {
        return this.userRepository.signup(authDto);
    }

}
