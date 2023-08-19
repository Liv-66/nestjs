import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './user.service';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { mockUsersData } from './mock-users-data'; // Create a mock data file for testing

describe('UsersService', () => {
  let usersService: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return users', async () => {
      const axiosResponse: AxiosResponse = {
        data: mockUsersData, // Use your mock data here
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined,
        },
      };

      jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse);

      const users = await usersService.getUsers();

      expect(users).toEqual(mockUsersData); // Ensure the returned data matches the mock data
    });

    it('should handle errors', async () => {
      jest.spyOn(axios, 'get').mockRejectedValue(new Error('Mocked error'));

      await expect(usersService.getUsers()).rejects.toThrowError(
        'Mocked error',
      );
    });
  });
});
