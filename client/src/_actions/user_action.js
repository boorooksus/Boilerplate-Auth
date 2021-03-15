import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from './types';
export function loginUser(dataToSubmit){
    // 서버로 리퀘스트 날림 -> 서버로 부터 받은 데이터를 request에 저장
    const request = axios.post('/api/users/login', dataToSubmit)
        .then(response => response.data)

    return {
        type: LOGIN_USER, 
        payload: request
    }
}

export function registerUser(dataToSubmit){
    const request = axios.post('/api/users/register', dataToSubmit)
        .then(response => response.data)

    return {
        type: REGISTER_USER, 
        payload: request
    }
}

export function auth(){
    const request = axios.get('/api/users/auth')
        .then(response => response.data)

    return {
        type: AUTH_USER, 
        payload: request
    }
}
