export class RequiredArgumentError extends Error {
    constructor(argName) {
      super(`argument ${argName} is required`);
      this.name = 'RequiredArgumentError';
    }
  }