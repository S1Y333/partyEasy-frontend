import PackageList from "../../components/PackageList/PackageList";
import { useEffect, useState } from "react";
import NavHeader from "../../components/NavHeader/NavHeader";

import "./PackageListPage.scss";
import { Typography } from "@mui/material";
import { getAllPackages } from "../../utils/package-functions";




const PackageListPage = () => {
  //get all package info
  const [packageList, setPackageList] = useState([]);

  useEffect(() => {
    loadAllPackagesInfo();
  }, []);

  const loadAllPackagesInfo = async () => {
    const result = await getAllPackages();
    //console.log(result);
    setPackageList(result.data);
  };
    
  return (
    <div className="cover-form packagelist">
      <NavHeader />
      <div className="packagelist__title">
        <Typography variant="h5">Package List</Typography>
      </div>
      {/* <div className="packagelist__container">
          {packageList?.map((pack, id) => (
            <PackageCard packageInfo={pack} />
          ))}
        </div> */}
      <PackageList packageList={packageList} />
    </div>
  );
}

export default PackageListPage