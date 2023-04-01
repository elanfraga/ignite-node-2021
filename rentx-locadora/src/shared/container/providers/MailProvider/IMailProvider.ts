interface IMailProvider {

  sendMail(email: string, subject: string, variables: any, path: string): Promise<void>;
}

export { IMailProvider };
