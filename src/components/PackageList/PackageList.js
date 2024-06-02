<<<<<<< HEAD

import PackageCard from "../PackageCard/PackageCard";

import "./PackageList.scss";

const PackageList = ({packageList}) => {
 

  return (
   
      <div className="packagelist__container">
        {packageList?.map((pack, id) => (
          <PackageCard packageInfo={pack} />
        ))}
      </div>
    
=======
import PackageCard from "../PackageCard/PackageCard";
import { useSelector } from "react-redux";
import "./PackageList.scss";
import { findKey } from "../../utils/helper";

const PackageList = ({ packageList }) => {
  const { user } = useSelector((state) => state.user);
  //console.log(findKey(user.likes, 11));
  //check if package id is in the likes array, if yes, pass checklike=true,

  return (
    <div className="packagelist__container">
      {user
        ? packageList?.map((pack, id) => {
            const checkLike = findKey(user?.likes, id) || false;
            const checkSave = findKey(user?.saves, id) || false;
            return (
              <PackageCard
                packageInfo={pack}
                checkLike={checkLike}
                checkSave={checkSave}
              />
            );
          })
        : packageList?.map((pack, id) => (
            <PackageCard
              packageInfo={pack}
              // checkLike="false"
              // checkSave="false"
            />
          ))}
    </div>
>>>>>>> cdfe2add478870de480dc1b904a86a39b0406f20
  );
};

export default PackageList;
