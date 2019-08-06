import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {

  constructor() { }

  async getTodo(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
    const json = await response.json();

    return json;
  }

  async getPost(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    const json = await response.json();

    return json;
  }

}
