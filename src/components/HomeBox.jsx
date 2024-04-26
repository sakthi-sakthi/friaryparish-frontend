import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import './css/homebox.css';
import { Link } from 'react-router-dom';
function HomeBox() {
    const [news, setNews] = useState([]);
    const [massSchedule, setMassSchedule] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [noData, setNoData] = useState(false);

    useEffect(() => {
        const fetchVideos = async () => {
          try {
            const cachedVideos = localStorage.getItem("cachedVideos");
            if (cachedVideos) {
              setVideos(JSON.parse(cachedVideos));
            } else {
              const response = await axios.get(
                "https://youtube.googleapis.com/youtube/v3/search",
                {
                  params: {
                    part: "snippet",
                    channelId: "UCqcc8CPKKO-UMlprD5iT4_Q",
                    maxResults: 4,
                    order: "date",
                    key: "AIzaSyAau7RTNPjHfPwlewNWCcyXrssH4VMEI0w"
                  }
                }
              );
              const fetchedVideos = response.data.items;
              setVideos(fetchedVideos);
              localStorage.setItem("cachedVideos", JSON.stringify(fetchedVideos));
            }
          } catch (error) {
            console.error("Error fetching videos:", error);
          }
        };
    
        fetchVideos();
      }, []);

    useEffect(() => {
        setLoading(true);
        axios
            .get('https://cors-anywhere.herokuapp.com/https://cristolive.org/api/news/17533/upcoming')
            .then((res) => {
                setNews(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://cors-anywhere.herokuapp.com/https://cristolive.org/api/liturgy/17533');
                setMassSchedule(response.data.data);
                setLoading(false);
                if (response.data.data.length === 0) {
                    setNoData(true);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
    };

    const [selectedNews, setSelectedNews] = useState(null);

    const handleImageClick = (item) => {
        setSelectedNews(item);
    };

    const handleCloseModal = () => {
        setSelectedNews(null);
    };

    return (
        <Container fluid >
            <Row>
                <Col xs={12} sm={4}>
                    <div className="news-container section-box-data">
                        <h4 className='home-box-title'>News / Events</h4>
                        <div className="home-box-icon">
                            <i aria-hidden="true" className="fas fa-calendar"></i>
                        </div>
                        {news ? (
              news.length > 0 ? (
                <>
                  {news.slice(0, 3).map((data) => (
                    <div className="card-media" key={data?.id}>
                      <div className="card-media-object-container">
                        <div
                          className="card-media-object"
                          style={{
                            backgroundImage: `url(${data?.image})`,
                          }}
                          onClick={() => handleImageClick(data)}
                        />
                      </div>
                      <div className="card-media-body">
                        <span className="card-media-body-heading">
                          <Link to={`/news?newsid=${data?.id}`}>
                            {data?.name}
                          </Link>
                        </span>
                        <div className="card-media-body-top">
                          <span className="subtle"><i className="fa fa-calendar" /> {data?.date}</span>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: data?.description }} />
                        {/*     <Link to={`/news?newsid=${data?.id}`} className="read-more-btn"> Read More <i className="flaticon-next" /></Link> */}
                      </div>
                    </div>
                  ))}
                  {news.length >= 3 && (
                    <center><Link to="/news" className="view-more-btn">View More</Link></center>
                  )}
                </>
              ) : (
                <div style={{ color: "black" }}><b>No News available</b></div>
              )
            ) : (
              <div>Loading...</div>
            )}       
                    </div>
                    {selectedNews && (
                        <Modal show={selectedNews !== null} onHide={handleCloseModal} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>{selectedNews.name}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <center>
                                    <img src={selectedNews.image} className="news-image" alt={selectedNews.name} />
                                    <p className="news-date">{selectedNews.date}</p>
                                    <div dangerouslySetInnerHTML={{ __html: selectedNews.description }} />
                                </center>
                            </Modal.Body>
                            <Modal.Footer>
                                <button className="btn btn-secondary" style={{ backgroundColor: "#ac1e30" }} onClick={handleCloseModal}>
                                    Close
                                </button>
                            </Modal.Footer>
                        </Modal>
                    )}
                </Col>
                <Col xs={12} sm={4}>
                    <div className="section-box-data">
                        <h4 className='home-box-title'>Mass Schedule</h4>
                        <div className="home-box-icon">
                            <i aria-hidden="true" className="fas fa-clock"></i>
                        </div>
                        {loading &&   <p><center>Loading...</center></p>}
                        {!loading && noData && <p><center>No data available</center></p>}
                        {!loading && !noData && (
                            <>
                                <div className="mass-schedule-container align-items-justify">
                                    {massSchedule.map(schedule =>
                                        <div key={schedule.liturgy_on} className="event">
                                            <h3 className="schedule-title"><i aria-hidden="true" className="fas fa-calendar"></i> {formatDate(schedule.liturgy_on)}</h3>
                                            {schedule.mass.map(language =>
                                                <div key={language.language} className='mass-new-time'>
                                                    {['English', 'Tamil', 'Malayalam', 'Kannada', 'Konkani'].includes(language.language) &&
                                                        <>
                                                            <span className="schedule">{language.language}</span> -&nbsp;
                                                            {language.mass_detail.map((detail, index) =>
                                                                <React.Fragment key={detail.mass_id}>
                                                                    <span className="schedule">{detail.mass_time}</span>
                                                                    {index === language.mass_detail.length - 1 ? '.' : ','}&nbsp;
                                                                </React.Fragment>
                                                            )}
                                                            
                                                            {/* <hr className="separator" /> */}
                                                        </>
                                                    }
                                                    
                                                </div>
                                            )}
                                            
                                        </div>
                                    )}
                                </div>
                                 {massSchedule ? 
                                
                                    <button className="btn btn-primary text-right" id='more-button'>View More</button>
                                   
                                    : ''}
                                
                                <br />
                                <div className="mass-schedule-container align-items-justify">
                                    <h3 className="home-box-title"> Parish Office Timings</h3>
                                    <div className='mass-new-time'>
                                        <span className="schedule">Weekdays : 09:30am , 01:00pm , 03:30pm </span>
                                        <br />
                                        <span className="schedule">Sundays : 08:00am , 12:00 noon </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </Col>
                <Col xs={12} sm={4}>
                    <div className="section-box-data">
                        <h4 className='home-box-title'>Parish YouTube</h4>
                        <div className="home-box-icon">
                            <i aria-hidden="true" className="fas fa-praying-hands"></i>
                        </div>
                        <div className="youtube-videos-container">
                            <div className="main-top-video">
                                {videos.length > 0 && (
                                    <iframe
                                        title="Main Top Video"
                                        width="100%"
                                        height="200px"
                                        src={`https://www.youtube.com/embed/${videos[0].id.videoId}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                )}
                            </div>
                            <div className="related-videos">
                                <div className="row">
                                    {videos.slice(1).map((video) => (
                                        <div key={video.id.videoId} className="col-xs-12 col-sm-4">
                                            <iframe
                                                title="Related Video"
                                                width="100%"
                                                height="130px"
                                                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            ></iframe>
                                            <p style={{fontSize: '12px'}}>{video.snippet.title}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default HomeBox;
