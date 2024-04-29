import NavHeader from "../../components/NavHeader/NavHeader";
import PackageCard from "../../components/PackageCard/PackageCard";
import PageTop from "../../components/PageTop/PageTop";
import "./PackageList.scss";

const PackageList = () => {
  return (
    <div className="cover-form packagelist">
      <NavHeader />
      <PageTop title="Package List" />
      <div className="packagelist__container">
        <PackageCard />
      </div>
    </div>
  );
};

export default PackageList;
