import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { CategoryModule } from './category/category.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import configuration from '../config/configuration';
import { Role } from './role/entities/role.entity';
import { User } from './user/entities/user.entity';
import { Course } from './course/entities/course.entity';
import { Category } from './category/entities/category.entity';
import { Question } from './question/entities/question.entity';
import { Answer } from './answer/entities/answer.entity';
import { History } from './history/entities/history.entity';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Role, User, Course, Category, Question, Answer, History],
      synchronize: true,
    }),
    RoleModule,
    UserModule,
    CourseModule,
    CategoryModule,
    QuestionModule,
    AnswerModule,
    HistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
