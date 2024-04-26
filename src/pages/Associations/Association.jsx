import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ApiUrl } from '../../components/API/Api';


const Association = () => {
  const location = useLocation();
  const url = location.pathname;
  const [id, setId] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const path = {
      '/lector-ministry': 4,
      '/altar-service': 5,
      '/liturgy-committee': 6,
      '/music-ministry' : 7,
      '/prayer-group': 8,
      '/divine-spark': 9,
      '/kristanjali-news': 10,
      '/legion-mary' : 11,
      '/assisi-malar' : 12,
      '/secular-order' : 13,
      '/vincent-de-paul' : 14,
      '/prison-ministry' : 15,
      '/family-cell' : 16,
      '/mother-theresa' : 17,
      '/jesus-youth' : 18,
      '/living-clay' : 19,
      '/education-aid' : 20,
      '/family-welfare' : 21,
      '/sunday-school' : 22
    };
    setId(path[url] ? path[url] : url);
  }, [url]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${ApiUrl}/get/Pages`);
        const newPages = response?.data?.pages;

        localStorage.setItem('Pages', JSON.stringify(newPages));

        setData(newPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">loading...</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center mt-5">
        <b>No Data Available</b>
      </div>
    );
  }

  const filterdata = data.filter((item) => item.id === id);

  return (
    <>
      <div className="container subpage">
        <div className="row">
          <div className="col-lg-12">
            {filterdata?.map((item) => (
              <div key={item.id} className="custom-card-body">
                <h1 style={{ textAlign: 'center' }}>{item.title}</h1>
                <div
                  dangerouslySetInnerHTML={{
                    __html: `${item.content}`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Association;