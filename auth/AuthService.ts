import { User } from "@/app/api/login/route";
import axios, { AxiosInstance } from "axios";

export class AuthService {
  private readonly instance: AxiosInstance;

  public constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3001/api",
    });
  }

  public async login(username: string, password: string): Promise<User> {
    const response = await this.instance
      .post("/login", { username, password })
      .then((response) => response.data);
    return {
      id: response.id,
      name: response.name,
      userName: response.username,
    } as User;
  }
}
export const authService = new AuthService();
