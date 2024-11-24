import {
  isValidUsername,
  isIncludeSpecialChar,
  isIncludeNumber,
  isIncludeCapitalLetter,
} from "6pp";

export const usernameValidator = (username) => {
  if (!isValidUsername(username))
    return { isValid: false, errorMessage: "Username is invalid" };
  if (isIncludeCapitalLetter(username))
    return {
      isValid: false,
      errorMessage: "Username cannot have uppercase letters",
    };
};

export const fullNameValidator = (fullName) => {
  if (isIncludeNumber(fullName)) {
    return {
      isValid: false,
      errorMessage: "Numbers are not allowed",
    };
  }
  if (/[^a-zA-Z\s]/.test(fullName)) {
    return {
      isValid: false,
      errorMessage: "Only spaces are allowed as special characters",
    };
  }
};
