export interface LoginAndSignupResponse {
  accessToken: string;
  expiresIn: string;
  data: {
    role: string;
    _id: string;
    email: string;
  };
}
