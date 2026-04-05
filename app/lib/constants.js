const links = [
    {
        name: "Home",
        link: "/"
    },
    {
        name: "Login",
        link: "/login"
    },
    {
        name: "Registro",
        link: "/register"
    }
]

import {Email, UserId, Id, Visibility, VisibilityOff, CloseX, SuccessStar, ErrorStar, Loading} from "./icons.js";

const ICONS = {
    VIEW: Visibility,
    EMAIL: Email,
    VIEWOFF: VisibilityOff,
    ID: Id,
    USERID: UserId,
    CLOSEX: CloseX,
    SUCCESSSTAR: SuccessStar,
    ERRORSTAR: ErrorStar,
    LOADING: Loading
}

export { links, ICONS };