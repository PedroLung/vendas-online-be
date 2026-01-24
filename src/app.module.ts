import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from 'data-source';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRoot({ ...AppDataSource.options, migrationsRun: true }),
    UserModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
