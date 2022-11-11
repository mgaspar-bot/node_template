
type userObj = {username : string, id: string};

class ConnectedUsers {
    #usersNow: userObj[] = [];
    static #instance : ConnectedUsers;
    
    constructor () {
        if (ConnectedUsers.#instance instanceof ConnectedUsers) {
            return ConnectedUsers.#instance;
        }
        ConnectedUsers.#instance = this;
    }

    addUser (newUser : userObj): void {
        this.#usersNow.push(newUser);
    }

    removeUser(userLeft : userObj) : void {
        let index = this.#usersNow.findIndex((element : userObj) => (element.id === userLeft.id && element.username === userLeft.username));
        this.#usersNow.splice(index, 1);
    }
}


module.exports =  new ConnectedUsers();