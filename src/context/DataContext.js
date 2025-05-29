import React, { createContext, useRef, useState } from "react";
import {GetArticles, GetChallengesByUser} from  "../hooks/apicalls"
const ElementContextData = createContext();

const ElementProviderData= ({ children }) => {

    const [rewardsData, setRewardsData] = useState(null);
    const [articleData, setArticleData] = useState(null);
    const [challengesData, setChallengesData] = useState(null)

    const UserData = useRef(null);
    const currentChallenge = useRef(null)
    const currentReward = useRef(null)
    const currentArticle = useRef(null)
    const articlePosition = useRef(null)
    const nextRewards = useRef(null)
    const nextArticles = useRef(null)
    const nextChallenges = useRef(null)

    const initRequestRewards = async () => {
        const response = await GetChallengesByUser()
        //setRewardsData(response.data)
        //nextRewards.current = response.nextLink
        setRewardsData([1, 2, 3, 4, 5, 6, 7, 8 , 9, 10])
        return
    }

    const initRequestArticles = async () => {
        const response = await GetArticles()
        setArticleData(response.data)
        articleData.current = response.nextLink
        return
    }

    const initRequestChallenges = async (_token, _challengeStatusFilter, _transactionStatusFilter, _limit, _offset) => {
        const response = await GetChallengesByUser(_token, _challengeStatusFilter, _transactionStatusFilter, _limit, _offset);
        if (response.ok) {
          setChallengesData(response.data);
          nextChallenges.current = response.nextLink;
        } else {
          if(response.data.message){
            if(response.status === 403){
              //todo send user to log in page
            }
          }
        return
      }
    }

  const requestMoreRewards = async () => {
    if(nextRewards === null){
        return
    }
    let tempArray = [...rewardsData]
    nextRewards.current = ""
    //setRewardsData(tempArray);
    ///Tests
    const newRewards = Array.from({ length: 5 }, (_, i) =>
        rewardsData.length + i + 1
      );
      setRewardsData(prev => [...prev, ...newRewards]);
    ///Tests
    return
  };

  const requestMoreChallenges = async (_token, _challengeStatusFilter, _transactionStatusFilter, _limit, _offset) => {
    if(nextChallenges === null){
        return
    }

    nextChallenges.current = ""
    const response = await GetChallengesByUser(_token, _challengeStatusFilter, _transactionStatusFilter, _limit, _offset);
        if (response.ok) {
          setChallengesData(prev => [...prev, ...response.data]);
          nextChallenges.current = response.nextLink;
        } else {
          if(response.data.message){
            if(response.status === 403){
              //todo send user to log in page
            }
          }
        return
      }
  };

  const SetUserData = (_Data) => {
    UserData.current = _Data
    console.log(UserData.current)
  }

  const requestMoreArticles = async () => {
    if(nextArticles === null){
        return
    }
    let tempArray = [...articleData]
    nextArticles.current = ""
    setArticleData(tempArray);
    return
  };

  const requestNextArticle = async () => {
    if(articleData.length - 1 <= articlePosition.current + 1){
        currentArticle.current = articleData[articlePosition + 1]
        articlePosition.current = articlePosition.current + 1
    }else{
        if(nextArticles.current != null){
            const response = await requestMoreArticles()
            if(response){
                currentArticle.current = response
                articlePosition.current = articlePosition.current + 1
            }
        }
    }
    return
  };

  return (
    <ElementContextData.Provider value={{ UserData, rewardsData, challengesData, currentChallenge, currentReward, currentArticle, articlePosition, articleData, SetUserData, requestMoreRewards, requestMoreChallenges, requestMoreArticles, requestNextArticle, initRequestRewards, initRequestArticles, initRequestChallenges }}>
      {children}
    </ElementContextData.Provider>
  );
};

export { ElementContextData, ElementProviderData };
