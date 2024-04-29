import HeaderLogo from '../../components/HeaderLogo/HeaderLogo'
import './CoverPage.scss'
import { Link } from "react-router-dom";

const CoverPage = () => {
    
    return (
      <div className="cover">
        <HeaderLogo />
        <Link to="/formPage" className="header__link">
          <button className="cover__button">PLAN NOW</button>
        </Link>
      </div>
    );
}

export default CoverPage