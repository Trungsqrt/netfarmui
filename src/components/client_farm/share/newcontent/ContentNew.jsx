import React, { useEffect, useState } from 'react';
import './content.css';
import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';

const ContentNew = () => {
    const [searchContent, setSearchContent] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 180;
  const [data, setData] = useState([]);
  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };
  useEffect(() => {
    appendData();
  }, []);
  
  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };
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
                    <List size='small' style={{zIndex:1000,background:'#FFFFF',justifyContent:'center',display:'flex',paddingTop:'10px',borderRadius:'90px'}}>
                        <VirtualList
                        style={{zIndex: 1000,background:'#FFFFF',width:400}}
                            data={data}
                            height={ContainerHeight}   
                            itemHeight={47}
                            itemKey="email"
                            onScroll={onScroll}
                        >
                            {(item) => (
                                <List.Item key={item.email} style={{zIndex:1000,background:'white',width:400}}>
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.picture.large} />}
                                        title={<a href="https://ant.design">{item.name.last}</a>}
                                        description={item.email}
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
