import topThreeDiamond from "../assets/diamond.svg";
import obscureDiamond from "../assets/Numero.png";
import profileCircle from "../assets/Foto_perfil.png";

function SamsLoversRankingItem({topUser, rank}) {
    const TOP_THREE_INDEX_LIMITER = 2;

    return(
        <>
        <div>
            {(topUser.rank >= TOP_THREE_INDEX_LIMITER) ?
                (<div>
                    <img src={topThreeDiamond} alt="Top 1 ranking illustration"></img>
                    <p>{rank}</p>
                </div>)
            :
                (<div>
                    <img src={obscureDiamond} alt="Ranking Illustration"></img>
                    <p>{rank}</p>
                </div>)
            }
            <img src={profileCircle} alt=""></img>
            <p>{`@${topUser.user.name}`}</p>
            <p>{`${topUser.transactions_count} Retos`}</p>
        </div>
        </>
    );
}

export default SamsLoversRankingItem;