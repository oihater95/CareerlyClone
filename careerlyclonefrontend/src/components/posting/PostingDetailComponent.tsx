import React, { useState } from 'react';
import '../../css/pages/MainPage.scss';


interface feedProps {
  nickName: string,
  positionJob: string,
  profileImg: string,
  date?: string,
  title: string,
  contents?: string
  token: string  // 게시글의 아이디 개념 , 대체키
  commentSize?: number
}

interface feedContentProps {
  title: string,
  content?: string
}

const PostingDetailComponent = ({feedData}: { feedData: feedProps }) => {
  const renderFeed = (feedData: feedProps) => {
    return (
      <div className='feed-frame--element'>
        <div className='feed-profile'>
          <img className='feed-profile--img' src={feedData.profileImg} alt="profileImg" />
          <div className='feed-profile-detail'>
            <div className='feed-nickname'>
              <span>{feedData.nickName}</span>
            </div>
            <div className='feed-position'>
              <span>{feedData.positionJob}</span>
            </div>
            <div className='feed-date'>
              <span>{feedData.date}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='feed-frame'>
      {renderFeed(feedData)}
    </div>
  );
}

export default PostingDetailComponent;