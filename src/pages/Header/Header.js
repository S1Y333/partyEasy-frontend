
import "./Header.scss";
import NavHeader from "../../components/NavHeader/NavHeader";

function Header() {
  return (
    <div className="header-container">
      <header className="header">
       <NavHeader />
        <div>
          <h3 className="header__title">Tell me about your party</h3>
          <p className="header__copy">
            Fill in the form to get recommended package!
          </p>
        </div>
      </header>
    </div>
  );
}

export default Header;
