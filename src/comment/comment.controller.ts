import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from 'src/schemas/comment.schema';
import { CreateCommentDto } from './dto/CreateComment.dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get(':postId')
  async getAllPost(@Param() { postId }): Promise<Comment[]> {
    return this.commentService.findAllComment(postId);
  }

  @Post()
  async createComment(
    @Body()
    comment: CreateCommentDto,
  ): Promise<Comment> {
    return this.commentService.createComment(comment);
  }
}
