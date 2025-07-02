import { useState, useEffect, useRef, useContext } from "react";
import MyRewardsListItem from "./MyRewardsListItem";
import { ElementContextData } from "../context/DataContext";

function MyRewardsList({ changeToSubPage }) {
  const [isLoading, setIsLoading] = useState(false);

  const listContainerRef = useRef(null);

  const limit = 10;

  const { initRequestUserRewardsTransactions, currentUserRewardTransaction, requestMoreUserRewardsTransactionsByURL, nextUserRewardTransaction } = useContext(ElementContextData);

  useEffect(() => {
    initRequestUserRewardsTransactions(limit, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMoreUserRewardsTransactions = () => {
    if(isLoading) return;
    if(nextUserRewardTransaction.current === null) return;
    setIsLoading(true);
    setTimeout(async () => {
      await requestMoreUserRewardsTransactionsByURL();
      setIsLoading(false);
    }, 1000);
  };

  const handleScroll = () => {
    if (
      listContainerRef.current &&
      listContainerRef.current.scrollTop +
        listContainerRef.current.clientHeight >=
        listContainerRef.current.scrollHeight - 20 &&
      !isLoading
    ) {
      loadMoreUserRewardsTransactions();
    }
  };

  const handleSelectRewardTransaction = (transactionData) => {
    currentUserRewardTransaction.current = transactionData;
    changeToSubPage();
  };

  const userRewardsTransactionData = [
    {
    transactionable: {
      image_url: "",
      name: "Nombre generico",
      stock: 2,
    },
    created_at: "2025-06-19T21:35:26.000000Z"
  }
  ]

  return (
    <>
      {userRewardsTransactionData != null ? (
        <div
          className="listContainer"
          ref={listContainerRef}
          onScroll={handleScroll}
          style={{ overflowY: "auto", height: "84vh", width: "100%" }}
        >
          {userRewardsTransactionData.map((transaction, index) => (
            <div key={index}>
                    {" "}
                    <div key={index} onClick={() => handleSelectRewardTransaction(transaction)}>
                      <MyRewardsListItem reward={transaction.transactionable} userTransaction={transaction} />
                    </div>
                </div>
          ))}

          {isLoading && (
            <div className="loading">Cargando más recompensas...</div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default MyRewardsList;