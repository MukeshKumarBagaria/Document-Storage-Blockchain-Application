import { UserRepository } from "../repository/index.js"
class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async Signup(data) {
        console.log("data from userservice",data);
        console.log(data);
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("somethign went wrong in the UserService");
        }
    }
    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.findBy({email})
            return user;
        } catch(error) {
            throw error;
        }
    }
    async signin(data) {
        try {
            const user = await this.getUserByEmail(data.email);
            if(!user) {
                throw {
                    message: 'no user found'
                };
            }
            if(!user.comparePassword(data.password)) {
                throw {
                    message: 'incorrect password',
                };
            }
            const token = user.genJWT();
            return token;
        } catch(error) {
            throw error;
        }
    }
   
}
export default UserService;