import topThreeDiamond from "../assets/diamond.svg";
import obscureDiamond from "../assets/Numero.png";
import profileCircle from "../assets/Foto_perfil.png";

function SamsLoversRankingItem({topUser}) {
    const TOP_THREE_INDEX_LIMITER = 2;

    return(
        <>
        <div>
            {(topUser.rank >= TOP_THREE_INDEX_LIMITER) ?
                <img src={topThreeDiamond}><p>{topUser.rank}</p></img>
            :
                <img src={obscureDiamond}><p>{topUser.rank}</p></img>
            }
            <img src={profileCircle}></img>
            <p>{`@${topUser.username}`}</p>
            <p>{`${topUser.completedChallenges} Retos`}</p>
        </div>
        </>
    );
}

export default SamsLoversRankingItem;