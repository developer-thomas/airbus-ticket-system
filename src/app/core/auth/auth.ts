export type SigninCredentials = {
  credential: string;
  password: string;
};

export type SigninCredentialsResponse = {
  token: string;
  user: User;
};

export type User = {
  createdAt: string;
  email: string;
  phone: string;
  userId: number;
  id: number;
  image: string;
  imageKey: string;
  name: string;
  password: string;
  status: string;
  type: string;
  updatedAt: string;
  plan: {
    name: string;
    intervalCount: number;
  };
};
