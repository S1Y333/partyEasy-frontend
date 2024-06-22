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
          console.log(checkLike + " " + id);
            return (
              <PackageCard
                key = {id}
                authtoken={user?.token}
                packageInfo={pack}
                checkLike={checkLike}
                checkSave={checkSave}
              />
            );
          })
        : packageList?.map((pack, id) => (
            <PackageCard
              packageInfo={pack}
               checkLike="false"
              checkSave="false"
            />
          ))}
    </div>
  );
};

export default PackageList;
