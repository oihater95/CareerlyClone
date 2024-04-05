import { REST_API_KEY, REDIRECT_URI, CLIENT_SECRET } from '../config/config';

const OAuth: React.FC = () => {
  // 카카오 서버로 부터 받은 accessToken 임시처리
  const params = new URL(document.URL).searchParams;
  const code = params.get('code');

  return (
    <div>
      로그인 됨
      <br/>
      {code}
    </div>
  );
};


// TODO Kakao SignUp

export default OAuth;