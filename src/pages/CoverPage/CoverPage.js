import HeaderLogo from '../../components/HeaderLogo/HeaderLogo'
import './CoverPage.scss'
import { Link } from "react-router-dom";

const CoverPage = () => {
    
    return (
<<<<<<< HEAD
      <div className="cover">
        <HeaderLogo />
        <Link to="/formPage" className="header__link">
          <button className="cover__button">PLAN NOW</button>
=======
      <div className="cover ">
        <HeaderLogo />
        <Link to="/formPage" className="header__link">
          <div className="cover__container">
            <button className="cover__button">PLAN NOW</button>
          </div>
>>>>>>> cdfe2add478870de480dc1b904a86a39b0406f20
        </Link>
      </div>
    );
}

export default CoverPage