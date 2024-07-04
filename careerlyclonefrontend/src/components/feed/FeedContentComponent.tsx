import React, { useEffect, useRef, useState } from 'react';
import '../../css/pages/MainPage.scss';

interface feedContentProps {
  nickName: string,
  positionJob: string,
  profileImg: string,
  date?: string,
  title: string,
  content?: string,
  token: string  // 게시글의 아이디 개념 , 대체키
}

const FeedContentComponent = ({feedContentData}: { feedContentData: feedContentProps }) => {
  const [isExpanded, setIsExpanded] = useState(false); // 더보기/접기 상태 관리
  const [isOverflowing, setIsOverflowing] = useState(false); // 콘텐츠가 넘치는지 여부 관리
  const contentRef = useRef<HTMLDivElement>(null); // 콘텐츠를 담는 div 요소에 접근하기 위한 ref
  
  // 콘텐츠의 높이를 계산하여 넘치는지 확인
  useEffect(() => {
    if (contentRef.current) {
      // 콘텐츠의 전체 높이(scrollHeight)가 div의 클라이언트 높이(clientHeight)보다 크면 콘텐츠가 넘침
      setIsOverflowing(contentRef.current.scrollHeight > contentRef.current.clientHeight);
    }
  }, [feedContentData]); // 콘텐츠가 변경될 때마다 실행

  return (
    <div className='feed-frame--content'>
      <div className='feed-title'>
        <p>{feedContentData.title}</p>
      </div>
      <div 
        ref={contentRef}
        style={{
          maxHeight: isExpanded ? 'none' : '4em', // 확장 상태에 따라 높이 설정 (3줄 기준: 4.5em)
        }}
        className='feed-content'>
        <p>{feedContentData.content}</p>
      </div>
      {isOverflowing && ( // 콘텐츠가 넘칠 때만 더보기/접기 버튼 표시
        <button className='feed-content--btn' onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? '> 접기' : '...더 보기'}
        </button>
      )}
    </div>
  )
}

export default FeedContentComponent;