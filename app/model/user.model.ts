interface UserType {
  id: number;
  name: string;
  document: string;
  nickname: string;
  email: string;
  access_token: string;
  type: "pf" | "pj";
}

class User implements UserType {
  id: number;
  name: string;
  document: string;
  nickname: string;
  email: string;
  access_token: string;
  type: "pf" | "pj";

  constructor(params?: UserType) {
    Object.assign(this, params);
  }
}
