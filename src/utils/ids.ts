// xh 'https://raw.githubusercontent.com/walking-sunset/selection-task/master/README.md' |  rg 'data-testid=(".*")'  -o --replace '$1' | sort | uniq

export const tid = {
  emailInput: "email-input",
  passwordInput: "password-input",
  signupButton: "signup-button",
  signinButton: "signin-button",
  newTodoInput: "new-todo-input",
  newTodoAddButton: "new-todo-add-button",
  modifyButton: "modify-button",
  deleteButton: "delete-button",
  modifyInput: "modify-input",
  submitButton: "submit-button",
  cancelButton: "cancel-button",
}

export const localStorageKey = {
  jwtToken: "jwt-token",
}
