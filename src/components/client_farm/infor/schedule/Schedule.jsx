import React from 'react';
import { Chart } from 'react-google-charts';
import { default as StaffHeader } from '../../../admin_farm/share/header/Header';
import { default as FarmerHeader } from '../../../client_farm/share/header/Header';
import styles from './Schedule.module.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Schedule = () => {
    const [user, setUser] = useState('');
    const getUser = localStorage.getItem('user');
    const currentUser = JSON.parse(getUser);
    const [rows, setRows] = useState([]);
    const [dataSchedule, setDataSchedule] = useState([]);
    const url = 'https://localhost:44303/api/ScheduleTask';

    const columns = [
        { type: 'string', id: 'Task' },
        { type: 'datetime', id: 'Start' },
        { type: 'datetime', id: 'End' },
    ];

    useEffect(() => {
        setUser(currentUser.roleName);
        const getData = async () => {
            const res = await axios.get(url);
            const response = res.data;
            setDataSchedule([...response]);
        };
        getData();
    }, []);

    useEffect(() => {
        console.log(dataSchedule);
    }, [dataSchedule]);

    useEffect(() => {
        const loadData = () => {
            dataSchedule?.forEach((item) => {
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
        };

        if (dataSchedule) loadData();
    }, [dataSchedule]);

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
                    {dataSchedule && (
                        <Chart
                            chartType="Timeline"
                            data={[columns, ...rows]}
                            width="100%"
                            options={options}
                            height="100vh"
                            className={styles.chartDraw}
                            chartLanguage="VI"
                        />
                    )}
                </section>
            </section>
        </div>
    );
};

export default Schedule;
