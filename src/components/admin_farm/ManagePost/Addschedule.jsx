import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import Header from '../../admin_farm/share/header/Header';
import { Link, Navigate, useParams, useNavigate } from 'react-router-dom';
import './Calendar.css';
import { Chart } from 'react-google-charts';

function AddSchedule() {
    const { id } = useParams();
    const idSchedule = id;
    const TaskUrl = 'https://localhost:44303/api/ScheduleTask';
    const scheduleUrl = 'https://localhost:44303/api/Schedule';
    const navigate = useNavigate();
    // const isremoved
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const [user, setUser] = useState(currentUser.roleName);
    const [schedule, setSchedule] = useState({});
    const [scheduleTask, setScheduleTask] = useState([]);
    const [scheduleName, setScheduleName] = useState('');
    const [description, setDescription] = useState('');
    const [taskName, setTaskName] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [data, setData] = useState([
        [
            { type: 'string', label: 'Tên nhiệm vụ' },
            { type: 'date', label: 'Ngày bắt đầu' },
            { type: 'date', label: 'Ngày kết thúc' },
        ],
    ]);

    const [flag, setFlag] = useState(false);
    const [initTasks, setInitTasks] = useState([]);
    const [lengthh, setLengthh] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [tasksAdd, setTasksAdd] = useState([]);
    useEffect(() => {
        const getSchedule = async () => {
            const resSchedules = await axios.get(scheduleUrl + `/${idSchedule}`);
            const responseSchedules = resSchedules.data;

            const resTasks = await axios.get(TaskUrl);
            const responseTasks = resTasks.data;
            const TasksFiltered = responseTasks.filter((task) => {
                return task.scheduleId == idSchedule;
            });

            const TasksConverted = TasksFiltered.map((item) => {
                return {
                    dateEnd: item.dateEnd.slice(0, 10),
                    dateStart: item.dateStart.slice(0, 10),
                    description: item.description,
                    id: item.id,
                    name: item.name,
                    scheduleId: item.scheduleId,
                };
            });

            setScheduleTask(TasksConverted);
            setInitTasks(TasksConverted);
            setScheduleName(responseSchedules.name);
            setDescription(responseSchedules.description);
            setFlag(true);

            TasksFiltered.forEach((item) => {
                var list = data;
                list.push([String(item.name.trim()), new Date(item.dateStart), new Date(item.dateEnd)]);
                setData(list);
            });
        };

        if (idSchedule) {
            getSchedule();
        }
    }, []);

    useEffect(() => {
        setLengthh(scheduleTask.length);
    }, [flag]);

    useEffect(() => {
        console.log(lengthh);
    }, [lengthh]);

    var uuid = require('uuid');
    const scheduleId = uuid.v4();
    // console.log(scheduleId);
    function AddTask() {
        if (scheduleName === '') alert('Bạn phải nhập tên lịch thời vụ');
        else {
            if (taskName === '' || start === '' || end === '') alert('Bạn phải nhập đầy đủ thông tin nhiệm vụ');
            else if (new Date(start) - new Date(end) > 0) alert('Ngày kết thúc phải sau ngày bắt đầu');
            else {
                const newTask = {
                    name: taskName,
                    dateStart: start,
                    dateEnd: end,
                    scheduleId: scheduleId,
                    description: '',
                };
                var list = data;
                // console.log(list);
                list.push([String(taskName), new Date(start), new Date(end)]);
                setScheduleTask((preData) => [...preData, newTask]);
                setData(list);

                //setTaskAdd for edit
                setTasksAdd((prev) => [...prev, newTask]);
            }
        }
        setTaskName('');
        setStart('');
        setEnd('');
    }
    function removeItem(index, name) {
        const id = document.getElementById(`${name}_${index}`);
        var isComfirm = window.confirm('Chọn OK để xóa nhiệm vụ này');
        if (isComfirm) {
            data.splice(index + 1, 1);
            const value = scheduleTask.splice(index, 1);
            setData(data);
            setScheduleTask(scheduleTask);

            //setTasks for delete handle
            setTasks((prev) => [...prev, value[0].id]);

            for (let i = 0; i < tasksAdd.length; i++) {
                if (tasksAdd[i].name === value[0].name) {
                    const indexx = tasksAdd.indexOf(tasksAdd[i]);
                    tasksAdd.splice(indexx, 1);
                }
            }

            setTasksAdd(tasksAdd);
        }
        setTaskName(name);
        // setTaskName();
    }

    function saveHandler() {
        if (idSchedule) {
            console.log('edit');
            if (scheduleName === '' || scheduleTask.length === 0) return;
            else {
                const sched = {
                    id: idSchedule,
                    name: scheduleName,
                    description: description,
                };
                // console.log('shed ', sched);

                if (lengthh !== 0) {
                    for (let i = 0; i < tasks.length; i++) {
                        console.log(TaskUrl + `/${tasks[i]}`);
                        axios.delete(TaskUrl + `/${tasks[i]}`);
                    }
                }
                try {
                    for (var i = 0; i < tasksAdd.length; i++) {
                        tasksAdd[i].scheduleId = idSchedule;
                        tasksAdd[i].description = '';
                        axios.post(TaskUrl, tasksAdd[i]);
                    }

                    alert('Đăng lịch thành công');
                    window.location.reload();
                } catch (err) {
                    alert('có lỗi. Vui lòng thử lại');
                }
                // console.log(scheduleTask);
            }
        } else {
            console.log('add');

            if (scheduleName === '' || scheduleTask.length === 0) return;
            else {
                const sched = {
                    id: scheduleId,
                    name: scheduleName,
                    description: description,
                };

                try {
                    axios.post(scheduleUrl, sched);
                    for (let i = 0; i < scheduleTask.length; i++) {
                        const postt = async () => {
                            scheduleTask[i].scheduleId = scheduleId;
                            scheduleTask[i].description = '';
                            axios.post(TaskUrl, scheduleTask[i]);
                            console.log(scheduleTask[i]);
                        };
                        postt();
                    }
                    alert('Đăng lịch thành công');
                    window.location.reload();
                } catch (err) {
                    alert('có lỗi. Vui lòng thử lại');
                }
            }
        }
    }

    return (
        <div>
            {(user === 'Expert' || user === 'Admin') && (
                <>
                    <Header />
                    <div className="Calendarcontainer">
                        <div className="Schedule">
                            <div className="Schedule_label">Tạo lịch thời vụ</div>
                            <div className="textContainer">
                                <div className="schedule_row">
                                    <p className="Schedule_text">Tiêu đề</p>
                                    <input
                                        placeholder="Nhập tên thời vụ..."
                                        className="ScheduleName"
                                        onChange={(e) => {
                                            setScheduleName(e.target.value);
                                            setScheduleTask([]);
                                            setData([
                                                [
                                                    { type: 'string', label: 'Tên nhiệm vụ' },
                                                    { type: 'date', label: 'Ngày bắt đầu' },
                                                    { type: 'date', label: 'Ngày kết thúc' },
                                                ],
                                            ]);
                                            setTaskName('');
                                            setEnd('');
                                            setStart('');
                                        }}
                                        value={scheduleName}
                                        type="text"
                                        required
                                        min={3}
                                        readOnly={idSchedule ? true : false}
                                    ></input>
                                </div>
                                <div className="schedule_row">
                                    <p className="Schedule_text">Mô tả</p>
                                    <textarea
                                        placeholder="Mô tả..."
                                        className="textBox"
                                        required
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        rows={3}
                                        cols={20}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="TaskContainer">
                            {/* <div className="ScheduleTask_label">Thêm nhiệm vụ</div>
                            <div className="AddScheduleTask">
                                <div className="textContainer">
                                    <div className="schedule_row"></div>
                                    <div className="">
                                        <div className="schedule_row comboboxContainer" lang="vi">
                                            <div className="schedule_row">
                                                <p className="ScheduleTask_text">Tiêu đề</p>
                                                <input
                                                    placeholder="Nhập tên thời vụ..."
                                                    className="ScheduleTaskName"
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    value={title}
                                                    type="text"
                                                    required
                                                    min={3}
                                                ></input>
                                                <p className="ScheduleTask_text">Bắt đầu</p>
                                                <input
                                                    type="date"
                                                    id="start"
                                                    className="combobox"
                                                    onChange={(e) => setStart(e.target.value)}
                                                    value={start}
                                                    lang="vi"
                                                ></input>
                                            </div>

                                            <div className="schedule_row">
                                                <p className="ScheduleTask_text">Kết thúc</p>
                                                <input
                                                    type="date"
                                                    id="start"
                                                    className="combobox"
                                                    onChange={(e) => setEnd(e.target.value)}
                                                    value={end}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="schedule_row">
                                        <p className="Schedule_text">Mô tả</p>
                                        <textarea
                                            placeholder="Mô tả..."
                                            className="TasktextBox"
                                            required
                                            onChange={(e) => setCurrentContent(e.target.value)}
                                            value={currentContent}
                                            rows={3}
                                            cols={20}
                                        ></textarea>
                                    </div>
                                    <div className="btnRow">
                                        <button className="AddTask">+</button>
                                    </div>
                                </div>
                            </div> */}
                            <div className="Title">
                                <h2>Thêm nhiệm vụ</h2>
                            </div>
                            <ul className="taskList" id="taskList">
                                <li className="taskItem">
                                    <div className="taskheader taskname">Nhiệm vụ</div>
                                    <div className="taskheader taskItem_text taskstart">Bắt đầu</div>
                                    <div className="taskheader taskItem_text taskend">Kết thúc</div>
                                    <div className="taskheader taskremove1"></div>
                                </li>
                                <li className="taskItem">
                                    <div className="taskname">
                                        <input
                                            placeholder="Nhập tên thời vụ..."
                                            className="ScheduleTaskName add-text"
                                            onChange={(e) => setTaskName(e.target.value)}
                                            value={taskName}
                                            type="text"
                                            required
                                            min={3}
                                        ></input>
                                    </div>
                                    <div className="taskItem_text taskstart">
                                        {' '}
                                        <input
                                            type="date"
                                            id="start"
                                            className="combobox"
                                            onChange={(e) => setStart(e.target.value)}
                                            value={start}
                                            lang="vi"
                                        ></input>
                                    </div>
                                    <div className="taskItem_text taskend">
                                        <input
                                            type="date"
                                            id="start"
                                            className="combobox"
                                            onChange={(e) => setEnd(e.target.value)}
                                            value={end}
                                        ></input>
                                    </div>
                                    <button className="add-button" onClick={AddTask}>
                                        +
                                    </button>
                                </li>
                                {scheduleTask
                                    ? scheduleTask.map((item, index) => (
                                          <li className="taskItem" key={index} id={`${item.name}_${index}`}>
                                              <div className="taskname">{item.name}</div>
                                              <div className="taskItem_text taskstart">{item.dateStart}</div>
                                              <div className="taskItem_text taskend">{item.dateEnd}</div>
                                              <div
                                                  className="taskremove"
                                                  onClick={() => removeItem(index, item.name)}
                                                  id={`${item.name}_${index}`}
                                              ></div>
                                          </li>
                                      ))
                                    : ''}
                            </ul>
                        </div>
                        <div className="Review">
                            <div className="Chart">
                                {data.length > 1 && (
                                    <Chart
                                        width={'100%'}
                                        height="300px"
                                        chartType="Timeline"
                                        loader={<div>Loading Chart</div>}
                                        data={data}
                                        options={{
                                            height: 300,
                                            gantt: {
                                                trackHeight: 30,
                                            },
                                        }}
                                        rootProps={{ 'data-testid': '2' }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="btnrow">
                            <button className="saveBtn" onClick={saveHandler}>
                                Lưu
                            </button>
                        </div>
                    </div>
                </>
            )}
            {!(user === 'Expert' || user === 'Admin') && navigate('/')}
        </div>
    );
}

export default AddSchedule;