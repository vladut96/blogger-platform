import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateOrUpdatePostDto } from '../dto/create-or-update-post.dto';
import { PostsService } from '../application/posts.service';
import { BasicAuthGuard } from '../../../../core/guards/basic-auth.guard';

@Controller('sa/posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @UseGuards(BasicAuthGuard)
  @Post()
  async createPost(@Body() dto: CreateOrUpdatePostDto) {
    return this.postsService.createPost(dto);
  }
  @UseGuards(BasicAuthGuard)
  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async updatePost(
    @Param('id') id: string,
    @Body() dto: CreateOrUpdatePostDto,
  ) {
    return this.postsService.updatePost(id, dto);
  }
  @UseGuards(BasicAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePostById(@Param('id') id: string) {
    return this.postsService.deletePostById(id);
  }
}
