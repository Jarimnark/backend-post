import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './User.schema';
import { Post } from './post.schema';

@Schema({ collection: 'comment' })
export class Comment {
  @Prop({ required: true })
  comment: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
  post: Post;

  @Prop()
  create_at: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
