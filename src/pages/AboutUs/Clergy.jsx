import React, { useEffect, useState } from 'react';
import './Team.css';
import { ApiUrl } from '../../components/API/Api';
import axios from 'axios';

const Clergy = () => {
    const [team, setTeam] = useState([]);

    useEffect(() => {
        axios.get(`${ApiUrl}/get/teammembers`).then((response) => {
            setTeam(response.data.teams);
        }).catch(error => {
            console.error('Error fetching team members:', error);
        });
    }, []);

    return (
        <div className="container">
            <div className="row">
                <h1 className="title text-center">Parish Clergy</h1>
                {team?.map((member, index) => (
                    <div className="col-lg-3 mt-3">
                        <div className="team">
                            <div className="team-member" key={index}>
                                <div className="team-img">
                                    <img src={member.media_url} alt={member.title} />
                                </div>
                                <div className="team-content">
                                    <h2>{member.title}</h2>
                                    <br />
                                    <h3>{member.role}</h3>
                                    <p dangerouslySetInnerHTML={{ __html: member.content }} />
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>

        </div>
    );
};

export default Clergy;
