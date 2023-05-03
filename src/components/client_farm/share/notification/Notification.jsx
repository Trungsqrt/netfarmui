import { notification } from 'antd';

const pushNotification = ({ type, message }) => {
    notification.open({
        type,
        message,
    });
};
export default pushNotification;
