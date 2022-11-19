import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Chart } from 'react-google-charts';
import styles from './Schedule.module.css';

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
                list.push([String(tasks[i].name), new Date(2022, 11, 19), new Date(2022, 12, 19)]);
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
        <div className={styles.body} key={index}>
            <div className="Description">{schedule.description}</div>
            <section className={styles.container}>
                <section style={{ width: '100%' }}>
                    <Chart
                        width={'100%'}
                        height={'400px'}
                        chartType="Gantt"
                        loader={<div>Loading Chart</div>}
                        data={[
                            [
                                { type: 'string', label: 'Task ID' },
                                { type: 'string', label: 'Task Name' },
                                { type: 'string', label: 'Resource' },
                                { type: 'date', label: 'Start Date' },
                                { type: 'date', label: 'End Date' },
                            ],
                            ['2014Spring', 'Project 1', 'Planning', new Date(2014, 2, 22), new Date(2014, 3, 20)],
                            ['2014Summer', 'Project 1', 'Fieldwork', new Date(2014, 3, 21), new Date(2014, 4, 10)],
                            ['2014Autumn', 'Project 1', 'Reporting', new Date(2014, 4, 11), new Date(2014, 4, 25)],
                            ['2014Winter', 'Project 1', 'Wrap up', new Date(2014, 4, 26), new Date(2014, 5, 21)],
                        ]}
                        options={{
                            height: 400,
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
