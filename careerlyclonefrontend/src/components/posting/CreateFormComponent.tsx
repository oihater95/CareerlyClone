import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  DraftHandleValue,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { Button } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ToggleButtonGroup from "@mui/joy/ToggleButtonGroup";
import IconButton from "@mui/joy/IconButton";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import "../../css/pages/CreateForm.scss";
import axios from "axios";

const CreateFormComponent: React.FC = () => {
  // const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [isFocusInTitle, setIsFocusInTitle] = useState<boolean>(false);
  const editorRef = useRef<Editor>(null); // Editor의 ref 생성
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const [activeStyles, setActiveStyles] = useState<string[]>(() => []); // 현재 활성화된 스타일
  const [activeBlockType, setActiveBlockType] = useState<string>("none");
  const [insertImageMode, setInsertImageMode] = useState<boolean>(false);
  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  useEffect(() => {
    // selection 상태가 변경될 때마다 현재 스타일 업데이트
    const currentStyle = editorState.getCurrentInlineStyle();
    const styles: string[] = [];
    const selection = editorState.getSelection();

    if (currentStyle.has("BOLD")) styles.push("BOLD");
    if (currentStyle.has("UNDERLINE")) styles.push("UNDERLINE");
    if (currentStyle.has("STRIKETHROUGH")) styles.push("STRIKETHROUGH");

    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    setActiveBlockType(blockType);
    setActiveStyles(styles);
  }, [editorState]);

  const handleEditorChange = (newState: EditorState) => {
    setEditorState(newState);
  };

  const handleKeyCommand = (
    command: string,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleEditorChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleInlineStyleClick = (style: string) => {
    const selection = editorState.getSelection();
    let newState = editorState;
    newState = RichUtils.toggleInlineStyle(editorState, style);
    // 선택된 텍스트가 없는 경우 (캐럿 상태)
    if (selection.isCollapsed()) {
      // 커서 위치에서 스타일을 토글
      // 스타일을 유지한 상태로 커서를 강제로 선택 (커서 위치에서 스타일 유지)
      newState = EditorState.forceSelection(newState, selection);
    }
    setEditorState(newState);

    // 포커스 유지
    // focusEditor()
    setTimeout(() => focusEditor(), 0); // 포커스 유지
  };

  const handleBlockTypeClick = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    setTimeout(() => focusEditor(), 0); // 포커스 유지
  };

  const mapKeyToEditorCommand = (e: React.KeyboardEvent): string | null => {
    if (e.keyCode === 66 /* `B` key */ && e.ctrlKey) {
      return "bold";
    }
    return getDefaultKeyBinding(e);
  };

  const params = new URL(document.URL).searchParams;
  const code = params.get("code");

  const handleAcceptClick = async () => {
    // const content = editorState.getCurrentContent().getPlainText();
    // rawData: JSON Type
    // 라인 별로 배열에 담겨있음, Inline style의 경우 inlineStyleRanges에 offset, length로 표현되어있음음
    const content = convertToRaw(editorState.getCurrentContent());
    // const rawContentState = convertFromRaw(content);
    const contentJSON = JSON.stringify(content);

    if (title.length === 0) {
      alert("제목을 입력해주세요!");
    } else if (content.blocks.length === 0) {
      alert("내용을 입력해주세요!");
    } else {
      const reqMsg = {
        title: title,
        contents: contentJSON,
      };
      try {
        const response = await axios.post(
          "http://careerwry.site:9002/posts",
          reqMsg,
          {
            headers: {
              token: code ?? "", // 토큰을 헤더에 포함
            },
          }
        );

        const postingData = {
          nickName: response.data.data.nickname,
          positionJob: response.data.data.postingJob,
          profileImg: response.data.data.profileImg,
          date: response.data.data.date,
          title: response.data.data.title,
          content: response.data.data.contents,
          token: response.data.data,
        };
        navigate(`/posting/${response.data.data.token}`, {
          state: { postingData: postingData },
        });
      } catch (error) {
        console.error("생성 요청 중 에러 발생:", error);
        alert("게시글 생성 중 문제가 발생했습니다.");
      }
    }
  };

  const handleCancelClick = () => {
    navigate(-1);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleTitleFocus = () => {
    setIsFocusInTitle(true);
  };

  const handleTitleBlur = () => {
    setIsFocusInTitle(false);
  };

  const handleInsertImage = () => {
    if (insertImageMode) {
      setInsertImageMode(false);
    } else {
      setInsertImageMode(true);
    }
  };

  return (
    <div className="craete-form-root">
      <div className="create-form-edit-tools">
        <ToggleButtonGroup
          variant="plain"
          spacing={1.0}
          value={activeStyles}
          aria-label="text formatting"
        >
          <IconButton
            aria-label="Bold"
            value="bold"
            onClick={() => handleInlineStyleClick("BOLD")}
            disabled={isFocusInTitle}
            aria-pressed={activeStyles.includes("BOLD")} // 토글 상태 반영
          >
            <FormatBoldIcon />
          </IconButton>
          <IconButton
            aria-label="Underline"
            value="underline"
            onClick={() => handleInlineStyleClick("UNDERLINE")}
            disabled={isFocusInTitle}
            aria-pressed={activeStyles.includes("UNDERLINE")} // 토글 상태 반영
          >
            <FormatUnderlinedIcon />
          </IconButton>
          <IconButton
            aria-label="Strike"
            value="strikethrough"
            onClick={() => handleInlineStyleClick("STRIKETHROUGH")}
            disabled={isFocusInTitle}
            aria-pressed={activeStyles.includes("STRIKETHROUGH")} // 토글 상태 반영
          >
            <StrikethroughSIcon />
          </IconButton>
          <IconButton
            aria-label="BulletList"
            value="unorderedlist"
            onClick={() => handleBlockTypeClick("unordered-list-item")}
            disabled={isFocusInTitle}
            aria-pressed={activeBlockType === "unordered-list-item"} // 토글 상태 반영
          >
            <FormatListBulletedIcon />
          </IconButton>
          <IconButton
            aria-label="NumberingList"
            value="orderedlist"
            onClick={() => handleBlockTypeClick("ordered-list-item")}
            disabled={isFocusInTitle}
            aria-pressed={activeBlockType === "ordered-list-item"} // 토글 상태 반영
          >
            <FormatListNumberedIcon />
          </IconButton>
          <IconButton
            aria-label="AddImage"
            onClick={() => handleInsertImage()}
            disabled={isFocusInTitle}
            aria-pressed={insertImageMode}
          >
            <AddPhotoAlternateIcon />
          </IconButton>
        </ToggleButtonGroup>
      </div>
      <div className="create-form-edit--contents">
        <div className="create-form-title">
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            onFocus={handleTitleFocus}
            onBlur={handleTitleBlur}
            placeholder="제목을 입력해주세요 (40자 이내)"
            className="create-form-input-title"
            maxLength={39}
          />
          <p className="create-form-title-count">{title.length}/40</p>
        </div>
        <div className="create-form-contents">
          <div
            className="create-form-input-content"
            style={{ padding: "10px", minHeight: "150px" }}
            onClick={focusEditor}
          >
            <Editor
              ref={editorRef} // Editor에 ref 할당
              editorState={editorState}
              onChange={setEditorState}
              handleKeyCommand={handleKeyCommand}
              keyBindingFn={mapKeyToEditorCommand}
              placeholder="나누고 싶은 이야기를 작성해주세요"
            />
            {insertImageMode ? (
              <div className="create-form-insert-image--frame">
                <div className="create-form-insert-image--content">
                  <IconButton
                    aria-label="AddImage"
                    onClick={() => handleInsertImage()}
                  >
                    <DriveFolderUploadOutlinedIcon />
                    <div>
                      <p> 파일 선택 </p>
                    </div>
                  </IconButton>
                </div>
                <p className="create-form-insert-image--placeholder">
                  또는 여기에 이미지를 드래그하세요.
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="create-form-buttons">
          <Button
            className="create-form-button"
            variant="contained"
            color="primary"
            size="small"
            onClick={handleAcceptClick}
          >
            Accept
          </Button>
          <Button
            className="create-form-button"
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
};

export default CreateFormComponent;
