import React, { useRef } from "react";
import MainFeedComponent from "../components/feed/MainFeedComponent";
import "../css/pages/MainPage.scss";
import SubFeedComponent from "../components/feed/SubFeedComponent";
import axios from "axios";
import { useEffect, useState } from "react";
import CreateButton from "../components/buttons/CreateButton";

interface feedProps {
  nickName: string;
  positionJob: string;
  profileImg: string;
  date?: string;
  title: string;
  contents?: string;
  token: string; // 게시글의 아이디 개념 , 대체키
  commentCnt?: number;
}

const MainPage: React.FC = () => {
  // 카카오 서버로 부터 받은 accessToken 임시처리
  const params = new URL(document.URL).searchParams;
  // 인가코드는 백엔드로 넘겨서 reponse로 jwt 토큰 받기
  const code = params.get("code");
  // const [mainFeedData, setMainFeedData] = useState<feedProps[]>([]);
  // 중복 방지
  const calledOnce = useRef(false);
  useEffect(() => {
    if (!calledOnce.current) {
      getMainFeedData();
      calledOnce.current = true;
    }
  }, []);

  // http://careerwry.site:9002/
  const [mainFeedData, setMainFeedData] = useState<feedProps[]>([
    {
      nickName: "개개발발자자",
      positionJob: "어딘가의 프론트엔드 개발자",
      profileImg:
        "https://e7.pngegg.com/pngimages/1000/665/png-clipart-computer-icons-profile-s-free-angle-sphere.png",
      date: "5월 3일",
      title: "test test",
      contents:
        '{"blocks":[{"key":"1","text":"Hello, World!","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}',
      token: "temp1",
      commentCnt: 0,
    },
  ]);

  const tempSubData: feedProps[] = [
    {
      nickName: "개개발발자자",
      positionJob: "어딘가의 프론트엔드 개발자",
      profileImg:
        "https://e7.pngegg.com/pngimages/1000/665/png-clipart-computer-icons-profile-s-free-angle-sphere.png",
      title: "우와아앙",
      token: "temp3",
    },
    {
      nickName: "자자발발개개",
      positionJob: "어딘가의 백엔드 개발자",
      profileImg:
        "https://cdn.pixabay.com/photo/2020/05/17/20/21/cat-5183427_1280.jpg",
      title: "lorem ipsum",
      token: "temp4",
    },
    {
      nickName: "tempName",
      positionJob: "Temp developer",
      profileImg:
        "https://img.freepik.com/premium-vector/question-mark-in-person-head-icon-as-unknown-secret-anonym-user-profile-or-doubt-secret-brain-mind_101884-2200.jpg?w=360",
      title: "Temp Title",
      token: "temp5",
    },
    {
      nickName: "tempName",
      positionJob: "Temp developer",
      profileImg:
        "https://img.freepik.com/premium-vector/question-mark-in-person-head-icon-as-unknown-secret-anonym-user-profile-or-doubt-secret-brain-mind_101884-2200.jpg?w=360",
      title: "Temp Title",
      token: "temp6",
    },
    {
      nickName: "tempName",
      positionJob: "Temp developer",
      profileImg:
        "https://img.freepik.com/premium-vector/question-mark-in-person-head-icon-as-unknown-secret-anonym-user-profile-or-doubt-secret-brain-mind_101884-2200.jpg?w=360",
      title: "Temp Title",
      token: "temp7",
    },
    {
      nickName: "tempName",
      positionJob: "Temp developer",
      profileImg:
        "https://img.freepik.com/premium-vector/question-mark-in-person-head-icon-as-unknown-secret-anonym-user-profile-or-doubt-secret-brain-mind_101884-2200.jpg?w=360",
      title: "Temp Title",
      token: "temp8",
    },
    {
      nickName: "tempName",
      positionJob: "Temp developer",
      profileImg:
        "https://img.freepik.com/premium-vector/question-mark-in-person-head-icon-as-unknown-secret-anonym-user-profile-or-doubt-secret-brain-mind_101884-2200.jpg?w=360",
      title: "Temp Title",
      token: "temp9",
    },
    {
      nickName: "tempName",
      positionJob: "Temp developer",
      profileImg:
        "https://img.freepik.com/premium-vector/question-mark-in-person-head-icon-as-unknown-secret-anonym-user-profile-or-doubt-secret-brain-mind_101884-2200.jpg?w=360",
      title: "Temp Title",
      token: "temp10",
    },
  ];

  // async/await with axios
  const getMainFeedData = async () => {
    try {
      const response = await axios.get("http://careerwry.site:9002/posts", {
        headers: {
          token: code,
        },
        params: {
          page: 0,
          size: 5,
          sort: "createdDate,desc",
        },
      });
      console.log("response >>", response.data);
      const feedData = response.data.data.content;
      setMainFeedData((prevData) => [...prevData, ...feedData]);
    } catch (err) {
      console.log("Error >>", err);
    }
  };

  // 스크롤 추가

  return (
    <div>
      <div className="root-content-grid-container">
        <div className="grid-item-content--main">
          로그인 됨, Main
          <br />
          <MainFeedComponent feedData={mainFeedData} />
        </div>
        <div className="grid-item-content--sub">
          여긴 sub
          <SubFeedComponent feedData={tempSubData} />
        </div>
      </div>
      <CreateButton />
    </div>
  );
};

// TODO Kakao SignUp

export default MainPage;
