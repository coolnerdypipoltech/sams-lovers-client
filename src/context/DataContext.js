import React, { createContext, useRef, useState } from "react";
import { GetArticles, GetRewards, GetPurchasedRewards, GetChallengesByUser, GetChallengesByUserWithURL, GetRewardsByUserWithURL, GetPurchasedRewardsWithURL, GetMainPageData, GetTopUsers, GetTopUsersByURL } from "../hooks/apicalls";
const ElementContextData = createContext();

const ElementProviderData = ({ children }) => {
  const [rewardsData, setRewardsData] = useState(null);
  const [userRewardsTransactionData, setUserRewardsTransactionData] = useState(null);
  const [articleData, setArticleData] = useState(null);
  const [challengesData, setChallengesData] = useState(null);
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [currentReward, setCurrentReward] = useState(null);
  const [userDiamonds, setUserDiamonds] = useState(0);
  const [topUsersData, setTopUsersData] = useState(null);
  const [currentArticle, setCurrentArticle] = useState(null);

  const UserData = useRef(null);
  const currentUserRewardTransaction = useRef(null);
  const articlePosition = useRef(null);
  const nextRewards = useRef(null);
  const nextUserRewardTransaction = useRef(null);
  const nextArticles = useRef(null);
  const nextChallenges = useRef(null);
  const nextTopUsers = useRef(null);
  const mainPageData = useRef(null);
  const totalArticles = useRef(0);
  const tempArticlesData = useRef(null);

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

  const loadNextArticle = () =>{
  const index = articleData.findIndex(item => item.id === currentArticle.id);
    if (index !== -1 && index + 1 < articleData.length) {
      setCurrentArticle(articleData[index + 1]);
    }
    return null;
  }

  function hasNextArticle() {
  const index = articleData.findIndex(item => item.id === currentArticle.id);
  return index !== -1 && index + 1 < articleData.length;
}

  const initRequestUserRewardsTransactions = async (
    _limit,
    _offset
  ) => {
    const response = await GetPurchasedRewards(`${UserData.current.token_type} ${UserData.current.access_token}`, _limit, _offset);
    const data = await response.json();
    console.log(data.transactions);
    if (response.ok) {
      setUserRewardsTransactionData(data.transactions);
      nextUserRewardTransaction.current = data.next;
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
  };

  const initRequestArticles = async (
    _limit,
    _offset
  ) => {
    const response = await GetArticles(`${UserData.current.token_type} ${UserData.current.access_token}`, _limit, _offset);
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setArticleData(data.articles);
      tempArticlesData.current = data.articles;
      totalArticles.current = data.total;
      nextArticles.current = data.next;
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
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

  const initMainPage = async() => {
    const response = await GetMainPageData(`${UserData.current.token_type} ${UserData.current.access_token}`);
    const data = await response.json();
    if (response.ok) {
      mainPageData.current = (data);
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
  };

  const initRequestTopUsers = async(_limit, _offset) => {
    const response = await GetTopUsers(`${UserData.current.token_type} ${UserData.current.access_token}`, _limit, _offset);
    const data = await response.json();
    console.log(data.topUsers);
    if (response.ok) {
      setTopUsersData(data.topUsers);
      nextTopUsers.current = data.next;
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

  const requestMoreUserRewardsTransactions = async (_limit, _offset) => {
     if (nextUserRewardTransaction === null) {
      return;
    }

    const response = await GetPurchasedRewards(
      `${UserData.current.token_type} ${UserData.current.access_token}`,
      _limit,
      _offset
    );
    const data = await response.json();
    console.log(data.transactions);
    if (response.ok) {
      setUserRewardsTransactionData((prev) => [...prev, ...data.transactions]);
      nextUserRewardTransaction.current = data.next;
      console.log("POST get info " + nextUserRewardTransaction.current);
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
  };

  const requestMoreUserRewardsTransactionsByURL = async () => {
    if (nextUserRewardTransaction === null || nextUserRewardTransaction.current === null || nextUserRewardTransaction.current === "") {
      return;
    }

    const response = await GetPurchasedRewardsWithURL(
      `${UserData.current.token_type} ${UserData.current.access_token}`,
      nextUserRewardTransaction.current
    );
    console.log(nextUserRewardTransaction.current);
    const data = await response.json();
    console.log(data.transactions);
    if (response.ok) {
      setUserRewardsTransactionData((prev) => [...prev, ...data.transactions]);
      nextUserRewardTransaction.current = data.next;
      console.log("POST get info " + nextUserRewardTransaction.current);
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
  };

  const requestMoreArticles = async (_limit, _offset) => {
    if (nextArticles === null) {
      return;
    }

    const response = await GetArticles(
      `${UserData.current.token_type} ${UserData.current.access_token}`,
      _limit,
      _offset
    );
    const data = await response.json();
    console.log(data.articles);
    if (response.ok) {
      setArticleData((prev) => [...prev, ...data.articles]);
      tempArticlesData.current = [...tempArticlesData.current, ...data.articles];
      totalArticles.current = data.total;
      nextArticles.current = data.next;
      console.log("POST get info " + nextArticles.current);
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
  };

  const requestMoreArticlesByURL = async () => {
    if (nextArticles === null || nextArticles.current === null || nextArticles.current === "") {
      return;
    }

    const response = await GetPurchasedRewardsWithURL(
      `${UserData.current.token_type} ${UserData.current.access_token}`,
      nextArticles.current
    );
    console.log(nextArticles.current);
    const data = await response.json();
    console.log(data.articles);
    if (response.ok) {
      setArticleData((prev) => [...prev, ...data.articles]);
      tempArticlesData.current = [...tempArticlesData.current, ...data.articles];
      totalArticles.current = data.total;
      nextArticles.current = data.next;
      console.log("POST get info " + nextArticles.current);
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
  };

  const requestNextArticle = async () => {
    if ((articlePosition.current + 1) < (articleData.length)) {
      setCurrentArticle(articleData[articlePosition.current + 1]);
      articlePosition.current = articlePosition.current + 1;
    } else {
      if (nextArticles.current != null) {
        await requestMoreArticlesByURL();
        console.log(tempArticlesData.current);
        setCurrentArticle(tempArticlesData.current[articlePosition.current + 1]);
        articlePosition.current = articlePosition.current + 1;
      }
    }
    return;
  };

  const requestMoreTopUsers = async (_limit, _offset) => {
    if (nextTopUsers === null) {
      return;
    }

    const response = await GetTopUsers(
      `${UserData.current.token_type} ${UserData.current.access_token}`,
      _limit,
      _offset
    );
    const data = await response.json();
    console.log(data.topUsers);
    if (response.ok) {
      setTopUsersData((prev) => [...prev, ...data.topUsers]);
      nextTopUsers.current = data.next;
      console.log("POST get info " + nextTopUsers.current);
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
  };

  const RequestMoreTopUsersByURL = async () => {
    if (nextTopUsers === null || nextTopUsers.current === null || nextTopUsers.current === "") {
      return;
    }

    const response = await GetTopUsersByURL(
      `${UserData.current.token_type} ${UserData.current.access_token}`,
      nextTopUsers.current
    );
    console.log(nextTopUsers.current);
    const data = await response.json();
    console.log(data.topUsers);
    if (response.ok) {
      setTopUsersData((prev) => [...prev, ...data.topUsers]);
      nextTopUsers.current = data.next;
      console.log("POST get info " + nextTopUsers.current);
    } else {
      if (data.message) {
        if (response.status === 403) {
          //todo send user to log in page
        }
      }
      return;
    }
  }

  const SetUserData = (_Data) => {
    UserData.current = _Data;
    if(UserData.current !== null)
      setUserDiamonds(UserData.current.user.related.diamonds);
    console.log(UserData.current);
  };

  const setNewChallengeTransaction = async (_transaction) => {
    var tempChallenge = currentChallenge;
    tempChallenge.transaction = _transaction;
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
        userRewardsTransactionData,
        challengesData,
        currentChallenge,
        currentReward,
        currentUserRewardTransaction,
        currentArticle,
        articlePosition,
        articleData,
        nextArticles,
        nextChallenges,
        nextRewards,
        nextUserRewardTransaction,
        userDiamonds,
        topUsersData,
        nextTopUsers,
        mainPageData,
        totalArticles,
        SetUserData,
        setRewardsData,
        setUserRewardsTransactionData,
        setChallengesData,
        setCurrentChallenge,
        setCurrentReward,
        setCurrentArticle,
        requestMoreRewards,
        requestMoreRewardsByURL,
        requestMoreUserRewardsTransactions,
        requestMoreUserRewardsTransactionsByURL,
        requestMoreChallenges,
        requestMoreChallengesByURL,
        requestMoreArticles,
        requestNextArticle,
        requestMoreArticlesByURL,
        requestMoreTopUsers,
        RequestMoreTopUsersByURL,
        initRequestRewards,
        initRequestUserRewardsTransactions,
        initRequestArticles,
        initRequestChallenges,
        initMainPage,
        initRequestTopUsers,
        setNewChallengeTransaction,
        setNewReward,
        setNewUserDiamonds,
        setTopUsers: setTopUsersData,
        loadNextArticle,
        hasNextArticle
      }}
    >
      {children}
    </ElementContextData.Provider>
  );
};

export { ElementContextData, ElementProviderData };
