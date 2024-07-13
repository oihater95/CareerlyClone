import React from 'react';
import '../../css/pages/MainPage.scss';
import FeedContentComponent from './FeedContentComponent';


interface feedProps {
  nickName: string,
  positionJob: string,
  profileImg: string,
  date?: string,
  title: string,
  contents?: string,
  token: string,  // 게시글의 아이디 개념 , 대체키
  commentSize?: number
}

const MainFeedComponent = ({feedData, onPostingDetailView}: { feedData: feedProps[], onPostingDetailView: (data: feedProps) => void }) => {
  const renderFeed = (feedData: feedProps[]) => {
    return feedData.map(data => (
      <div className='feed-frame--element' key={data.token}>
        <div className='feed-profile'>
          <img className='feed-profile--img' src={data.profileImg} alt="profileImg" />
          <div className='feed-profile-detail'>
            <div className='feed-nickname'>
              <span>{data.nickName}</span>
            </div>
            <div className='feed-position'>
              <span>{data.positionJob}</span>
            </div>
            <div className='feed-date'>
              <span>{data.date}</span>
            </div>
          </div>
        </div>
        <FeedContentComponent 
          feedContentData={{ 
            nickName: data.nickName,
            positionJob: data.positionJob,
            profileImg: data.profileImg,
            date: data.date || undefined,
            title: data.title,
            content: data.contents || undefined,
            token: data.token
          }}
          onPostingDetailView={onPostingDetailView}
        />
      </div>
    ));
  }

  return (
    <div className='feed-frame'>
      {renderFeed(feedData)}
    </div>
  );
}

export default MainFeedComponent;