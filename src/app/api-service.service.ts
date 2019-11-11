import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  login(data){
    return this.http.post("https://snetwork.azurewebsites.net/api/login?code=KSHkox2S0QkmtR1CreYXnMBMg7QjwiGjUKtPNCdkMP2W6hsmYQyvQg==", data)
  }

  register(data){
    return this.http.post("https://snetwork.azurewebsites.net/api/createUser?code=9VKx3k3kSa6AQbO9Im5z5xVMXV216qNss/lpwPLITreimRZPIGJckA==", data);
  }

  follow(data){
    return this.http.post("https://snetwork.azurewebsites.net/api/follow?code=YHyA3hHAK0YxWdVWLMtqzaCILAJHtsg9iaQvqrvHYLFyHdHGf5XOHA==", data);
  }

  getFollowed(data){
    return this.http.post("https://snetwork.azurewebsites.net/api/getFollowed?code=w70PamAMNniH9eFITkh/dYsL97ye6FXeKKoAcHBrs63Ev4N07e2lGA==", data);
  }

  getPosts(data){
    return this.http.post("https://snetwork.azurewebsites.net/api/getPosts?code=2kArNn6yBHRenLU2/K3r3rP5G6dOEnLEWvkBOO3QrtbkV0OtJWnMJw==", data);
  }

  post(data){
    return this.http.post("https://snetwork.azurewebsites.net/api/post?code=eXr9enPanWAItxtnUxgcgvgT6kixnU2eKVraIt5CEudCHF8EF1iLgg==", data);
  }

  deletePost(data){
    return this.http.post("https://snetwork.azurewebsites.net/api/deletePost?code=bImh8Cu6cWBwwMy1lFj1G2IwrciHzOwPE0LIUmnl9j8aH8X4o8ZA/Q==", data);
  }

  updatePost(data){
    return this.http.post("https://snetwork.azurewebsites.net/api/editPost?code=P3R8JazaiuXq9GTZv1vhhNrxh4FmEZ4d7EoR1Aq6m/nSNDEslk4Bvg==", data);
  }

}
