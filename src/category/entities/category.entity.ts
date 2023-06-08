import { Course } from "src/course/entities/course.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  name: string;

  @ManyToMany(() => Course, course => course.categories)
  courses: Course[];
}
