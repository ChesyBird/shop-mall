import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api"

const SignIn = ({onLogin}) => {
    const [formData, setFormData] = useState({
        username: "",  //id
        password: "",   //password
    })

    const {username, password} = formData;

    // 페이지 이동 훅 - useNavigate()
    const navigate = useNavigate();

    // 로그인 결과 상태 관리
    const [loginResult, setLoginResult] = useState("");

    //입력값 변경 함수
    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    // 폼 제출 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 유효성 검사
        if(!username.trim() || !password.trim()){
            alert("모든 항목을 입력하세요.");
        }

        // 서버에 로그인 요청
        try{
           const response = await api.get(`/users/${username}`);
           console.log(response);
           // 아이디 있음(user.username)
           const user = response.data; // 서버에서 받아온 사용자 정보
           // 비밀번호 확인(db에 있는 비번과 외부에서 입력한 비번 비교)
           if(user.password === password){
              setLoginResult("success");
              // 로그인 성공시 부모컴포넌트(App.jsx)에 로그인 상태 저장
              onLogin(user.username);
              alert("로그인 되었습니다.");
              navigate('/');  // 메인페이지로 이동
           }else{
            setLoginResult("fail");
           }
        }catch(error){
            alert("로그인 중 오류가 발생했습니다.", error);
        }
    }

    return(
        <div className="sign-in">
            <h2>로그인</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type="text" 
                        name="username"
                        placeholder="아이디 입력"
                        value={username}
                        onChange={handleInputChange}
                    />
                 </div> 
                 <div> 
                    <input 
                        type="password" 
                        name="password"
                        placeholder="비밀번호 입력"
                        value={password}
                        onChange={handleInputChange}
                    />
                 </div>  
                 <div>
                    <button type="submit">로그인</button>
                </div>
            </form>

            {/* 회원 가입 링크 */}
            <p className="signup-link">
                아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
            </p>

            {/* 결과 메시지 출력 */}
            {loginResult === "fail" && (
                <p style={{color: "red"}}>아이디 또는 비밀번호가 일치하지 않습니다.</p>
            )}
        </div>
    )
}

export default SignIn;