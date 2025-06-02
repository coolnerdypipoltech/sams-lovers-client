import React, { createContext, useRef, useState } from "react";
import { GetArticles, GetChallengesByUser, GetChallengesByUserWithURL } from "../hooks/apicalls";
const ElementContextData = createContext();

const ElementProviderData = ({ children }) => {
  const [rewardsData, setRewardsData] = useState(null);
  const [articleData, setArticleData] = useState(null);
  const [challengesData, setChallengesData] = useState(null);
  const [currentChallenge, setCurrentChallenge] = useState(null);

  const UserData = useRef(null);
  const currentReward = useRef(null);
  const currentArticle = useRef(null);
  const articlePosition = useRef(null);
  const nextRewards = useRef(null);
  const nextArticles = useRef(null);
  const nextChallenges = useRef(null);

  const initRequestRewards = async () => {
    const response = await GetChallengesByUser();
    //setRewardsData(response.data)
    //nextRewards.current = response.nextLink
    setRewardsData([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    return;
  };

  const initRequestArticles = async () => {
    const response = await GetArticles();
    setArticleData(response.data);
    articleData.current = response.nextLink;
    return;
  };

  const initRequestChallenges = async (
    _challengeStatusFilter,
    _transactionStatusFilter,
    _limit,
    _offset
  ) => {
    const response = await GetChallengesByUser(
      `${UserData.current.token_type} ${UserData.current.access_token}`,
      _challengeStatusFilter,
      _transactionStatusFilter,
      _limit,
      _offset
    );
    const data = await response.json();
    console.log(data.challenges);
    if (response.ok) {
      setChallengesData(data.challenges);
      nextChallenges.current = data.next;
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
  };

  const requestMoreRewards = async () => {
    if (nextRewards === null) {
      return;
    }
    let tempArray = [...rewardsData];
    nextRewards.current = "";
    //setRewardsData(tempArray);
    ///Tests
    const newRewards = Array.from(
      { length: 5 },
      (_, i) => rewardsData.length + i + 1
    );
    setRewardsData((prev) => [...prev, ...newRewards]);
    ///Tests
    return;
  };

  const requestMoreChallenges = async (
    _challengeStatusFilter,
    _transactionStatusFilter,
    _limit,
    _offset
  ) => {

    if (nextChallenges === null) {
      return;
    }

    const response = await GetChallengesByUser(
      `${UserData.current.token_type} ${UserData.current.access_token}`,
      _challengeStatusFilter,
      _transactionStatusFilter,
      _limit,
      _offset
    );
    const data = await response.json();
    console.log(data.challenges);
    if (response.ok) {
      setChallengesData((prev) => [...prev, ...data.challenges]);
      nextChallenges.current = data.next;
      console.log("POST get info " + nextChallenges.current);
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
  };

  const requestMoreChallengesByURL = async () => {

    if (nextChallenges === null || nextChallenges.current === null || nextChallenges.current === "") {
      return;
    }

    const response = await GetChallengesByUserWithURL(
      `${UserData.current.token_type} ${UserData.current.access_token}`,
      nextChallenges.current
    );
    console.log(nextChallenges.current);
    const data = await response.json();
    console.log(data.challenges);
    if (response.ok) {
      setChallengesData((prev) => [...prev, ...data.challenges]);
      nextChallenges.current = data.next;
      console.log("POST get info " + nextChallenges.current);
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
  };

  const SetUserData = (_Data) => {
    UserData.current = _Data;
    console.log(UserData.current);
  };

  const requestMoreArticles = async () => {
    if (nextArticles === null) {
      return;
    }
    let tempArray = [...articleData];
    nextArticles.current = "";
    setArticleData(tempArray);
    return;
  };

  const requestNextArticle = async () => {
    if (articleData.length - 1 <= articlePosition.current + 1) {
      currentArticle.current = articleData[articlePosition + 1];
      articlePosition.current = articlePosition.current + 1;
    } else {
      if (nextArticles.current != null) {
        const response = await requestMoreArticles();
        if (response) {
          currentArticle.current = response;
          articlePosition.current = articlePosition.current + 1;
        }
      }
    }
    return;
  };

  const setNewTransaction = async (transaction) => {
    var tempChallenge = currentChallenge;
    tempChallenge.transaction = transaction;
    setCurrentChallenge(tempChallenge);
    let tempArray = challengesData;
    for (var i = 0; i < tempArray.length; i++) {
      if(tempArray[i].challenge.id === currentChallenge.id) {
        tempArray[i].challenge = currentChallenge;
      }
    }
    setCurrentChallenge(tempArray);
  }

  return (
    <ElementContextData.Provider
      value={{
        UserData,
        rewardsData,
        challengesData,
        currentChallenge,
        currentReward,
        currentArticle,
        articlePosition,
        articleData,
        nextChallenges,
        SetUserData,
        setChallengesData,
        setCurrentChallenge,
        requestMoreRewards,
        requestMoreChallenges,
        requestMoreChallengesByURL,
        requestMoreArticles,
        requestNextArticle,
        initRequestRewards,
        initRequestArticles,
        initRequestChallenges,
        setNewTransaction
      }}
    >
      {children}
    </ElementContextData.Provider>
  );
};

export { ElementContextData, ElementProviderData };
