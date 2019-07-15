import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, BeforeUpdate, BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { async } from 'rxjs/internal/scheduler/async';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
    }

    async comparePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}
