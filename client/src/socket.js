import io from 'socket.io-client';
import {BASE_URL_SERVER} from "./constants/api.ts";

export const socket = io(BASE_URL_SERVER, {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
});
