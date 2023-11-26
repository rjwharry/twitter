import styled from "styled-components";
import { auth, db, storage } from "../firebase";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { ITweet } from "../components/timeline";
import Tweet from "../components/tweet";
import EditProfile from "../components/edit-profile";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const AvatarUpload = styled.label`
  width: 80px;
  overflow: hidden;
  height: 80px;
  border-radius: 50%;
  background-color: #1d9bf0;
  display: flex;
  align-items: center;
  cursor: pointer;
  svc{
    width: 50px;
    height: 50px;
  }
`;

const AvatarImg = styled.img`
  width:100%;
`;

const AvatarInput = styled.input`
  display: none;
`;

const NameGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const Name = styled.span`
  font-size: 22px;
`;

const EditButton = styled.label`
  width: 15px;
  height: 15px;
`;

const Tweets = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 10px;
`;

function Profile() {
  const user = auth.currentUser;
  const photoURL = user ? user.photoURL ? user.photoURL : undefined : undefined; 
  const [avatar, setAvatar] = useState(photoURL);
  const [myTweets, setMyTweets] = useState<ITweet[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const onAvatarChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const {files} = e.target;
    if (!user) return;
    if (files && files.length === 1) {
      const file = files[0];
      const locationRef = ref(storage, `avatars/${user?.uid}`);
      const result = await uploadBytes(locationRef, file);
      const url = await getDownloadURL(result.ref);
      setAvatar(url);
      // I will not update my Profile.
      // await updateProfile(user, {
      //   photoURL: url,
      // })
    }
  }

  const fetchTweets = async () => {
    const tweetQuery = await query(
      collection(db, "tweets"),
      where("userId", "==", user?.uid),
      orderBy("createdAt", "desc"),
      limit(25),
    )
    const snapshot = await getDocs(tweetQuery);
    const tweets = snapshot.docs.map(doc => {
      const { tweet, createdAt, userId, userName, photo } = doc.data();
      return {
        id: doc.id,
        tweet, 
        createdAt, 
        userId, 
        userName, 
        photo 
      } 
    })
    setMyTweets(tweets);
  };

  const onClickEdit = () => {
    setIsEdit(true);
  }

  useEffect(() => {
    fetchTweets();
  }, []);

  return (
    <Wrapper>
      <AvatarUpload htmlFor="avatar">
        {Boolean(avatar) ? <AvatarImg src={avatar}/> : <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
</svg>}
      </AvatarUpload>
      <AvatarInput onChange={onAvatarChange} id="avatar" type="file" accept="image/*" />
      <NameGroup>
        <Name>
          {user?.displayName ?? "Anonymous"}
        </Name>
        <EditButton onClick={onClickEdit}>
          <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
          </svg>
        </EditButton>
      </NameGroup>
      <Tweets>
        {myTweets.map(tweet => <Tweet key={tweet.id} {...tweet}/>)}
      </Tweets>
      {isEdit && <EditProfile user={user} onClose={() => { setIsEdit(false) }}/>}
    </Wrapper>
  )
}

export default Profile;