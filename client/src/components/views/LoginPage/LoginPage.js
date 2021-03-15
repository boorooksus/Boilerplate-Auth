import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import { loginUser} from '../../../_actions/user_action'
import {withRouter} from 'react-router-dom'
function LoginPage(props) {
    // dispatch 이용해서 action 취함(login user)
   const dispatch = useDispatch();
    
   // 이메일과 비밀번호입력되면  state로 저장.
    // 'useState("initialize")'에서 괄호 안에 초기설정 값 넣음(여기서는 빈string으로!)
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    // 정보 입력 때마다 값 입력 될 수 있도록하는 event handler
    // 입력된 정보를 state로 저장
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPassword = (event) => {
        setPassword(event.currentTarget.value)
    }
    // 전송 버튼 눌렀을 때 event 발생하게 함
    const onSubmitHandler = (event) => {
        // preventdefault: 페이지 리프레시 막아줌
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/')
                } else{
                    alert('Error')
                }
            })

        
    }

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
        }}>
            {/* 전송 버튼 눌렀을 때 event 발생하게 함 */}
            <form style={{ display: 'flex', flexDirection:'column'}} onSubmit={onSubmitHandler}
            >
                <label>Email</label>
                {/* 정보 입력할 때마다 값 state로 저장 */}
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPassword} />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)
