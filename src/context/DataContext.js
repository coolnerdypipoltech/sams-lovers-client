import React, { createContext, useRef, useState } from "react";
import { GetArticles, GetRewards, GetPurchasedRewards, GetChallengesByUser, GetChallengesByUserWithURL, GetRewardsByUserWithURL, GetPurchasedRewardsWithURL, GetMainPageData, GetLandingPageData, GetTopUsers, GetTopUsersByURL, GetFooterLinks } from "../hooks/apicalls";
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
  const [landingPageData, setLandingPageData] = useState(null);
  const [mainPageData, setMainPageData] = useState(null);

  const UserData = useRef(null);
  const currentUserRewardTransaction = useRef(null);
  const articlePosition = useRef(null);
  const nextRewards = useRef(null);
  const nextUserRewardTransaction = useRef(null);
  const nextArticles = useRef(null);
  const nextChallenges = useRef(null);
  const nextTopUsers = useRef(null);
  const totalArticles = useRef(0);
  const tempArticlesData = useRef(null);
  const footerLinksData = useRef(null);

  const initRequestRewards = async (
    _token,
    _limit,
    _offset
  ) => {
    const response = await GetRewards(`Bearer ${_token}`, _limit, _offset);
    const data = await response.json();
    if (response.ok) {
      setRewardsData(data.rewards);
      nextRewards.current = data.next;
      return {ok: true, status: response.status, data: null};
    } else {
      return {ok: false, status: response.status, data: data};
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
    _token,
    _limit,
    _offset
  ) => {
    const response = await GetPurchasedRewards(`Bearer ${_token}`, _limit, _offset);
    const data = await response.json();
    if (response.ok) {
      setUserRewardsTransactionData(data.transactions);
      nextUserRewardTransaction.current = data.next;
      return {ok: true, status: response.status, data: null};
    } else {
      return {ok: false, status: response.status, data: data};
    }
  };

  const initRequestArticles = async (
    _token,
    _limit,
    _offset
  ) => {
    const response = await GetArticles(`Bearer ${_token}`, _limit, _offset);
    const data = await response.json();
    if (response.ok) {
      setArticleData(data.articles);
      tempArticlesData.current = data.articles;
      totalArticles.current = data.total;
      nextArticles.current = data.next;
      return {ok: true, status: response.status, data: null};
    } else {
      return {ok: false, status: response.status, data: data};
    }
  };

  const initRequestChallenges = async (
    _challengeStatusFilter,
    _transactionStatusFilter,
    _token,
    _limit,
    _offset
  ) => {
    const response = await GetChallengesByUser(
      `Bearer ${_token}`,
      _challengeStatusFilter,
      _transactionStatusFilter,
      _limit,
      _offset
    );
    const data = await response.json();
    if (response.ok) {
      setChallengesData(data.challenges);
      nextChallenges.current = data.next;
      return {ok: true, status: response.status, data: null};
    } else {
      return {ok: false, status: response.status, data: data};
    }
  };

  const initMainPage = async() => {
    const response = await GetMainPageData();
    const data = await response.json();
    if (response.ok) {
      setMainPageData(data);
    }
  };

  const initLandingPage = async() => {
    const response = await GetLandingPageData();
    const data = await response.json();
    if (response.ok) {
      setLandingPageData(data);
    }
  };

  const initRequestTopUsers = async(_limit, _offset) => {
    const response = await GetTopUsers(_limit, _offset);
    const data = await response.json();
    if (response.ok) {
      setTopUsersData(data.users);
      nextTopUsers.current = data.next;
    }
  };

  const requestMoreRewards = async (_token, _limit, _offset) => {
    if (nextRewards === null) {
      return;
    }

    const response = await GetRewards(
      `Bearer ${_token}`,
      _limit,
      _offset
    );
    const data = await response.json();
    if (response.ok) {
      setRewardsData((prev) => [...prev, ...data.rewards]);
      nextRewards.current = data.next;
      return {ok: true, status: response.status, data: null};
    } else {
      return {ok: false, status: response.status, data: data};
    }
  };

  const requestMoreRewardsByURL = async (_token) => {

    if (nextRewards === null || nextRewards.current === null || nextRewards.current === "") {
      return;
    }

    const response = await GetRewardsByUserWithURL(
      `Bearer ${_token}`,
      nextRewards.current
    );
    const data = await response.json();
    if (response.ok) {
      setRewardsData((prev) => [...prev, ...data.rewards]);
      nextRewards.current = data.next;
      return {ok: true, status: response.status, data: null};
    } else {
      return {ok: false, status: response.status, data: data};
    }
  };


  const requestMoreChallenges = async (
    _challengeStatusFilter,
    _transactionStatusFilter,
    _token,
    _limit,
    _offset
  ) => {

    if (nextChallenges === null) {
      return;
    }

    const response = await GetChallengesByUser(
      `Bearer ${_token}`,
      _challengeStatusFilter,
      _transactionStatusFilter,
      _limit,
      _offset
    );
    const data = await response.json();
    if (response.ok) {
      setChallengesData((prev) => [...prev, ...data.challenges]);
      nextChallenges.current = data.next;
      return {ok: true, status: response.status, data: null};
    } else {
      return {ok: false, status: response.status, data: data};
    }
  };

  const requestMoreChallengesByURL = async (_token) => {
    if (nextChallenges === null || nextChallenges.current === null || nextChallenges.current === "") {
      return;
    }

    const response = await GetChallengesByUserWithURL(
      `Bearer ${_token}`,
      nextChallenges.current
    );
    const data = await response.json();
    if (response.ok) {
      setChallengesData((prev) => [...prev, ...data.challenges]);
      nextChallenges.current = data.next;
      return {ok: true, status: response.status, data: null};
    } else {
      return {ok: false, status: response.status, data: data};
    }
  };

  const requestMoreUserRewardsTransactions = async (_token, _limit, _offset) => {
     if (nextUserRewardTransaction === null) {
      return;
    }

    const response = await GetPurchasedRewards(
      `Bearer ${_token}`,
      _limit,
      _offset
    );
    const data = await response.json();
    if (response.ok) {
      setUserRewardsTransactionData((prev) => [...prev, ...data.transactions]);
      nextUserRewardTransaction.current = data.next;
      return {ok: true, status: response.status, data: null};
    } else {
      return {ok: false, status: response.status, data: data};
    }
  };

  const requestMoreUserRewardsTransactionsByURL = async (_token) => {
    if (nextUserRewardTransaction === null || nextUserRewardTransaction.current === null || nextUserRewardTransaction.current === "") {
      return;
    }

    const response = await GetPurchasedRewardsWithURL(
      `Bearer ${_token}`,
      nextUserRewardTransaction.current
    );
    const data = await response.json();
    if (response.ok) {
      setUserRewardsTransactionData((prev) => [...prev, ...data.transactions]);
      nextUserRewardTransaction.current = data.next;
      return {ok: true, status: response.status, data: null};
    } else {
      return {ok: false, status: response.status, data: data};
    }
  };

  const requestMoreArticles = async (_token, _limit, _offset) => {
    if (nextArticles === null) {
      return;
    }

    const response = await GetArticles(
      `Bearer ${_token}`,
      _limit,
      _offset
    );
    const data = await response.json();
    if (response.ok) {
      setArticleData((prev) => [...prev, ...data.articles]);
      tempArticlesData.current = [...tempArticlesData.current, ...data.articles];
      totalArticles.current = data.total;
      nextArticles.current = data.next;
      return {ok: true, status: response.status, data: null};
    } else {
      return {ok: false, status: response.status, data: data};
    }
  };

  const requestMoreArticlesByURL = async (_token) => {
    if (nextArticles === null || nextArticles.current === null || nextArticles.current === "") {
      return;
    }

    const response = await GetPurchasedRewardsWithURL(
      `Bearer ${_token}`,
      nextArticles.current
    );
    const data = await response.json();
    if (response.ok) {
      setArticleData((prev) => [...prev, ...data.articles]);
      tempArticlesData.current = [...tempArticlesData.current, ...data.articles];
      totalArticles.current = data.total;
      nextArticles.current = data.next;
      return {ok: true, status: response.status, data: null};
    } else {
      return {ok: false, status: response.status, data: data};
    }
  };

  const requestNextArticle = async (_token) => {
    if ((articlePosition.current + 1) < (articleData.length)) {
      setCurrentArticle(articleData[articlePosition.current + 1]);
      articlePosition.current = articlePosition.current + 1;
    } else {
      if (nextArticles.current != null) {
        await requestMoreArticlesByURL(_token);
        setCurrentArticle(tempArticlesData.current[articlePosition.current + 1]);
        articlePosition.current = articlePosition.current + 1;
      }
    }
    return;
  };

  const requestMoreTopUsers = async (_token, _limit, _offset) => {
    if (nextTopUsers === null) {
      return;
    }

    const response = await GetTopUsers(
      `Bearer ${_token}`,
      _limit,
      _offset
    );
    const data = await response.json();
    if (response.ok) {
      setTopUsersData((prev) => [...prev, ...data.users]);
      nextTopUsers.current = data.next;
    }
  };

  const RequestMoreTopUsersByURL = async (_token) => {
    if (nextTopUsers === null || nextTopUsers.current === null || nextTopUsers.current === "") {
      return;
    }

    const response = await GetTopUsersByURL(
      `Bearer ${_token}`,
      nextTopUsers.current
    );
    const data = await response.json();
    if (response.ok) {
      setTopUsersData((prev) => [...prev, ...data.users]);
      nextTopUsers.current = data.next;
    }
  }

  const initRequestFooterLinks = async () => {
    const response = await GetFooterLinks();
    const data = await response.json();
    if (response.ok) {
      footerLinksData.current = data;
    }
  };

  const SetUserData = (_Data) => {
    UserData.current = _Data;
    if(UserData.current !== null)
      setUserDiamonds(UserData.current.user.related.diamonds);
  };

  const setNewChallengeTransaction = async (_transaction) => {
    var tempChallenge = currentChallenge;
    tempChallenge.transaction = _transaction;
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
        landingPageData,
        mainPageData,
        totalArticles,
        footerLinksData,
        SetUserData,
        setRewardsData,
        setUserRewardsTransactionData,
        setChallengesData,
        setCurrentChallenge,
        setCurrentReward,
        setCurrentArticle,
        setLandingPageData,
        setMainPageData,
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
        initLandingPage,
        initRequestTopUsers,
        setNewChallengeTransaction,
        setNewReward,
        setNewUserDiamonds,
        setTopUsersData,
        loadNextArticle,
        hasNextArticle,
        initRequestFooterLinks
      }}
    >
      {children}
    </ElementContextData.Provider>
  );
};

export { ElementContextData, ElementProviderData };
