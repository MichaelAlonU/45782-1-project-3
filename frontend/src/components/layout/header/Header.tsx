import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
    return (
        <div className='Header'>
            <h1> Teams Meetings </h1>
            <nav>
                <NavLink to="/meetings">Meetings </NavLink> | <NavLink to="/add-meet">Add Meeting</NavLink>
            </nav>
        </div>
    );
}