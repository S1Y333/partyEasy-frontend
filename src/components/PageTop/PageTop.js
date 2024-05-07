import "./PageTop.scss"
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import { Link } from "react-router-dom";

const PageTop = ({ title }) => {
 return (
   <div className="page__title">
     <Link to={`/packageList`} className="link">
       <ArrowCircleLeftOutlinedIcon />
     </Link>
     <h3 className="page__title-copy">{title}</h3>
   </div>
 );
}

export default PageTop