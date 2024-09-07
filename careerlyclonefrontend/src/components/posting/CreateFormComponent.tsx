import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconButton, Button } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import '../../css/pages/CreateForm.scss';
import axios from 'axios';

const CreateFormComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleToolClick = () => {
    // if (tool === 'b') {
    //   //
    // }
  };

  // 카카오 서버로 부터 받은 accessToken 임시처리
  const params = new URL(document.URL).searchParams;
  // 인가코드는 백엔드로 넘겨서 reponse로 jwt 토큰 받기
  const code = params.get('code');

  const handleAcceptClick = async () => {
    if (title.length === 0) {
      alert('제목을 입력해주세요!');
    } else if (content.length === 0) {
      alert('내용을 입력해주세요!');
    } else {
      // 서버에 create 요청 메시지 전송
      const reqMsg = {
        title: title,
        contents: content,
      }
      try {
        const response = await axios.post('http://careerwry.site:9002/posts', reqMsg, {
          headers: {
            token: code, // 토큰을 헤더에 포함
          },
        });

        // 요청이 성공적으로 완료되었을 때
        console.log('게시글 생성 완료:', response.data);
        const postingData = {
          nickName: response.data.data.nickname,
          positionJob: response.data.data.postingJob,
          profileImg: response.data.data.profileImg,
          date: response.data.data.date,
          title: response.data.data.title,
          content: response.data.data.contents,
          token: response.data.data
        }
        navigate(`/posting/${response.data.data.token}`, { state: { postingData: postingData } }); // 필요한 데이터와 함께 컴포넌트로 이동
      } catch (error) {
        console.error('생성 요청 중 에러 발생:', error);
        alert('게시글 생성 중 문제가 발생했습니다.');
      }
    }
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // 임시저장 및 완료 버튼 footer
  return (
    <div className='craete-form-root'>
      <div className='create-form-edit-tools'>
        <div className='create-from-edit-tools--list'>
          <IconButton aria-label="Bold" onClick={handleToolClick}>
            <FormatBoldIcon />
          </IconButton>
          <IconButton aria-label="Underline" onClick={handleToolClick}>
            <FormatUnderlinedIcon />
          </IconButton>
          <IconButton aria-label="Strike" onClick={handleToolClick}>
            <StrikethroughSIcon />
          </IconButton>
          <IconButton aria-label="BulletList" onClick={handleToolClick}>
            <FormatListBulletedIcon />
          </IconButton>
          <IconButton aria-label="NumberingList" onClick={handleToolClick}>
            <FormatListNumberedIcon />
          </IconButton>
          <IconButton aria-label="AddImage" onClick={handleToolClick}>
            <AddPhotoAlternateIcon />
          </IconButton>
        </div>
      </div>
      <div className='create-form-edit--contents'>
        <div className='create-form-title'>
          <input 
            type="text" 
            value={title} 
            onChange={handleTitleChange} 
            placeholder='제목을 입력해주세요 (40자 이내)' 
            className="create-form-input-title"
            maxLength={39} 
          />
          <p className='create-form-title-count'>{title.length}/40</p>
        </div>
        <div className='create-form-contents'>
          <textarea 
            value={content} 
            onChange={handleContentChange} 
            placeholder='나누고 싶은 이야기를 작성해주세요' 
            className="create-form-input-content"
            rows={10}
          />
        </div>
        <div className='create-form-buttons'>
          <Button className='create-form-button' variant="contained" color="primary" size="small" onClick={handleAcceptClick}>
            Accept
          </Button>
          <Button
            className='create-form-button'
            variant="outlined"
            size="small"
            onClick={handleCancelClick}
            sx={{
              ml: 1,
              color: "gray",
              borderColor: "gray",
              ":hover": { borderColor: "gray", backgroundColor: "lightgray" },
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CreateFormComponent;