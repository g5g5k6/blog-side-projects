import conf from "../config/config";
import { Client, Account, ID } from "appwrite";
import  getFriendlyErrorMessage  from "./errorHandler"
export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
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
            throw getFriendlyErrorMessage(error)
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
            return await this.account.deleteSession("current");
        } catch (error) {
            console.log("Appwrite service :: logout():: deleteSession", error);
        }

    }

}
const authService = new AuthService()
    
export default authService
