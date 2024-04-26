import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiUrl } from "./API/Api";

function Footer() {
  const [contactInfo, setContactInfo] = useState({
    mobile: "",
    email: "",
    address: "",
    googleMapsUrl: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/contactDetails`);
        setContactInfo(response?.data?.data);
      } catch (error) {
        console.error("Error fetching contact information:", error);
      }
    };

    fetchData();
  }, []);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="site-footer">
        <div className="footer-widgets">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-4">
                <div className="section-heading">
                  <h2 className="entry-title">About Us</h2>
                </div>
                <div className="row" style={{ marginTop: "-19px" }}>
                  <div className="col-4">
                    <img
                      src="images/all-img/footlogonew.png"
                      alt=""
                      style={{
                        display: "block",
                        maxWidth: "110px",
                        maxHeight: "150px",
                        marginLeft: "-15px",
                      }}
                    />
                  </div>
                  <div className="col-8">
                    <p
                      style={{
                        color: "white",
                        fontSize: "14px",
                      }}
                    >
                      On November 13th 1952, St. Anthony’s Friary with a small chapel for the friars was blessed. A handful of Catholics from Adugodi and the Police quarters attended Mass on Sundays in this chapel.
                    </p>
                  </div>
                  <p
                    style={{
                      color: "white",
                      fontSize: "14px",
                    }}
                  >
                    In 1953 on March 11, the Mission Unit of St. Anthony was erected and this was the birth of the parish of St. Anthony.
                  </p>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <div className="foot-latest-news">
                  <div className="section-heading">
                    <h2 className="entry-title">Other Links</h2>
                  </div>

                  <div className="quick-links">
                    <ul>
                      <img src="images/all-img/f_fb.png" alt="" />
                      <a href="https://www.bangalorearchdiocese.org/" target="_blank" rel="noreferrer" className="text-white" id="list-inline-data">
                      &nbsp;&nbsp;Archdiocese of Bangalore
                      </a>
                      <br />
                      <br />
                      <img src="images/all-img/f_t.png" alt="" />
                      <a href="https://www.vatican.va/content/vatican/en.html" target="_blank" rel="noreferrer" className="text-white" id="list-inline-data">
                      &nbsp;&nbsp;Vatican Church
                      </a>
                      <br />
                      <br />
                      <img src="images/all-img/francis.png" alt="" />
                      <a href="https://www.franciscansindia.com/" target="_blank" rel="noreferrer" className="text-white" id="list-inline-data">
                      &nbsp;&nbsp;Franciscans in India
                      </a>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-3">
                <div className="foot-contact">
                  <div className="section-heading">
                    <h2 className="entry-title">Contact Us</h2>
                  </div>
                  <div className="contact-us">
                    <ul>
                      <li>
                        <i className="fa fa-map-marker mr-2" />
                        <span>
                          <p
                            style={{
                              color: "#fff",
                              marginLeft: "16px",
                              textAlign: "left",
                            }}
                          >
                            {contactInfo.address}
                          </p>
                        </span>
                      </li>
                      <li>
                        <i className="fa fa-phone mr-2" />
                        <Link to={`tel:${contactInfo.mobile}`}>
                          {contactInfo.mobile}
                        </Link>
                      </li>
                      <li>
                        <i className="fa fa-envelope mr-2" />
                        <Link to={`mailto:${contactInfo.email}`}>
                          {contactInfo.email}
                        </Link>
                      </li>
                      <li>
                        <a
                          href="https://www.youtube.com/channel/UCqcc8CPKKO-UMlprD5iT4_Q?app=desktop"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-youtube mr-2" />
                        </a>
                        &nbsp;
                        <a href="/" target="_blank" rel="noreferrer">
                          <i className="fab fa-instagram mr-2" />
                        </a>
                        &nbsp;
                        <a
                          href="/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fab fa-facebook mr-2" />
                        </a>
                        &nbsp;
                        <a href="/" target="_blank" rel="noreferrer">
                          <i className="fab fa-linkedin" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-2">
                <div className="foot-contact">
                  <div className="section-heading">
                    <h2 className="entry-title">Location</h2>
                  </div>
                  <iframe
                    src={contactInfo.googleMapsUrl}
                    width="250"
                    height="200"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="salem"
                    style={{ marginTop: "-30px" }}
                  />
                </div>
              </div>
            </div>
            <div style={{ marginBottom: "-17px" }}>
              <p
                className="text-center"
                style={{ fontSize: "14px", color: "white" }}
              >
                Copyright © {currentYear} St. Anthony’s Friary Church , All rights reserved.
                Powered by
                <a
                  className="tech"
                  style={{ color: "#ffd700" }}
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.boscosofttech.com/"
                >
                  &nbsp;Boscosofttech
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
