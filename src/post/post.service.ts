import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schemas/post.schema';
import { CreatePostDto } from './dto/CreatePost.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  async createPost({ title, contents, userId }: CreatePostDto) {
    const newPost = new this.postModel({
      title,
      contents,
      user: userId,
      create_at: new Date(),
    });
    return newPost.save();
  }

  async findAllPost(): Promise<Post[]> {
    const post = await this.postModel.find();
    return post;
  }
}
