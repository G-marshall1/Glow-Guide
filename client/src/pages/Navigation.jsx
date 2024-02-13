import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <h1>Glow Guide</h1>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/todays-glow">Todays Glow</Link>
                </li>
                <li>
                    <Link to="/future-glow">Future Glow</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/sign-up">Sign Up</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navigation; 