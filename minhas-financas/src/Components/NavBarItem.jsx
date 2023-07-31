import { Link } from "react-router-dom";

function NavBarItem({linkTo, descricao = 'descrição do link', onClick, icon=''}) {
    return (
        
            <li className="nav-item">
                <Link onClick={onClick} className="nav-link" to={linkTo}>
                    <i className={`pi pi-${icon}`}></i> {descricao}
                </Link>
            </li>
        
    );
}

export default NavBarItem;