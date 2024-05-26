import React, { useState } from 'react';
import '../../css/pages/MainPage.scss';


interface feedProps {
  nickName: string,
  positionJob: string,
  profileImg: string,
  title: string,
}

const SubFeedComponent = ({feedData}: { feedData: feedProps[] }) => {
  // any type 수정 필요
  const renderFeed = (feedData: feedProps[]) => {
    return feedData.map(data => (
      <div className='subfeed-frame--element'>
        <div className='subfeed-profile'>
          <img className='subfeed-profile--img' src={data.profileImg} alt="profileImg" />
          <div className='subfeed-nickname'>
            <span>{data.nickName}</span>
          </div>
          <div className='subfeed-position'>
            <span>{data.positionJob}</span>
          </div>
        </div>
        <div className='subfeed-title'>
          <span>{data.title}</span>
        </div>
      </div>
    ));
  }

  return (
    <div className='feed-frame'>
      {renderFeed(feedData)}
    </div>
  );
}

export default SubFeedComponent;