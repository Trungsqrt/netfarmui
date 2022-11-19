import React from 'react';
import { Chart } from 'recharts';
import { default as StaffHeader } from '../../../admin_farm/share/header/Header';
import { default as FarmerHeader } from '../../../client_farm/share/header/Header';
import styles from './Schedule.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Calendar from './Calendar';
const Schedule = () => {
    const [user, setUser] = useState('');
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
    return (
        <div className={styles.body}>
            <section>
                {(user === 'Admin' || user === 'Expert') && <StaffHeader />}
                {!(user === 'Admin' || user === 'Expert') && <FarmerHeader />}
            </section>
            {schedule && <Calendar schedule={schedule} key={schedule.id} update={schedule.id}></Calendar>}
        </div>
    );
};

export default Schedule;
