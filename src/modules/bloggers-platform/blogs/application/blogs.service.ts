import { injectable } from 'inversify';
import {
  BlogInputModel,
  BlogViewModel,
  Paginator,
} from '../../../../core/types/types';
import { BlogsEntity } from '../domain/blogs.entity';
import {
  BlogsQueryRepository,
  BlogsRepository,
} from '../infrastructure/repositories/blogs.repository';
import { QueryBlogsDto } from '../dto/query-blogs.dto';
import { NotFoundException } from '@nestjs/common';

@injectable()
export class BlogsQueryService {
  constructor(private readonly blogsQueryRepository: BlogsQueryRepository) {}

  async getBlogs(query: QueryBlogsDto): Promise<Paginator<BlogViewModel>> {
    return this.blogsQueryRepository.getBlogs(query);
  }
  async getBlogById(blogID: string): Promise<BlogsEntity> {
    const blog = await this.blogsQueryRepository.getBlogById(blogID);
    if (!blog) throw new NotFoundException();
    return blog;
  }
}

@injectable()
export class BlogsService {
  constructor(private readonly blogsRepository: BlogsRepository) {}

  async createBlog(dto: BlogInputModel): Promise<BlogViewModel> {
    const entity = BlogsEntity.create(dto);
    const saved = await this.blogsRepository.save(entity);
    return saved.toViewModel();
  }

  async updateBlog(id: string, updateData: BlogInputModel): Promise<void> {
    const entity = await this.blogsRepository.getById(id);
    if (!entity) throw new NotFoundException();

    entity.update(updateData);
    await this.blogsRepository.save(entity);
  }

  async deleteBlogById(id: string): Promise<void> {
    const deletedBlog = await this.blogsRepository.deleteBlogById(id);
    if (!deletedBlog) throw new NotFoundException();
  }
}
