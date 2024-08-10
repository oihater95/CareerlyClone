import React from 'react';
import MainFeedComponent from '../components/feed/MainFeedComponent';
import '../css/pages/MainPage.scss'
import SubFeedComponent from '../components/feed/SubFeedComponent';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface feedProps {
  nickName: string,
  positionJob: string,
  profileImg: string,
  date?: string,
  title: string,
  contents?: string
  token: string  // 게시글의 아이디 개념 , 대체키
  commentCnt?: number
}

const MainPage: React.FC = () => {
  // 카카오 서버로 부터 받은 accessToken 임시처리
  const params = new URL(document.URL).searchParams;
  // 인가코드는 백엔드로 넘겨서 reponse로 jwt 토큰 받기
  const code = params.get('code');

  useEffect(() => {
    getMainFeedData();
  }, []);

  // http://careerwry.site:9002/
  let tempMainData: feedProps[]= [
    {
      nickName: '개개발발자자',
      positionJob: '어딘가의 프론트엔드 개발자',
      profileImg: 'https://e7.pngegg.com/pngimages/1000/665/png-clipart-computer-icons-profile-s-free-angle-sphere.png',
      date: '5월 3일',
      title: '우와아앙',
      contents: '이것이 첫글이지롱',
      token: 'temp1',
      commentCnt: 0,
    },
    {
      nickName: '자자발발개개',
      positionJob: '어딘가의 백엔드 개발자',
      profileImg: 'https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg',
      date: '5월 4일',
      title: 'lorem ipsum',
      contents: `What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
      Why do we use it?
      It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
      Where does it come from?
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
      The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
      Where can I get some?
      There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`,
      token: 'temp2',
      commentCnt: 0,
    }
  ];

  const tempSubData: feedProps[]= [
    {
      nickName: '개개발발자자',
      positionJob: '어딘가의 프론트엔드 개발자',
      profileImg: 'https://e7.pngegg.com/pngimages/1000/665/png-clipart-computer-icons-profile-s-free-angle-sphere.png',
      title: '우와아앙',
      token: 'temp3',
    },
    {
      nickName: '자자발발개개',
      positionJob: '어딘가의 백엔드 개발자',
      profileImg: 'https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg',
      title: 'lorem ipsum',
      token: 'temp4',
    },
    {
      nickName: 'tempName',
      positionJob: 'Temp developer',
      profileImg: 'https://img.freepik.com/premium-vector/question-mark-in-person-head-icon-as-unknown-secret-anonym-user-profile-or-doubt-secret-brain-mind_101884-2200.jpg?w=360',
      title: 'Temp Title',
      token: 'temp5',
    },
    {
      nickName: 'tempName',
      positionJob: 'Temp developer',
      profileImg: 'https://img.freepik.com/premium-vector/question-mark-in-person-head-icon-as-unknown-secret-anonym-user-profile-or-doubt-secret-brain-mind_101884-2200.jpg?w=360',
      title: 'Temp Title',
      token: 'temp6',
    },
    {
      nickName: 'tempName',
      positionJob: 'Temp developer',
      profileImg: 'https://img.freepik.com/premium-vector/question-mark-in-person-head-icon-as-unknown-secret-anonym-user-profile-or-doubt-secret-brain-mind_101884-2200.jpg?w=360',
      title: 'Temp Title',
      token: 'temp7',
    },
    {
      nickName: 'tempName',
      positionJob: 'Temp developer',
      profileImg: 'https://img.freepik.com/premium-vector/question-mark-in-person-head-icon-as-unknown-secret-anonym-user-profile-or-doubt-secret-brain-mind_101884-2200.jpg?w=360',
      title: 'Temp Title',
      token: 'temp8',
    },
    {
      nickName: 'tempName',
      positionJob: 'Temp developer',
      profileImg: 'https://img.freepik.com/premium-vector/question-mark-in-person-head-icon-as-unknown-secret-anonym-user-profile-or-doubt-secret-brain-mind_101884-2200.jpg?w=360',
      title: 'Temp Title',
      token: 'temp9',
    },
    {
      nickName: 'tempName',
      positionJob: 'Temp developer',
      profileImg: 'https://img.freepik.com/premium-vector/question-mark-in-person-head-icon-as-unknown-secret-anonym-user-profile-or-doubt-secret-brain-mind_101884-2200.jpg?w=360',
      title: 'Temp Title',
      token: 'temp10',
    },
  ];
  const [mainFeedData, setMainFeedData] = useState<feedProps[]>(tempMainData);


  // async/await with axios
  const getMainFeedData = async () => {
    try {
      const response = await axios.get('http://careerwry.site:9002/posts', {
        headers: {
          token: code,
        },
        params: {
          page: 0,
          size: 5,
          sort: 'createdDate,desc',
        }
      })
      const feedData = response.data.data.content;
      tempMainData = tempMainData.concat(feedData);
      console.log("response >>", response.data)
      setMainFeedData(tempMainData);
    } catch(err) {
      console.log("Error >>", err);
    }
  }


  return (
    <div className='root-content-grid-container'>
      <div className='grid-item-content--main'>
        로그인 됨, Main
        <br/>
        <MainFeedComponent feedData={mainFeedData} />
      </div>
      <div className='grid-item-content--sub'>
        여긴 sub
        <SubFeedComponent feedData={tempSubData} />
      </div>
    </div>
  );
};


// TODO Kakao SignUp

export default MainPage;