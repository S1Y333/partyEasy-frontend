
import PackageCard from "../PackageCard/PackageCard";

import "./PackageList.scss";

const PackageList = ({packageList}) => {
 

  return (
   
      <div className="packagelist__container">
        {packageList?.map((pack, id) => (
          <PackageCard packageInfo={pack} />
        ))}
      </div>
    
  );
};

export default PackageList;
