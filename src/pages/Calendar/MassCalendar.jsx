import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import styled from 'styled-components';
import Modal from 'react-bootstrap/Modal';

const StyledCalendarContainer = styled.div`
  max-width: 1500px;
  margin: auto;
  padding: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #f5f5f5;
`;

const StyledCalendarHeader = styled.h2`
  color: #333;
  text-align: center;
  margin-right: 5rem;
`;

const StyledCalendar = styled(Calendar)`
  font-size: 14px;

  .rbc-month-view {
    background-color: #ffffff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .rbc-header {
    background-color: #4285f4;
    color: #ffffff;
    font-weight: bold;
    padding: 10px;
    border-bottom: 2px solid #ffffff;
  }

  .rbc-day-bg {
    background-color: #f8f9fa;
  }

  .rbc-today {
    background-color: #4285f4;
    color: #ffffff;
  }

  .rbc-agenda-view {
    border-top: 2px solid #4285f4;
  }

  .rbc-agenda-date-cell,
  .rbc-agenda-time-cell {
    font-size: 16px;
    color: #333;
  }

  .rbc-agenda-event-cell {
    padding: 15px;
    margin: 10px 0;
    border-radius: 8px;
    background-color: #4285f4;
    color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s;

    a {
      color: #ffffff;
      text-decoration: none;
    }

    &:hover {
      background-color: #3367d6;
    }
  }
`;

const EventModal = ({ show, onHide, event }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{event.title_english}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    <b>Start Date :</b> {moment(event.start).format('MMMM Do YYYY')}
                </p>
                <p>
                    <b>Description :</b>{' '}
                    <p dangerouslySetInnerHTML={{ __html: event.title_tamil }}></p>
                </p>
            </Modal.Body>
        </Modal>
    );
};

const MassCalendar = () => {
    const localizer = momentLocalizer(moment);
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://cristolive.org/api/liturgy/17533');
                const data = await response.json();
                const formattedEvents = data?.map((item) => {
                    return item.mass.map((massItem) => {
                        return massItem.mass_detail.map((detail) => ({
                            start: new Date(item.liturgy_on + ' ' + detail.mass_time),
                            end: new Date(item.liturgy_on + ' ' + detail.mass_time),
                            title: `${massItem.language} Mass`,
                            description: detail.description,
                            mass_id: detail.mass_id,
                            title_english: 'Mass Title', // You need to replace this with the actual English title
                            title_tamil: 'Mass Title in Tamil', // You need to replace this with the actual Tamil title
                        }));
                    });
                }).flat();
                setEvents(formattedEvents);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    const closeModal = () => {
        setSelectedEvent(null);
    };

    return (
        <>
            <br />
            <StyledCalendarContainer>
                <StyledCalendarHeader>LITURGY CALENDAR</StyledCalendarHeader>
                <StyledCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 1000 }}
                    onSelectEvent={handleEventClick}
                    eventLimit={1}
                />
            </StyledCalendarContainer>
            <br />
            {selectedEvent && (
                <EventModal show={!!selectedEvent} onHide={closeModal} event={selectedEvent} />
            )}
        </>
    );
};

export default MassCalendar;