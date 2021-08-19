import React from "react";
import Layout from "../../common/Layout";
import Slider from "../../slider/container";
import QuizeCategory from "./Category";

export default function Dashboard() {
  return (
    <>
      <Layout>
        <Slider />
        <QuizeCategory />
      </Layout>
    </>
  );
}
