import PackageList from "../../components/PackageList/PackageList";
import { useEffect, useState } from "react";
import NavHeader from "../../components/NavHeader/NavHeader";

import "./PackageListPage.scss";
import { Typography } from "@mui/material";
import { getAllPackages } from "../../utils/package-functions";
import ChatIcon from "@mui/icons-material/Chat";
import ChatModal from "../../components/ChatModal/ChatModal";

const PackageListPage = () => {
  //get all package info
  const [packageList, setPackageList] = useState([]);
  const [open, setOpen] = useState(false);
  
   const handleClose = () => {
     setOpen(false);
   };

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

      <div className="chaticon__container">
        <ChatIcon
          className="chaticon__img"
          sx={{ width: 50, height: 50 }}
          onClick={() => setOpen(true)}
        />
      </div>
      <ChatModal open={open} handleClose={handleClose} />
     
    </div>
  );
}

export default PackageListPage