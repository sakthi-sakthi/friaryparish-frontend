import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ApiUrl } from "../../components/API/Api";

function MainFooter() {
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
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="section-heading">
                                    <h2 className="entry-title">About Us</h2>
                                </div>
                                <div className="row" style={{ marginTop: "-19px" }}>
                                    <div className="col-4">
                                        <img
                                            src="images/all-img/footlogo.png"
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
                                                textAlign: "justify ",
                                                fontSize: "13px",
                                            }}
                                        >
                                            The Diocese of Salem comprises of civil districts of Salem
                                            and Namakkal. In 1623 Southern Kongunadu, part of Salem
                                            District, under Madurai Nayakkars accepted Christianity.
                                        </p>
                                    </div>
                                    <p
                                        style={{
                                            color: "white",
                                            textAlign: "justify",
                                            fontSize: "13px",
                                        }}
                                    >
                                        In 1687, the Mysore Mission laboured in the entire area of
                                        the present diocese. Fr. De Cunha died in 1711 at
                                        Kapiganathi near Hosur.
                                    </p>
                                </div>
                            </div>

                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="foot-latest-news">
                                    <div className="section-heading">
                                        <h2 className="entry-title">Quick Links</h2>
                                    </div>

                                    <div className="quick-links">
                                        <ul>
                                            <li>
                                                <i className="fas fa-history"></i>
                                                <Link to={"/history"}>History</Link>
                                            </li>
                                            <li>
                                                <i className="fas fa-clock"></i>
                                                <Link to={"/masstimings"}>Mass Time </Link>
                                            </li>
                                            <li>
                                                <i className="fas fa-users"></i>
                                                <Link to={"/patron"}>Patron</Link>
                                            </li>
                                            <li>
                                                <i className="fas fa-user"></i>
                                                <Link to={"/holyfather"}>Holy Father</Link>
                                            </li>
                                            <li>
                                                <i className="fas fa-money"></i>
                                                <Link to={"/donation"}>Donate</Link>
                                            </li>
                                            <li>
                                                <i className="fas fa-book-dead"></i>
                                                <Link to={"/tribunal"}>Tribunal</Link>
                                            </li>
                                            <li>
                                                <i className="fas fa-church"></i>
                                                <Link to={"/cathedral"}>Cathedral</Link>
                                            </li>
                                            <li>
                                                <i className="fas fa-book"></i>
                                                <Link to={"/contactus"}>Contact</Link>
                                            </li>
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
                                                    href="https://youtube.com/@sansebacommunications?si=0WCixls9l_-nP5dE"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <i className="fab fa-youtube mr-2" />
                                                </a>
                                                &nbsp;
                                                <a
                                                    href="https://www.instagram.com/sansebacommunications?igsh=MW1raGRsYXc4eGFrZQ=="
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    <i className="fab fa-instagram mr-2" />
                                                </a>
                                                &nbsp;
                                                <a
                                                    href="https://www.facebook.com/sultanpet.diocese.1"
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
                            <div className="col-12 col-md-6 col-lg-3">
                                <div className="foot-contact">
                                    <div className="section-heading">
                                        <h2 className="entry-title">Location</h2>
                                    </div>
                                    <iframe
                                        src={contactInfo.googleMapsUrl}
                                        width="300"
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
                                Copyright © {currentYear} Diocese of Salem, All rights reserved.
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

export default MainFooter;
