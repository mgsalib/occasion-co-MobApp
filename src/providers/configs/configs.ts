
import { Injectable } from '@angular/core';

export const ENDPOINT: string = "http://apicoretest.bebrand.tv/api/";
export const UPLOAD_ENDPOINT: string = "http://apicoretest.bebrand.tv/api/FileUpload/Uploadfiles";
export const AUTHTYPE: string = "#$#$%*@@##m0%%##";
export const TIMEOUT: number = 60000;

@Injectable()
export class ConfigClass {
    static get getEndpoint() {
        return ENDPOINT;
    }

    static get getUploadEndpoint() {
        return UPLOAD_ENDPOINT;
    }

    static get getTimeout() {
        return TIMEOUT;
    }

    static get getAuthType() {
        return AUTHTYPE;
    }
}
