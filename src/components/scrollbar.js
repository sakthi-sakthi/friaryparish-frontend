import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiUrl } from "./API/Api";

function Scrollbar() {
  const [isScrollingAllowed, setIsScrollingAllowed] = useState(true);
  const [newsContent, setNewsContent] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/resource/category/9`);
        const allNews = response?.data?.data || [];

        if (allNews.length > 0) {
          setNewsContent(allNews);
        } else {
          setNewsContent([
            {
              title: "No Flash News available",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  const stopScroll = () => {
    setIsScrollingAllowed(false);
  };

  const allowScroll = () => {
    setIsScrollingAllowed(true);
  };

  return (
    <>
      <div className="scrollbar">
        <div className="container">
          <div className="row flex-wrap justify-content-center justify-content-lg-between align-items-lg-center">
            <div className="col-4 col-lg-2 d-flex">
              <div className="label ripple">Flash News</div>
            </div>
            <div className="col-8 col-lg-10 d-md-flex flex-wrap justify-content-center justify-content-lg-start mb-3 mb-lg-0">
              <div className="marqueenews">
                <div className="marquee">
                  <p
                    onMouseEnter={stopScroll}
                    onMouseLeave={allowScroll}
                    onTouchStart={stopScroll}
                    onTouchEnd={allowScroll}
                    style={{ overflow: isScrollingAllowed ? "" : "hidden" }}
                  >
                    {newsContent?.map((newsItem, index) => (
                      <span key={index}>
                        <img
                          src="images/logos/output-onlinegiftools.gif"
                          style={{
                            maxWidth: "40px",
                          }}
                          alt=""
                        />
                        <span style={{ cursor: "pointer" }}>
                          {newsItem?.title}
                        </span>
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Scrollbar;
