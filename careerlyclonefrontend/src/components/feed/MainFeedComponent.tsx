import React, { useState } from 'react';
import '../../css/pages/MainPage.scss';
import FeedContentComponent from './FeedContentComponent';


interface feedProps {
  nickName: string,
  positionJob: string,
  profileImg: string,
  date?: string,
  title: string,
  contents?: string
}

interface feedContentProps {
  title: string,
  content?: string
}

const MainFeedComponent = ({feedData}: { feedData: feedProps[] }) => {
  const renderFeed = (feedData: feedProps[]) => {
    return feedData.map(data => (
      <div className='feed-frame--element'>
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
        <FeedContentComponent feedContentData={{ title: data.title, content: data.contents }}/>
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