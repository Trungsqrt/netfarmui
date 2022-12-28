import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chart } from 'react-google-charts';
import styles from './Schedule.module.css';
import '../css/style1.css';
const Calendar = (props) => {
    const ScheduleTaskUrl = 'https://localhost:44303/api/ScheduleTask';
    const { schedule, index } = props;
    const [scheduleTask, setScheduleTask] = useState([]);
    const columns = [
        { type: 'string', id: 'Task' },
        { type: 'date', id: 'Start' },
        { type: 'date', id: 'End' },
        // { type: 'string', id: 'Description' },
    ];
    useEffect(() => {
        var list = [];
        list.push(columns);
        const fetchData = async () => {
            const response = await axios.get(ScheduleTaskUrl);
            const data = response.data;
            const tasks = data.filter((item) => item['scheduleId'] === schedule.id);
            for (var i = 0; i < tasks.length; i++) {
                list.push([String(tasks[i].name), new Date(tasks[i].dateStart), new Date(tasks[i].dateEnd)]);
            }
            setScheduleTask(list);
            console.log(list);
        };
        fetchData();
    }, []);

    const options = {
        showRowLabels: true,
    };

    // console.log('scheduleTask', scheduleTask);
    return (
        <div className="schedule_container" key={index}>
            <div className="Mota">Mô tả:</div>
            <div className='schedulename'>{schedule.name}</div>
            <br></br>
            <div className="Description"> {schedule.description}</div>
            <section className={styles.container}>
                <section style={{ width: '100%', height: '300px', overflow: 'hidden' }}>
                    <Chart
                        width={'100%'}
                        height="300px"
                        chartType="Timeline"
                        loader={<div>Loading Chart</div>}
                        data={scheduleTask}
                        options={{
                            height: 300,
                            gantt: {
                                trackHeight: 30,
                            },
                        }}
                        rootProps={{ 'data-testid': '2' }}
                    />
                </section>
            </section>
        </div>
    );
};

export default Calendar;
