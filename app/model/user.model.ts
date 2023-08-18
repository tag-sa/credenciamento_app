interface UserType {
  id: number;
  name: string;
  nickname: string;
  email: string;
  access_token: string;
}

class User implements UserType {
  id: number;
  name: string;
  nickname: string;
  email: string;
  access_token: string;

  constructor(params?: UserType) {
    Object.assign(this, params);
  }
}
