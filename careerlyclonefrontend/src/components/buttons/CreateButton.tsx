import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/Buttons.scss'

const CreateButton: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateBtnClick = () => {
    navigate('/createPost'); // CreateFormComponent로 이동
  };

  return (
    <button className='create-button-root' onClick={handleCreateBtnClick}>
      <img
        className='create-button-icon'
        src="data:image/png;base64,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"
        alt="CreatePost"
      />
    </button>
  );
};

export default CreateButton;







