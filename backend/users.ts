export class User {
    constructor(
        public email: string,
        public name: string,
        private password: string
    ){}

    matches(another: User): boolean{
        return another !== undefined && another.email === this.email && another.password === this.password
    }
}

export const users: {[key: string]: User} = {
    "vitor@gmail.com": new User("vitor@gmail.com", "Vitor", "vitor123"),
    "rafa@gmail.com": new User("rafa@gmail.com", "Rafa", "rafa123")
}