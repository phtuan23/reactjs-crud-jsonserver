class Auth {
    constructor() {
        this.auth = false;
    }

    login() {
        this.auth = true;
    }

    logout() {
        this.auth = false;
    }

    isAuth() {
        return this.auth;
    }
}

export default new Auth();