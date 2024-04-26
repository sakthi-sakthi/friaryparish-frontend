import { useEffect, useState } from "react";
import { ApiUrl } from "./components/API/Api";
import Footer from "./components/footer";
import Header from "./components/header";
import Scrollbar from "./components/scrollbar";
import Slider from "./components/slider";
import axios from "axios";
import { CirclesWithBar } from "react-loader-spinner";
import HomeBox from "./components/HomeBox";

function Home() {
  const [homedata, setHomedata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/homepagee/sections`);
        localStorage.setItem("HomeData", JSON.stringify(response?.data?.data));
        setHomedata(response?.data?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchpageData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/Pages/{id}`);
        const newData = response?.data?.pages;
        localStorage.removeItem("Pages");
        localStorage.setItem("Pages", JSON.stringify(newData));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchpageData();
    fetchData();
  }, []);


  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CirclesWithBar
          height="100"
          width="100"
          color="#4691CE"
          outerCircleColor="#4691CE"
          innerCircleColor="#4691CE"
          barColor="#4691CE"
          ariaLabel="Friary Parish Loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#CEE9F0" }}>
      <Header menudata={homedata?.headermenudata} />
      <Slider sliderdata={homedata?.SlidesData} />
      <Scrollbar />
      <br/>
      <HomeBox  />
      <br/>
      <Footer />
    </div>
  );
}

export default Home;
