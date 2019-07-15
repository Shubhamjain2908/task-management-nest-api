import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredientialsDto } from './dto/auth-credentials.dto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async signup(authDto: AuthCredientialsDto): Promise<void> {
        const { username, password } = authDto;

        const user = new User();
        user.username = username;
        user.password = password;
        try {
            await user.save();
        } catch (err) {
            if (err.code === '23505') {
                throw new ConflictException('Username already exists!');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUserPasssword(authDto: AuthCredientialsDto): Promise<string> {
        const { username, password } = authDto;
        const user = await this.findOne({ username });
        if (user && await user.comparePassword(password)) {
            return user.username;
        } else {
            return null;
        }
    }

}
