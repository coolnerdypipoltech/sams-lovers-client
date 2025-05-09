import React, { createContext, useRef, useState } from "react";
import {GetArticles, GetChallengesByUser} from  "../hooks/apicalls"
const ElementContextData = createContext();

const ElementProviderData= ({ children }) => {

    const [rewardsData, setRewardsData] = useState(null);
    const [articleData, sertArticleData] = useState(null);
    const [challengesData, setChallengesData] = useState(null)
    const currentChallenge = useRef(null)
    const currentReward = useRef(null)
    const currentArticle = useRef(null)
    const articlePosition = useRef(null)
    const nextRewards = useRef(null)
    const nextArticles = useRef(null)
    const nextChallenges = useRef(null)

    const initRequestRewards = async () => {
        const response = await GetChallengesByUser()
        setRewardsData(response.data)
        nextRewards.current = response.nextLink
        return
    }
    const initRequestArticles = async () => {
        const response = await GetArticles()
        sertArticleData(response.data)
        articleData.current = response.nextLink
        return
    }
    const initRequestChallenges = async () => {
        const response = await GetChallengesByUser()
        sertArticleData(response.data)
        nextArticles.current = response.nextLink
        return
    }

  const requestMoreRewards = async () => {
    if(nextRewards === null){
        return
    }
    let tempArray = [...rewardsData]
    nextRewards.current = ""
    setRewardsData(tempArray);
    return
  };
  const requestMoreChallenges = async () => {
    if(nextChallenges === null){
        return
    }
    let tempArray = [...challengesData]
    nextChallenges.current = ""
    setChallengesData(tempArray);
    return
  };
  const requestMoreArticles = async () => {
    if(nextArticles === null){
        return
    }
    let tempArray = [...articleData]
    nextArticles.current = ""
    sertArticleData(tempArray);
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
    <ElementContextData.Provider value={{ rewardsData, challengesData, currentChallenge, currentReward, currentArticle, articlePosition, articleData, requestMoreRewards, requestMoreChallenges, requestMoreArticles, requestNextArticle, initRequestRewards, initRequestArticles, initRequestChallenges }}>
      {children}
    </ElementContextData.Provider>
  );
};

export { ElementContextData, ElementProviderData };
