import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @Column({ name: 'creator_id' })
  creatorId: number;

  @ManyToOne(() => User, (user) => user.courses)
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @ManyToMany(() => Category, (category) => category.courses, {
    cascade: true,
  })
  @JoinTable()
  categories: Category[];
}
