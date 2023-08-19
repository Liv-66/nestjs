import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.Controller';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import { mockUsersData } from './mock-users-data'; // Create a mock data file for testing

describe('UsersController', () => {
  let usersController: UsersController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersController],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('getUsers', () => {
    it('should handle empty responses', async () => {
      const axiosResponse: AxiosResponse = {
        data: [],
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        },
      };

      jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse);

      const users = await usersController.getUsers();

      expect(users).toEqual([]);
    });

    it('should return default 10 users', async () => {
      const axiosResponse: AxiosResponse = {
        data: mockUsersData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        },
      };

      jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse);

      const users = await usersController.getUsers();

      expect(users.length).toEqual(10);
    });

    it('should return correct user data while queried by createdFrom', async () => {
      const axiosResponse: AxiosResponse = {
        data: mockUsersData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        },
      };

      jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse);

      const users = await usersController.getUsers({ createdFrom: '2021-01-01' });

      expect(users).toEqual(mockUsersData);
    });

    it('should return correct user data while queried by createdTo', async () => {
      const axiosResponse: AxiosResponse = {
        data: mockUsersData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        },
      };

      jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse);

      const users = await usersController.getUsers({ createdTo: '2021-01-01' });

      expect(users).toEqual(mockUsersData);
    });

    it('should return correct user data while queried by jobType', async () => {
      const axiosResponse: AxiosResponse = {
        data: mockUsersData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        },
      };

      jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse);

      const users = await usersController.getUsers({ jobType: 'Full-time' });

      expect(users).toEqual(mockUsersData);
    });

    it('should return correct user data while queried by createdFrom, createdTo and jobType', async () => {
      const axiosResponse: AxiosResponse = {
        data: mockUsersData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined
        },
      };

      jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse);

      const users = await usersController.getUsers({ createdFrom: '2021-01-01', createdTo: '2021-01-02', jobType: 'Full-time' });

      expect(users).toEqual(mockUsersData);
    });
  });
});
