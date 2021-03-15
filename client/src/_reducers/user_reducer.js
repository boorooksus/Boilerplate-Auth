import {
    LOGIN_USER, 
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';

export default function (state = {}, action){
    // 받은 데이터의 타입에 따라 처리
    // reducer는 previousState와 action 통해서 
    // nextState를 리턴
    switch (action.type) {
        case LOGIN_USER:
                // '...state': spread operator. 위의 function의 state 인자를 똑같이 가져옴
                //'loginsuccess ~ .payload': user_action에서 받은 payload를 loginSuccess에 넣음
            return { ...state, loginSuccess: action.payload }
            break;

        case REGISTER_USER:
            return { ...state, register: action.payload }
            break;

            case AUTH_USER:
                return { ...state, userData: action.payload }
                break;
    
        default:
            return state;
            break;
    }
}