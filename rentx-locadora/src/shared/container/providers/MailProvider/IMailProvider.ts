interface IMailProvider {

  sendMail(email: string, subject: string, body: string): Promise<void>;
}

export { IMailProvider };
