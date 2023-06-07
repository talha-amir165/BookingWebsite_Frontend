import GenericService from "./GenericService";
import jwtDecode from "jwt-decode";
class UserService extends GenericService {
    constructor() {
        super();
    }
    login = (email, password) =>
        new Promise((resolve, reject) => {
            this.post("auth/login", { email, password })
                .then((token) => {
                    localStorage.setItem("token", token);
                    resolve(token);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    register = (username, email, password) => {
        return new Promise((resolve, reject) => {
            this.post("auth/signup", { username, email, password })
                .then((response) => {
                    console.log(response);
                    resolve(response);
                })
                .catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });


    }
    logout = () => {
        localStorage.removeItem("token");
    };
    isLoggedIn = () => {
        return localStorage.getItem("token") ? true : false;
    };
    getLoggedInUser = () => {
        try {
            const jwt = localStorage.getItem("token");
            return jwtDecode(jwt);
        } catch (ex) {
            return null;
        }
    };
    isAdmin = () => {
        if (this.isLoggedIn()) {
            if (this.getLoggedInUser().isAdmin == true) return true;
            else return false;
        } else return false;
    };
}

let userService = new UserService();
export default userService;