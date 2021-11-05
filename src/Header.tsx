import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <NavLink to="/Releases">
                <Button>Releases</Button>
            </NavLink>
        </header>
    );
};

export default Header;
