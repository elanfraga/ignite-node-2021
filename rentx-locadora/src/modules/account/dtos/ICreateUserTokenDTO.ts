interface ICreateUserTokenDTO {
  user_id: string;
  exipres_date: Date;
  refresh_token: string;
}

export { ICreateUserTokenDTO };
