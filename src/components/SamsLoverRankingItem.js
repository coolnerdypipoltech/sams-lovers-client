import topThreeDiamond from "../assets/diamond.svg";
import obscureDiamond from "../assets/Numero.png";
import profileCircle from "../assets/Foto_perfil.png";
import "../styles/SamsRanking.css"
function SamsLoversRankingItem({topUser, rank}) {
    const TOP_THREE_INDEX_LIMITER = 3;
    return(
        <>
        <div className="RankingItemContainer">
            <div className="rowAlign" style={{paddingLeft: "20px", gap: "10px"}}>
                {(rank <= TOP_THREE_INDEX_LIMITER) ?
                (<div className="RankingNumberContainer">
                    <img className="RankingNumberImg" src={topThreeDiamond} alt="Top 1 ranking illustration"></img>
                    <p className="RankingNumberText">{rank}</p>
                </div>)
            :
                (<div className="RankingNumberContainer">
                    <img style={{height: "40px", width: "40px"}} className="RankingNumberImg" src={obscureDiamond} alt="Ranking Illustration"></img>
                    <p style={{top: "-36px"}} className="RankingNumberText">{rank}</p>
                </div>)
            }
            <img className="RankingNumberContainer" src={profileCircle} alt=""></img>
            <p className="RankingUserText">{`@${topUser.user.name}`}</p>
            </div>
            
            <p style={{paddingRight: "20px", fontWeight: "400"}} className="RankingUserText">{`${topUser.transactions_count} Retos`}</p>
        </div>
        </>
    );
}

export default SamsLoversRankingItem;