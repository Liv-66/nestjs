import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { UsersService } from './user.service';
import { User } from './user.interface';

@ApiTags('users')
@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  @ApiOperation({ summary: 'Get users' })
  @ApiParam({
    name: 'createdFrom',
    required: false,
    type: String,
    description: 'Filter users created from this date.',
  })
  @ApiParam({
    name: 'createdTo',
    required: false,
    type: String,
    description: 'Filter users created to this date.',
  })
  @ApiParam({
    name: 'jobType',
    required: false,
    type: String,
    description: 'Filter users by job type.',
  })
  @ApiParam({
    name: 'page',
    required: false,
    type: Number,
    description: 'The page number.',
  })
  @ApiParam({
    name: 'pageSize',
    required: false,
    type: Number,
    description: 'The page size.',
  })
  @ApiResponse({
    status: 200,
    description: 'The users have been successfully fetched.',
    type: Array,
    isArray: true,
    schema: {
      nullable: true,
      type: 'array',
      example: [
        {
          id: '1',
          name: 'John Doe',
          jobType: 'Developer',
          createdAt: '2021-01-01T00:00:00.000Z',
          city: 'New York',
          zipCode: '10001',
          address: '5th Avenue',
          gender: 'Female',
        },
      ],
    },
  })
  async getUsers(
    @Query()
    filter?: { createdFrom?: string; createdTo?: string; jobType?: string },
    @Query() pagination?: { page: number; pageSize?: number },
  ) {
    const users = await this.usersService.getUsers();

    let filteredUsers = users;
    if (filter) {
      filteredUsers = this.filterUsers(users, filter);
    }

    const page = pagination?.page || 1;
    const pageSize = pagination?.pageSize || 10;

    const paginatedUsers = this.paginateUsers(filteredUsers, page, pageSize);

    return paginatedUsers;
  }

  private filterUsers(
    users: User[],
    filter: { createdFrom?: string; createdTo?: string; jobType?: string },
  ) {
    const parsedCreatedFrom = filter.createdFrom
      ? new Date(filter.createdFrom)
      : null;
    const parsedCreatedTo = filter.createdTo
      ? new Date(filter.createdTo)
      : null;

    return users.filter((user) => {
      const createdDate = new Date(user.createdAt);
      const createdDateMatch =
        parsedCreatedFrom && !parsedCreatedTo
          ? createdDate >= parsedCreatedFrom
          : !parsedCreatedFrom && parsedCreatedTo
          ? createdDate <= parsedCreatedTo
          : parsedCreatedFrom && parsedCreatedTo
          ? createdDate >= parsedCreatedFrom && createdDate <= parsedCreatedTo
          : true;
      const jobTypeMatch = filter.jobType
        ? user.jobType === filter.jobType
        : true;
      return createdDateMatch && jobTypeMatch;
    });
  }

  private paginateUsers(users: User[], page: number, pageSize: number) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return users.slice(startIndex, endIndex);
  }
}
