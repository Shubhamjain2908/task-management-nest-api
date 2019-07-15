import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, BeforeUpdate, BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Task } from '../tasks/task.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Task, task => task.user, { eager: true })
    task: Task[];

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
