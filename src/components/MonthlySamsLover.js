function MonthlySamsLover({ SamsLover, handleMonthlySamsLoverProfile }) {
    return (
        <>
        <div>
            <div>
                <p>#SamsLovers</p>
                <p>#DesafíoSams</p>
            </div>
            <p>{SamsLover.username}</p>
            <img src={SamsLover.image_url}></img>
            <button onClick={handleMonthlySamsLoverProfile}>Conoce al Sam's Lover del mes</button>
        </div>
        </>
    );
}

export default MonthlySamsLover;