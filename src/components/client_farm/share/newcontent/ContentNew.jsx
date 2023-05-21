import { Avatar, List, message } from 'antd';
import axios from 'axios';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './content.css';

const ContentNew = () => {
    const [searchContent, setSearchContent] = useState('');
    const [articles, setArticles] = useState([]);
    const navigate = useNavigate();
    const [currentArticles, setCurrentArticles] = useState([]);
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const fakeDataUrl = 'https://localhost:44303/api/Article';
    const ContainerHeight = 180;
    const [data, setData] = useState([]);
    const appendData = async () => {
        if (searchContent != '') {
            const res = await axios.get(fakeDataUrl);
            const response = res.data;
            const resultArray = response.filter((item) =>
                item.title.toLowerCase().includes(searchContent.toLowerCase()),
            );
            setData([...resultArray]);
            message.success(`${resultArray.length} more items loaded!`);
        } else if (searchContent == '') {
            setData([]);
            return;
        }
    };

    const onScroll = (e) => {
        // if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
        //     appendData();
        // }
        
    };
    useEffect(() => {
        appendData();
    }, [searchContent]);
    return (
        <>
            <div className="container">
                <div className="search__container">
                    <p className="search__title">NETFARM - Sản xuất vụ mùa đảm bảo trong khung thời vụ tốt nhất</p>
                    <br></br>
                    <form className="form-search" onSubmit={handleSubmit}>
                        <input
                            className="search__input"
                            type="text"
                            placeholder="Tìm kiếm"
                            onChange={(e) => setSearchContent(e.target.value)}
                            value={searchContent}
                        />
                    </form>
                    <List
                        size="small"
                        style={{
                            zIndex: 1000,
                            background: '#FFFFF',
                            justifyContent: 'center',
                            display: 'flex',
                            paddingTop: '10px',
                            borderRadius: '90px',
                        }}
                    >
                        <VirtualList
                            style={{ zIndex: 1000, background: '#FFFFF', width: 400 }}
                            data={data}
                            height={ContainerHeight}
                            itemHeight={47}
                            itemKey="email"
                            onScroll={onScroll}
                        >
                            {(item) => (
                                <List.Item key={item.title} style={{ zIndex: 1000, background: 'white', width: 400 }}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.imageURL} />}
                                        title={
                                            <p
                                                onClick={() => {
                                                    navigate(`/detail/${item.id}`);
                                                }}
                                            >
                                                {item.title}
                                            </p>
                                        }
                                        // description={item.title}
                                    />
                                </List.Item>
                            )}
                        </VirtualList>
                    </List>
                </div>
            </div>
        </>
    );
};

export default ContentNew;
