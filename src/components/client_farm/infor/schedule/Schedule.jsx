import React from 'react';
import styles from './Schedule.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from './Calendar';
import '../css/style1.css';
const Schedule = () => {
    const [user, setUser] = useState('');
    const [scheduleIdcombo, setScheduledIdCombo] = useState([]);
    const [scheduleName, setScheduledName] = useState([]);
    const [category, setCategory] = useState(1);
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    const [schedules, SetSchedules] = useState([]);
    const [schedule, setSchedule] = useState({});
    const scheduleUrl = 'https://localhost:44303/api/Schedule';
    useEffect(() => {
        const fetchData = async () => {
            setUser(currentUser.roleName);
            const response = await axios.get(scheduleUrl);
            const data = response.data;
            SetSchedules(data);
            setSchedule(data[0]);
        };
        fetchData();
    }, []);

    function handlerChange(e) {
        const fetchData = async () => {
            const response = await axios.get(`${scheduleUrl}/${e.target.value}`);
            const data = response.data;
            console.log(data);
            setSchedule(data);
        };
        fetchData();
    }
    return (
        <div className="body">
            <div className="schedule_header">Xem lịch nông vụ</div>
            <div className="Select_row">
                <span className="select_title">Chọn lịch:</span>
                <select onChange={handlerChange} className="select_section">
                    {schedules
                        ? schedules.map((sche, index) => (
                              <option value={sche.id} key={index}>
                                  {sche.name}
                              </option>
                          ))
                        : ''}
                </select>
            </div>
            {schedule && <Calendar schedule={schedule} key={schedule.id} update={schedule.id}></Calendar>}
        </div>
    );
};

export default Schedule;
