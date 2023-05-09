import React, { Fragment, useEffect, useState } from "react";
import UsersList from "./components/UsersList";
import ProductsList from "./components/ProductsList";
import Chip from "./components/Chip";

const Landing: React.FC<any> = () => {

  return (
    <Fragment>
        <UsersList />
        <ProductsList />
        <Chip />
    </Fragment>
  );
};

export default Landing;
