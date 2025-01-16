import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { CommentService } from './comment.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comment.name,
        schema: CommentSchema,
      },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
