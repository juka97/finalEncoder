//routes
export const LOGIN = "/";
export const LOGIN_POST="/login";
export const ENCODE_POST="/encode";
export const ALGORITHM = "/home";
export const TOKEN = "token";
export const PASSWORD_ERROR_MSG="Password should be at least 6 characters long and include at least 1 number";
export const EMAIL_ERROR_MSG="Email is invalid";
export const PASSWORD_REGEX=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!]{6,}$/i;
export const EMAIL_REGEX=/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i;

export const getToken = () => {
    return localStorage.getItem(TOKEN);
};