import { injectable, inject } from 'inversify';
import {
  PostsQueryRepository,
  PostsRepository,
} from '../infrastructure/repositories/posts.repository';
import { BlogsQueryRepository } from '../../blogs/infrastructure/repositories/blogs.repository';
import {
  PostInputModel,
  Paginator,
  PostViewModel,
  PaginationQuery,
  LikeStatus,
} from '../../../../core/types/types';
import { PostEntity } from '../domain/posts.entity';
import { buildPaginator } from '../../../../core/utils/buildPaginator';
import { PaginationDto } from '../../../../core/dto/pagination.dto';
import { NotFoundException } from '@nestjs/common';
import { CreateOrUpdatePostDto } from '../dto/create-or-update-post.dto';

@injectable()
export class PostsService {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly blogsQueryRepository: BlogsQueryRepository,
  ) {}
  async createPost(postPayload: CreateOrUpdatePostDto): Promise<PostViewModel> {
    const { title, shortDescription, content, blogId } = postPayload;

    const blog = await this.blogsQueryRepository.getBlogById(blogId);
    if (!blog) throw new NotFoundException();

    const entity = PostEntity.create({
      title,
      shortDescription,
      content,
      blogId,
      blogName: blog.name,
    });
    const saved = await this.postsRepository.save(entity);

    return saved.toViewModel('None', []);
  }
  async updatePost(id: string, updateData: PostInputModel): Promise<void> {
    const postEntity = await this.postsRepository.getById(id);
    if (!postEntity) throw new NotFoundException();
    if (postEntity.blogId !== updateData.blogId) throw new NotFoundException();

    const blog = await this.blogsQueryRepository.getBlogById(updateData.blogId);
    if (!blog) throw new NotFoundException();

    postEntity.update(updateData, blog.name);
    await this.postsRepository.save(postEntity);
  }
  async deletePostById(postId: string): Promise<void> {
    const deletedPost = await this.postsRepository.deletePostById(postId);
    if (!deletedPost) throw new NotFoundException();
  }
  async deletePostByBlogAndPostId(
    blogId: string,
    postId: string,
  ): Promise<void> {
    const deletedPost = await this.postsRepository.deletePostByBlogAndPostId(
      blogId,
      postId,
    );
    if (!deletedPost) throw new NotFoundException();
  }
  async setPostLikeStatus(
    postId: string,
    userId: string,
    userLogin: string,
    likeStatus: LikeStatus,
  ) {
    const result = await this.postsRepository.setPostLikeStatus(
      postId,
      userId,
      userLogin,
      likeStatus,
    );
    if (result === 'NOT_FOUND') throw new NotFoundException();
  }
}

@injectable()
export class PostsQueryService {
  constructor(
    @inject(PostsQueryRepository)
    private readonly postsQueryRepository: PostsQueryRepository,
  ) {}

  async getPosts(
    query: PaginationDto,
    currentUserId?: string,
  ): Promise<Paginator<PostViewModel>> {
    const { items, totalCount } =
      await this.postsQueryRepository.getPosts(query);
    if (!items.length) throw new NotFoundException();
    const postIds = items.map((p) => p._id.toString());

    const [newestMap, myMap] = await Promise.all([
      this.postsQueryRepository.listNewestLikes(postIds, 3),
      this.postsQueryRepository.listMyStatuses(postIds, currentUserId),
    ]);

    const view = items.map((p) => {
      const entity = PostEntity.fromPersistence(p);
      const myStatus = myMap.get(p._id.toString()) ?? 'None';
      const newestLikes = newestMap.get(p._id.toString()) ?? [];
      return entity.toViewModel(myStatus, newestLikes);
    });

    return buildPaginator(query, totalCount, view);
  }

  async getPostById(
    id: string,
    currentUserId?: string,
  ): Promise<PostViewModel | null> {
    const post = await this.postsQueryRepository.getPostById(id);
    if (!post) throw new NotFoundException();

    const [my, newest] = await Promise.all([
      this.postsQueryRepository.listMyStatuses(
        [post._id.toString()],
        currentUserId,
      ),
      this.postsQueryRepository.listNewestLikes([post._id.toString()], 3),
    ]);

    const entity = PostEntity.fromPersistence(post);
    return entity.toViewModel(
      my.get(post._id.toString()) ?? 'None',
      newest.get(post._id.toString()) ?? [],
    );
  }
  async getPostsByBlogId(
    blogId: string,
    query: PaginationQuery,
    currentUserId?: string,
  ): Promise<Paginator<PostViewModel>> {
    const { items, totalCount } =
      await this.postsQueryRepository.getPostsByBlogId(blogId, query);
    if (!items.length) throw new NotFoundException();
    const postIds = items.map((p) => p._id.toString());

    const [newestMap, myMap] = await Promise.all([
      this.postsQueryRepository.listNewestLikes(postIds, 3),
      this.postsQueryRepository.listMyStatuses(postIds, currentUserId),
    ]);

    const view = items.map((p) => {
      const entity = PostEntity.fromPersistence(p);
      const myStatus = myMap.get(p._id.toString()) ?? 'None';
      const newestLikes = newestMap.get(p._id.toString()) ?? [];
      return entity.toViewModel(myStatus, newestLikes);
    });

    return buildPaginator(query, totalCount, view);
  }
}
