import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ApiUrl } from "../../components/API/Api";
const NewsLetter = () => {
    const [newsletterData, setNewsletterData] = useState([]);

    useEffect(() => {
        axios
            .get(`${ApiUrl}/get/Newsletter`)
            .then((response) => {
                const allData = response?.data?.data;
                allData.sort((a, b) => new Date(b.eventdate) - new Date(a.eventdate));
                const latestData = allData.slice(0, 5);
                setNewsletterData(latestData);
            })
            .catch((error) => {
                console.error("Error fetching newsletter data:", error);
            })
    }, []);

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                    <div className="section-headingd">
                        <h3 className="entry-title text-center">Monthly Newsletter</h3>
                    </div>
                    <center>
                        <div className="scrollable-content justify-content-center mt-4">
                            {newsletterData.length > 0 ? (
                                newsletterData?.map((newsletter) => (
                                    <div
                                        key={newsletter.id}
                                        className="card shadow mb-2"
                                        style={{ maxWidth: "600px", height: "100px" }}
                                    >
                                        <div className="card-body text-center">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <img
                                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/391px-PDF_file_icon.svg.png"
                                                    alt="PDF Icon"
                                                    className="mb-3"
                                                    style={{ width: "50px" }}
                                                />
                                                <div className="text-center">
                                                    <h5 className="card-title mb-2">{newsletter.title}</h5>
                                                    <p className="card-text mb-3">{newsletter.eventdate}</p>
                                                </div>
                                                <a
                                                    href={newsletter.file_url}
                                                    className="btn btn-sm btn-primary"
                                                    download
                                                >
                                                    Download
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>
                                    <b>No Newsletter available</b>
                                </p>
                            )}

                            {newsletterData.length >= 5 && (
                                <center>
                                    <Link
                                        to={"/newsletter"}
                                        style={{
                                            backgroundColor: "#012c6d",
                                            color: "white",
                                            textDecoration: "none",
                                            display: "inline-block",
                                            padding: "8px 16px",
                                            borderRadius: "5px",
                                            marginTop: "10px",
                                            fontSize: "14px",
                                        }}
                                    >
                                        View More
                                    </Link>
                                </center>
                            )}
                        </div>
                    </center>
                </div>
            </div>
        </div>
    );
};

export default NewsLetter;