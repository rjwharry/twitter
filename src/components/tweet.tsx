import styled from "styled-components";
import { ITweet } from "./timeline";
import { auth, db, storage } from "../firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import EditTweet from "./edit-tweet";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 20px;
  border: 1px solid;
  border-color: white;
  border-radius: 15px; 
`;

const Column = styled.div``;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 15px;
`;

const Username = styled.span`
  font-weight: 600;
  font-size: 15px;
`;

const Payload = styled.p`
  margin:10px 0px;
  font-size: 18px;
`;

const ButtonWrapper = styled.div`
  display: grid;
  width: 150px;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
`;

const EditButton = styled.button`
  background-color: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: tomato;
  cololr: white;
  font-weight: 600;
  border: 0;
  font-size: 12px;
  padding: 5px 10px;
  text-transform: uppercase;
  border-radius: 5px;
  cursor: pointer;
`

function Tweet(tweet: ITweet) {
    const [isEdit, setIsEdit] = useState(false);
    const user = auth.currentUser;
    const onEdit = () => {
      setIsEdit(true);
    }
    const onDelete = async () => {
      const ok = confirm("Are you sure you want to delete this tweet?")
      if (!ok || user?.uid !== tweet.userId) {
        return;
      }
      try {
        await deleteDoc(doc(db, "tweets", tweet.id))
        if (tweet.photo) {
          const photoRef = ref(storage, `tweets/${user.uid}/${tweet.id}`);
          await deleteObject(photoRef);
        }
      } catch(e) {
        console.log(e);
      } finally {

      }
    }

    return (
      <Wrapper>
        <Column>
          <Username>{tweet.userName}</Username>
          <Payload>{tweet.tweet}</Payload>
          {user?.uid === tweet.userId? 
            <ButtonWrapper>
              <EditButton onClick={onEdit}>Edit</EditButton>
              <DeleteButton onClick={onDelete}>Delete</DeleteButton> 
            </ButtonWrapper>
            : null}
        </Column>
        {tweet.photo ? <Column>
          <Photo src={tweet.photo} />
        </Column> : null}
        {isEdit && <EditTweet onClose={() => {setIsEdit(false)}} tweet={tweet}/>}
      </Wrapper>
    )
}

export default Tweet;