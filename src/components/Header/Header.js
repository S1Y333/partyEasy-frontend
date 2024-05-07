import "./Header.scss";
import NavHeader from "../../components/NavHeader/NavHeader";
import Avatar from "@mui/material/Avatar";


function Header({ page, name, avatarLink}) {
    // const avatarLink =
    //     "https://res.cloudinary.com/dtq1qzwxn/image/upload/v1714399544/3_jgj0il.jpg";
    
  return (
    <div className="header-container">
      <header className="header">
        <NavHeader />
        {page === "question" ? (
          <div>
            <h3 className="header__title">Tell me about your party</h3>
            <p className="header__copy">
              Fill in the form to get recommended package!
            </p>
          </div>
        ) : (
          <div className="avatar">
            <Avatar
              alt="Cindy"
              src={avatarLink}
              sx={{ width: 50, height: 50 }}
            />
            <h3 className="header__title">Welcome, {name}</h3>
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;
