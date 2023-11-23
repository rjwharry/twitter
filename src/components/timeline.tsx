import { Unsubscribe, collection, getDocs, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import Tweet from "./tweet";

export interface ITweet {
  id: string;
  photo: string;
  tweet: string;
  userId: string;
  userName: string;
  createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: scroll;
`;

function Timeline() {
  const [tweets, setTweets] = useState<ITweet[]>([])

  
  useEffect(() => {
    let unsubscribe: Unsubscribe | null;
    
    const fetchTweets = async () => {
      const tweetsQuery = query(
        collection(db, "tweets"),
        orderBy("createdAt", "desc"),
        limit(25),
      );
      unsubscribe = await onSnapshot(tweetsQuery, snapshot => {
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
        setTweets(tweets);
      })
    }
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    }
  }, [])

  return (
    <Wrapper>{
      tweets.map(tweet => (
        <Tweet key={tweet.id} {...tweet} />
      ))
    }</Wrapper>
  );
}
export default Timeline;