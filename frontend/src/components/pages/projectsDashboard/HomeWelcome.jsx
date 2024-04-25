import { Link } from 'react-router-dom';
import kortele from '../../../assets/kortele.jpg'

const HomeWelcome = () => {
  return (
    <div className="create">
      <img src={kortele} alt="kortele" />
      <h2>Welcome to the Project Management App</h2>
      <p>Manage your projects efficiently with our user-friendly interface.</p>
      <Link to="/login">
        <button className='home-button'>Login</button>
      </Link>
      <Link to="/register">
        <button className='home-button'>Register</button>
      </Link>
    </div>
  );
}

export default HomeWelcome;