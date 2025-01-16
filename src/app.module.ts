import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule globally available
      envFilePath: '.env', // Path to the .env file
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    UserModule,
    PostModule,
    CommentModule,
  ],
})

//
export class AppModule {}
