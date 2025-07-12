import conf from "../config/config";
import { Client, Storage, ID } from "appwrite";

export class StorageService {
    client = new Client();
    bucket;
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                    ID.unique(),
                    file
                )
        } catch (error) {
            console.log("Appwrite service :: uploadFile() :: ", error);
            return false
        }
    }

    async deleteFile(fileID) {
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                    fileID,
                )
        } catch (error) {
            console.log("Appwrite service :: deleteFile() :: ", error);
            return false
        }
    }

    getFilePreview(fileId) {
    if (!fileId) return "";
    try {
        const url=this.bucket.getFileView(conf.appwriteBucketId, fileId);
        console.log("imgUrl:", url);
        return url
    } catch (error) {
        console.error('getFilePreview error:', error);
        return "";
    }
    }


}

const storageservice =new StorageService()

export default storageservice;

