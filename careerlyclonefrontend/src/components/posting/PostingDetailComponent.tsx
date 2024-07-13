import React from 'react';
import '../../css/pages/MainPage.scss';
// import { useLocation } from 'react-router-dom';


interface postingProps {
  nickName: string,
  positionJob: string,
  profileImg: string,
  date?: string,
  title: string,
  content?: string
  token: string  // 게시글의 아이디 개념 , 대체키
}

/*
* Route를 이용하는 방식보다 컴포넌트 교체 방식이 렌더링 측면에서 효율적이고
* 레퍼런스 또한 컴포넌트 교체 방식으로 동작하는 것을 확인하여 컴포넌트 교체 방식으로 수정함
* 이벤트 버블링과 프로퍼티 전달 방식 중에 프로퍼티 전달 방식을 택함
* 이유는 구조가 복잡하지 않고 데이터 전달이 필요해 프로퍼티 전달이 필요했기 때문
*/
const PostingDetailComponent = ({ postingData, onBack }: { postingData: postingProps, onBack: () => void }) => {
  const renderFeed = (postingData: postingProps) => {
    return (
      <div className='feed-frame--element'>
        <button onClick={onBack}>&lt; Home</button>
        <div className='feed-profile'>
          <img className='feed-profile--img' src={postingData.profileImg} alt="profileImg" />
          <div className='feed-profile-detail'>
            <div className='feed-nickname'>
              <span>{postingData.nickName}</span>
            </div>
            <div className='feed-position'>
              <span>{postingData.positionJob}</span>
            </div>
            <div className='feed-date'>
              <span>{postingData.date}</span>
            </div>
          </div>
        </div>
        <div>
          <h2>{postingData.title}</h2>
        </div>
        <div>
          <p>{postingData.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className='feed-frame'>
      {renderFeed(postingData)}
    </div>
  );
}

export default PostingDetailComponent;