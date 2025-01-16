import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as postSchema } from 'src/schemas/post.schema';
import { CreatePostDto } from './dto/CreatePost.dto';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  async getAllPost(): Promise<postSchema[]> {
    return this.postService.findAllPost();
  }

  @Post()
  async createPost(
    @Body()
    post: CreatePostDto,
  ): Promise<postSchema> {
    return this.postService.createPost(post);
  }
}
