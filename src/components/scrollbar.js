import React from "react";

function Scrollbar({ newsdata }) {
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
                  <p>
                    {newsdata.length === 0 ? (
                      <span>No flash news available</span>
                    ) : (
                      newsdata.map((newsItem, index) => (
                        <span key={index}>
                          <img
                            src={newsItem.media_url}
                            style={{
                              maxWidth: "40px",
                            }}
                            alt=""
                          />
                          <span style={{ cursor: "pointer" }}>
                            {newsItem.title}
                          </span>
                        </span>
                      ))
                    )}
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
