import React, { createContext, useRef, useState } from "react";
import {GetArticles, GetChallengesByUser} from  "../hooks/apicalls"
import data from "../test.json";
const ElementContextData = createContext();

const ElementProviderData= ({ children }) => {

    const [rewardsData, setRewardsData] = useState(null);
    const [articleData, sertArticleData] = useState(null);
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
        sertArticleData(response.data)
        articleData.current = response.nextLink
        return
    }

    const initRequestChallenges = async (type) => {
        //const response = await GetChallengesByUser()
        //sertArticleData(response.data)
        //nextArticles.current = response.nextLink
        setChallengesData([data.challenges[0], data.challenges[1], data.challenges[2], data.challenges[3], data.challenges[4], data.challenges[5], data.challenges[6], data.challenges[7],data.challenges[8], data.challenges[9]]);;
        //setChallengesData([1, 2, 3, 4, 5, 6, 7, 8 , 9, 10])
        return
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

  const requestMoreChallenges = async () => {
    if(nextChallenges === null){
        return
    }
    let tempArray = [...challengesData]
    nextChallenges.current = ""
    //setChallengesData(tempArray);
    ///Tests
    const newChallenges = Array.from(tempArray);
      setChallengesData(prev => [...prev, ...newChallenges]);
    ///Tests
    return
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
    <ElementContextData.Provider value={{ UserData, rewardsData, challengesData, currentChallenge, currentReward, currentArticle, articlePosition, articleData, SetUserData, requestMoreRewards, requestMoreChallenges, requestMoreArticles, requestNextArticle, initRequestRewards, initRequestArticles, initRequestChallenges }}>
      {children}
    </ElementContextData.Provider>
  );
};

export { ElementContextData, ElementProviderData };
