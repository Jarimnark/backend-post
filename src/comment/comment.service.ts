import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from 'src/schemas/comment.schema';
import { CreateCommentDto } from './dto/CreateComment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
  ) {}

  async createComment({ comment, postId, userId }: CreateCommentDto) {
    const newComment = new this.commentModel({
      comment,
      post: postId,
      user: userId,
      create_at: new Date(),
    });
    return newComment.save();
  }

  async findAllComment(postId: string): Promise<Comment[]> {
    const post = await this.commentModel.find({ post: postId });
    return post;
  }
}
