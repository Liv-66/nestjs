import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class UsersService {
  private baseUrl = 'https://64d5e658754d3e0f13614839.mockapi.io';

  async getUsers() {
    const response = await axios.get(`${this.baseUrl}/api/users`);
    return response.data;
  }
}
