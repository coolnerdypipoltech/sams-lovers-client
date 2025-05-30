function HeaderMenu({handleBack, handleMenuRoute, handleLogOut}){
    return (<>
        <div className="header-menu">
            <div className="header-menu-top-container">
                <div className="header-menu-back-text-container">
                    <p className="header-menu-back-text" onClick={handleBack}>Volver</p>
                </div>
                <img
                    className="header-menu-logo"
                    alt="logo"
                    src="/sams-lovers-client/static/media/Brand_SamsLovers.cd3316c5163e4c0b96992c9a0dd68168.svg"
                ></img>
                <div className="header-menu-back-text-empty"></div>
            </div>
            <div className="header-menu-column">
                <div className="header-menu-element" onClick={e => handleMenuRoute("Main")}>Inicio</div>
                <div className="header-menu-element" onClick={e => handleMenuRoute("Rewards")}>Recompensas</div>
                <div className="header-menu-element" onClick={e => handleMenuRoute("Challenges")}>Retos</div>
                <div className="header-menu-element" onClick={e => handleMenuRoute("Profile")}>Perfil</div>
                <div className="header-menu-element" onClick={e => handleMenuRoute("Codes")}>Códigos</div>
                <div className="header-menu-element-logout" onClick={e => handleLogOut()}>Cerrar sesión</div>
            </div>
        </div>
    </>);
}

export default HeaderMenu;