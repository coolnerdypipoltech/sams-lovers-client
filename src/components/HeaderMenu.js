function HeaderMenu({handleMenuRoute, handleLogOut}){
    return (<>
        <div className="header-menu">
            <div className="column">
                <div className="header-menu-element" onClick={e => handleMenuRoute("Main")}>Inicio</div>
                <div className="header-menu-element" onClick={e => handleMenuRoute("Rewards")}>Recompensas</div>
                <div className="header-menu-element" onClick={e => handleMenuRoute("Challenges")}>Retos</div>
                <div className="header-menu-element" onClick={e => handleMenuRoute("Profile")}>Perfil</div>
                <div className="header-menu-element" onClick={e => handleMenuRoute("Codes")}>Códigos</div>
                <br/>
                <div className="header-menu-element" onClick={e => handleLogOut()}>Cerrar sesión</div>
            </div>
        </div>
    </>);
}

export default HeaderMenu;