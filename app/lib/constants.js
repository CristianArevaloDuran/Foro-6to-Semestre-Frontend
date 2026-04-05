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

import {Email, UserId, Id, Visibility, VisibilityOff} from "./icons.js";

const ICONS = {
    VIEW: Visibility,
    EMAIL: Email,
    VIEWOFF: VisibilityOff,
    ID: Id,
    USERID: UserId
}

export { links, ICONS };