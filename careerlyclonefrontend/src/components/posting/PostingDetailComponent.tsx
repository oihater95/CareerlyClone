import React from "react";
import "../../css/pages/PostingDetail.scss";
import { useLocation } from "react-router-dom";
import { convertFromRaw, Editor, EditorState } from "draft-js";

interface postingProps {
  nickName: string;
  positionJob: string;
  profileImg: string;
  date?: string;
  title: string;
  content?: string;
  token: string; // 게시글의 아이디 개념 , 대체키
}

/*
 * Route를 통해 이동 시 prop으로 postingData를 넘겨주려면 App.tsx에서 정보를 들고 있어야함
 * App.tsx에서 정보를 들고있지 않으려면 prop 안받고 get요청으로 데이터를 받아야함
 * 다만 get요청으로 데이터 받으면 FeedContentComp에 있던 데이터를 그대로 사용하지 못하고 같은 데이터를 받아야해서 비효율적
 * FeedContent에서 useNavigate state로 postingData 보내고 PostingDetail에서 Location으로 state에 접근하여 postingData 가져오기
 * 위 방법대로 하면 props을 안써도 되고 get요청을 중복하여 보내지 않아도 됨
 * Route하는 방법 대신 MainFeedComponent와 교체하는 방법도 고려해야할 듯 (동작 상 MainFeedComponent와 교체가 가장 효율적으로 보임)
 */
const PostingDetailComponent = () => {
  const location = useLocation();
  const postingData: postingProps = location.state.postingData;
  const rawContentState =
    postingData.content !== undefined ? JSON.parse(postingData.content) : {};
  const contentState = convertFromRaw(rawContentState);
  const editorState = EditorState.createWithContent(contentState);
  const renderFeed = (postingData: postingProps) => {
    return (
      <div className="feed-frame--detail">
        <div className="feed-frame-detail--element">
          <div className="feed-profile">
            <img
              className="feed-profile--img"
              src={postingData.profileImg}
              alt="profileImg"
            />
            <div className="feed-profile-detail">
              <div className="feed-nickname">
                <span>{postingData.nickName}</span>
              </div>
              <div className="feed-position">
                <span>{postingData.positionJob}</span>
              </div>
              <div className="feed-date">
                <span>{postingData.date}</span>
              </div>
            </div>
          </div>
          <div>
            <h2>{postingData.title}</h2>
          </div>
          <div>
            <Editor
              editorState={editorState}
              onChange={() => {}}
              readOnly={true} // 편집 불가 모드
            />
          </div>
        </div>
      </div>
    );
  };

  return <div className="feed-frame">{renderFeed(postingData)}</div>;
};

export default PostingDetailComponent;
