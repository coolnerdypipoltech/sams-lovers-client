import React, { createContext, useRef, useState } from "react";
import { GetArticles, GetRewards, GetPurchasedRewards, GetChallengesByUser, GetChallengesByUserWithURL, GetRewardsByUserWithURL, GetPurchasedRewardsWithURL } from "../hooks/apicalls";
const ElementContextData = createContext();

const ElementProviderData = ({ children }) => {
  const [rewardsData, setRewardsData] = useState(null);
  const [userRewardsData, setUserRewardsData] = useState(null);
  const [articleData, setArticleData] = useState(null);
  const [challengesData, setChallengesData] = useState(null);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [currentReward, setCurrentReward] = useState(null);

  const UserData = useRef(null);
  const currentUserReward = useRef(null);
  const currentUserRewardTransaction = useRef(null);
  const currentArticle = useRef(null);
  const articlePosition = useRef(null);
  const nextRewards = useRef(null);
  const nextUserReward = useRef(null);
  const nextArticles = useRef(null);
  const nextChallenges = useRef(null);

  const initRequestRewards = async (
    _limit,
    _offset
  ) => {
    const response = await GetRewards(`${UserData.current.token_type} ${UserData.current.access_token}`, _limit, _offset);
    const data = await response.json();
    console.log(data.rewards);
    if (response.ok) {
      setRewardsData(data.rewards);
      nextRewards.current = data.next;
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
  };

  const initRequestUserRewards = async (
    _limit,
    _offset
  ) => {
    const response = await GetPurchasedRewards(`${UserData.current.token_type} ${UserData.current.access_token}`, _limit, _offset);
    const data = await response.json();
    console.log(data.rewards);
    if (response.ok) {
      setUserRewardsData(data.rewards);
      nextUserReward.current = data.next;
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
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

  const requestMoreRewards = async (_limit, _offset) => {
     if (nextRewards === null) {
      return;
    }

    const response = await GetRewards(
      `${UserData.current.token_type} ${UserData.current.access_token}`,
      _limit,
      _offset
    );
    const data = await response.json();
    console.log(data.rewards);
    if (response.ok) {
      setRewardsData((prev) => [...prev, ...data.rewards]);
      nextRewards.current = data.next;
      console.log("POST get info " + nextRewards.current);
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
  };

  const requestMoreRewardsByURL = async () => {

    if (nextRewards === null || nextRewards.current === null || nextRewards.current === "") {
      return;
    }

    const response = await GetRewardsByUserWithURL(
      `${UserData.current.token_type} ${UserData.current.access_token}`,
      nextRewards.current
    );
    console.log(nextRewards.current);
    const data = await response.json();
    console.log(data.rewards);
    if (response.ok) {
      setRewardsData((prev) => [...prev, ...data.rewards]);
      nextRewards.current = data.next;
      console.log("POST get info " + nextRewards.current);
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
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

  const requestMoreUserRewards = async (_limit, _offset) => {
     if (nextUserReward === null) {
      return;
    }

    const response = await GetPurchasedRewards(
      `${UserData.current.token_type} ${UserData.current.access_token}`,
      _limit,
      _offset
    );
    const data = await response.json();
    console.log(data.rewards);
    if (response.ok) {
      setUserRewardsData((prev) => [...prev, ...data.rewards]);
      nextUserReward.current = data.next;
      console.log("POST get info " + nextUserReward.current);
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
  };

  const requestMoreUserRewardsByURL = async () => {

    if (nextUserReward === null || nextUserReward.current === null || nextUserReward.current === "") {
      return;
    }

    const response = await GetPurchasedRewardsWithURL(
      `${UserData.current.token_type} ${UserData.current.access_token}`,
      nextUserReward.current
    );
    console.log(nextUserReward.current);
    const data = await response.json();
    console.log(data.rewards);
    if (response.ok) {
      setUserRewardsData((prev) => [...prev, ...data.rewards]);
      nextUserReward.current = data.next;
      console.log("POST get info " + nextUserReward.current);
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

  const setNewChallengeTransaction = async (transaction) => {
    var tempChallenge = currentChallenge;
    tempChallenge.transaction = transaction;
    console.log(tempChallenge);
    setCurrentChallenge(tempChallenge);
    let tempArray = challengesData;
    for (var i = 0; i < tempArray.length; i++) {
      if(tempArray[i].id === currentChallenge.id) {
        tempArray[i] = currentChallenge;
      }
    }
    setChallengesData(tempArray);
  }

  const setNewReward = async (_updatedReward) => {
    var tempReward = currentReward;
    tempReward = _updatedReward;
    setCurrentReward(tempReward);
    let tempArray = rewardsData;
    for (var i = 0; i < tempArray.length; i++) {
      if(tempArray[i].id === currentReward.id) {
        tempArray[i] = currentReward;
      }
    }
    setRewardsData(tempArray);
  }

  const setNewUserDiamonds = async (_diamonds) => {
    var tempUser = UserData.current;
    tempUser.user.related.diamonds = _diamonds;
    SetUserData(tempUser);
  }

  return (
    <ElementContextData.Provider
      value={{
        UserData,
        rewardsData,
        userRewardsData,
        challengesData,
        currentChallenge,
        currentReward,
        currentUserReward,
        currentUserRewardTransaction,
        currentArticle,
        articlePosition,
        articleData,
        nextChallenges,
        nextRewards,
        nextUserReward,
        SetUserData,
        setRewardsData,
        setUserRewardsData,
        setChallengesData,
        setCurrentChallenge,
        setCurrentReward,
        requestMoreRewards,
        requestMoreRewardsByURL,
        requestMoreUserRewards,
        requestMoreUserRewardsByURL,
        requestMoreChallenges,
        requestMoreChallengesByURL,
        requestMoreArticles,
        requestNextArticle,
        initRequestRewards,
        initRequestUserRewards,
        initRequestArticles,
        initRequestChallenges,
        setNewChallengeTransaction,
        setNewReward,
        setNewUserDiamonds
      }}
    >
      {children}
    </ElementContextData.Provider>
  );
};

export { ElementContextData, ElementProviderData };
