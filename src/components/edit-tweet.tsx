import styled from "styled-components";
import { ITweet } from "./timeline";
import React, { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface EditPropsInterface {
  tweet: ITweet,
  onClose: () => any,
};


const ModalBackdrop = styled.div`
z-index: 1; //위치지정 요소
position: fixed;
display : flex;
justify-content : center;
align-items : center;
background-color: rgba(0,0,0,0.4);
border-radius: 10px;
top : 0;
left : 0;
right : 0;
bottom : 0;
`;

const ModalView = styled.div.attrs(()=> ({
  role: "dialog",
}))`
display: flex;
flex-direction: column;
align-items: center;
border-radius: 20px;
width: 500px;
heigth: 200px;
background-color: #ffffff;
align-items: flex-start;
>div.desc {
  margin: 50px;
  font-size: 20px;
  color: var(--coz-purple-600);
}
`;

const TextArea = styled.textarea`
  border: 2px solid white;
  padding:10px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  resize: none;
  width:476px; 
  &::placeholder {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantrarell, 'Open Sans', 'Helvetica Neue',
    sans-serif;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ExitBtn = styled.button`
  background-color : #949A99;
  border-radius: 10px;
  margin:10px 10px;
  padding: 5px 10px;
  width: 80px;
  height: 30px;
  display : flex;
  justify-content: center;
  cursor: pointer;
  text-transform: uppercase;
`;

const SaveBtn = styled.button`
background-color : #33A5FF;
border-radius: 10px;
margin:10px 10px; 
padding: 5px 10px;
width: 80px;
height: 30px;
display : flex;
justify-content: center;
cursor: pointer;
text-transform: uppercase;
`;

const AttachFileButton = styled.button`
  background-color: #5CF060;
  border-radius: 10px;
  margin:10px 10px; 
  padding: 5px 10px;
  height: 30px;
  display : flex;
  justify-content: center;
  cursor: pointer;
  text-transform: uppercase;
`;

const AttachFileInput = styled.input`
  display: none;
`;

const MB = 1024 * 1024;

function EditTweet({tweet, onClose}: EditPropsInterface) {
  const [editTweetText, setEditTweetText] = useState("");
  const [file, setFile] = useState<File|null>(null);

  const onSave = async () => {
    const updatedTweet = {...tweet};
    try {
      if (file) {
        const locationRef = ref(storage, `tweets/${tweet.userId}/${tweet.id}`)
        const result = await uploadBytes(locationRef, file);
        const url = await getDownloadURL(result.ref);
        updatedTweet.photo = url; 
      }
      updatedTweet.tweet = editTweetText;
      await updateDoc(doc(db, "tweets", tweet.id), {...updatedTweet});
    } catch (e) {
      console.log(e);
    } finally {
      onClose();
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditTweetText(e.target.value);
  }

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    if (files && files.length === 1 && files[0].size <= 1*MB) {
      setFile(files[0])
    } else if (!files) {
      alert("파일 업로드에 실패했습니다.");
    } else if (files.length > 1) {
      alert("오직 한 개의 파일만 업로드할 수 있습니다.");
    } else if (files[0].size > 1*MB) {
      alert("1MB이하의 파일만 업로드할 수 있습니다.");
    }
  } 

  useEffect(() => {
    setEditTweetText(tweet.tweet);
  }, [])

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalView onClick={e => e.stopPropagation()}>
        <TextArea rows={5} maxLength={180} value={editTweetText} onChange={onChange} />
        <ButtonGroup>
          <ExitBtn onClick={onClose}>Cancel</ExitBtn>
          <SaveBtn onClick={onSave}>Save</SaveBtn>
          <AttachFileButton onClick={() => {document.getElementById("update-file")?.click()}} disabled={!!file}>{file ? "Photo Added" : "Add Photo"}</AttachFileButton>
          <AttachFileInput type="file" id="update-file" accept="image/*" onChange={onFileChange} />
        </ButtonGroup>
      </ModalView>
    </ModalBackdrop>
  )
}

export default EditTweet;