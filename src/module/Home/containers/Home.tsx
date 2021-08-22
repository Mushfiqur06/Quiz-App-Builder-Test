import Layout from "../../common/Layout";
import Slider from "../../slider/container";
import QuizeCategory from "../../dashboard/container/Category";

export default function Home() {
  return (
    <>
      <div>
        <Layout>
          <Slider />
          <QuizeCategory />
        </Layout>
      </div>
    </>
  );
}
