import "./PageTop.scss"
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";

const PageTop = ({ title }) => {
 return (
   <div className="page__title">
     <ArrowCircleLeftOutlinedIcon />
     <h3 className="page__title-copy">{title}</h3>
   </div>
 );
}

export default PageTop