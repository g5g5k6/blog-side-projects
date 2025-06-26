import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client.setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount(email, password, name){
        try {
            const userAccount =await this.account.create(ID.unique(), email, password, name)
            if (userAccount){
                return this.login({email, password})
            }
            else{
                console.log("Appwrite service :: createAccount ");
                return userAccount
            }
        } catch (error) {
            console.log("Appwrite service :: createAccount:: ", error);
            throw error
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Appwrite service :: login:: ", error);
            throw error
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser() :: ", error);
        }
        return null
    }
    async logout(){
        try {
            return await account.deleteSession("current");
        } catch (error) {
            console.log("Appwrite service :: logout():: deleteSession", error);
        }

    }

}
const authService = new AuthService()
    
export default authService

const account = new Account(client);

account.get().then(console.log).catch(console.error);