import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { AxiosResponse } from 'axios';
import axios from 'axios';
import {
  mockUsersData,
  mockUsersDataFrom20230101To20230105,
  mockUsersDataMyJob,
  mockUsersDataFrom20230111To20230115MyJob,
  mockUsersDataFrom20230116To20230120,
} from './mock-users-data'; // Create a mock data file for testing

describe('UsersController', () => {
  let usersController: UsersController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
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
          headers: undefined,
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
          headers: undefined,
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
          headers: undefined,
        },
      };

      jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse);

      const users = await usersController.getUsers({
        createdFrom: '2023-01-16T01:00:00Z',
      });
      expect(users).toEqual(mockUsersDataFrom20230116To20230120);
    });

    it('should return correct user data while queried by createdTo', async () => {
      const axiosResponse: AxiosResponse = {
        data: mockUsersData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined,
        },
      };

      jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse);

      const users = await usersController.getUsers({
        createdTo: '2023-01-05T19:00:00Z',
      });

      expect(users).toEqual(mockUsersDataFrom20230101To20230105);
    });

    it('should return correct user data while queried by jobType', async () => {
      const axiosResponse: AxiosResponse = {
        data: mockUsersData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined,
        },
      };

      jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse);

      const users = await usersController.getUsers({ jobType: 'MyJob' });

      expect(users).toEqual(
        mockUsersDataMyJob.concat(mockUsersDataFrom20230111To20230115MyJob),
      );
    });

    it('should return correct user data while queried by createdFrom, createdTo and jobType', async () => {
      const axiosResponse: AxiosResponse = {
        data: mockUsersData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
          headers: undefined,
        },
      };

      jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse);

      const users = await usersController.getUsers({
        createdFrom: '2023-01-11T20:00:00Z',
        createdTo: '2023-01-15T23:00:00Z',
        jobType: 'MyJob',
      });

      expect(users).toEqual(mockUsersDataFrom20230111To20230115MyJob);
    });
  });
});
