import { useState, useEffect, useRef, useContext } from 'react';
import RewardsListItem from "./RewardsListItem";
import { ElementContextData } from '../context/DataContext';

function RewardsList({changeToSubPage}) {
  const [rewards, setRewards] = useState([1, 2, 3, 4, 5, 6, 7, 8 , 9, 10]);
  const [isLoading, setIsLoading] = useState(false);
  const listContainerRef = useRef(null);
  const { currentChallenge } = useContext(ElementContextData);
  const loadMoreRewards = () => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const newRewards = Array.from({ length: 5 }, (_, i) => 
        rewards.length + i + 1
      );
      
      setRewards(prev => [...prev, ...newRewards]);
      setIsLoading(false);
    }, 1000);
  };

  const handleScroll = () => {
    if (
      listContainerRef.current &&
      listContainerRef.current.scrollTop + listContainerRef.current.clientHeight >= 
      listContainerRef.current.scrollHeight - 20 &&
      !isLoading
    ) {
      loadMoreRewards();
    }
  };

  const handleSelectReward =  (itemData) => {
    console.log("aca")
    currentChallenge.current = itemData
    changeToSubPage()
  }

  return (
    <div 
      className="listContainer" 
      ref={listContainerRef}
      onScroll={handleScroll}
      style={{ overflowY: 'auto', height: '84vh' }}
    >
      {rewards.map((reward, index) => (
        <div onClick={handleSelectReward}> <RewardsListItem 
          key={index}
          reward={reward}
        /></div>
       
      ))}
      
      {isLoading && <div className="loading">Cargando más recompensas...</div>}
    </div>
  );
}

export default RewardsList;