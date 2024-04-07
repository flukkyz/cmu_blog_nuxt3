export {
  Password,
  PasswordConfirmation,
  Email,
  Login,
  ChangePassword,
  Authentication,
};

declare global {
  interface Password {
    password: string;
  }
  interface PasswordConfirmation extends Password {
    passwordConfirmation: string;
  }
  interface Email {
    email: string;
  }
  interface Login extends Password {
    username: string;
  }

  interface ChangePassword extends PasswordConfirmation {
    oldPassword: string;
  }
  interface Authentication {
    accessToken?: string;
    refreshToken?: string;
  }
}
