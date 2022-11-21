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
<<<<<<< HEAD
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
=======
    const [column, setColumn] = useState();
    const [dataSchedule, setDataSchedule] = useState([]);
    const [rows, setRows] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    const [dataCatSchedule, setDataCatSchedule] = useState([]);
    const [dataCh, setDataCh] = useState([]);
    const url2 = 'https://localhost:44303/api/Schedule';
    const url = 'https://localhost:44303/api/ScheduleTask';

    const columns = [
        { type: 'string', id: 'Task' },
        { type: 'datetime', id: 'Start' },
        { type: 'datetime', id: 'End' },
    ];

    useEffect(() => {
        setUser(currentUser.roleName);
        axios.get(url2).then((response) => {
            const data = response.data;
            data.forEach((item) => {
                setScheduledIdCombo((prevStateId) => [...prevStateId, item.id]);
                setScheduledName((prevStateName) => [...prevStateName, item.name]);
            });
        });

        axios.get(url).then((res) => {
            const response = res.data;
            setDataSchedule([...response]);
        });
    }, []);

    useEffect(() => {
        (() => {
            if (category === 1) {
                setDataCatSchedule([]);
                dataSchedule.forEach((item) => {
                    if (item.scheduleId === 1) {
                        setDataCatSchedule((prev) => [...prev, item]);
                    }
                });
            } else if (category === 2) {
                setDataCatSchedule([]);
                dataSchedule.forEach((item) => {
                    if (item.scheduleId === 2) {
                        setDataCatSchedule((prev) => [...prev, item]);
                    }
                });
            }
        })();
    }, [dataSchedule]);

    useEffect(() => {
        (() => {
            dataCatSchedule.forEach((item) => {
                const dayStartRaw = item.dateStart.slice(0, 10);
                const dayStartSplited = dayStartRaw.split('-');
                const yearStart = Number(dayStartSplited[0]);
                const monthStart = Number(dayStartSplited[1]);
                const dayStart = Number(dayStartSplited[2]);

                const dayEndRaw = item.dateEnd.slice(0, 10);
                const dayEndSplited = dayEndRaw.split('-');
                const yearEnd = Number(dayEndSplited[0]);
                const monthEnd = Number(dayEndSplited[1]);
                const dayEnd = Number(dayEndSplited[2]);

                setRows((prev) => [
                    ...prev,
                    [item.name, new Date(yearStart, monthStart, dayStart), new Date(yearEnd, monthEnd, dayEnd)],
                ]);
            });
        })();

        setDataCh([...[columns, ...rows]]);
    }, [category, dataSchedule]);

    const options = {
        showRowLabels: true,
    };

    return (
        <div className={styles.body}>
            <section>
                {(user === 'Admin' || user === 'Expert') && <StaffHeader />}
                {!(user === 'Admin' || user === 'Expert') && <FarmerHeader />}
            </section>
            <section className={styles.container}>
                <section style={{ width: '100%' }}>
                    <section style={{ marginBottom: '12px' }}>
                        <p>Loại cây trồng</p>
                        <select
                            name="category"
                            id="category"
                            className={styles.cateBox}
                            onChange={(e) => setCategory(Number(e.target.value))}
                            value={category}
                        >
                            {scheduleIdcombo.map((item, index) => (
                                <option value={item} key={index}>
                                    {scheduleName[index]}
                                </option>
                            ))}
                        </select>
                    </section>
                    {category === 1 && (
                        <Chart
                            key="1"
                            chartType="Timeline"
                            data={dataCh}
                            width="100%"
                            options={options}
                            height="100vh"
                            className={styles.chartDraw}
                            chartLanguage="VI"
                        />
                    )}

                    {category === 2 && (
                        <Chart
                            key="2"
                            chartType="Timeline"
                            data={dataCh}
                            width="100%"
                            options={options}
                            height="100vh"
                            className={styles.chartDraw}
                            chartLanguage="VI"
                        />
                    )}
                </section>
            </section>
>>>>>>> 2c3954e (a bunch of things)
        </div>
    );
};

export default Schedule;
