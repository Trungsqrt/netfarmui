import React, { useEffect, useState, useMemo } from 'react';
import Pagination from '../share/Pagination/Pagination';
let PageSize = 10;

function ReviewTable(props) {
    const reviews = props.reviews;
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState('all');
    useEffect(() => {
        const fetchData = async () => {
            if (reviews) {
                const firstPageIndex = (currentPage - 1) * PageSize;
                const lastPageIndex = firstPageIndex + PageSize;
                setCurrentData(reviews.slice(firstPageIndex, lastPageIndex));
                setData(reviews);
            }
        };
        fetchData();
    }, [currentPage, reviews]);

    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setCurrentData(data.slice(firstPageIndex, lastPageIndex));
        return data.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, data]);

    const selectFilter = (e) => {
        setFilter(e.target.value);
        var list = [];
        if (e.target.value === 'pos') {
            list = reviews.filter((fb) => fb['sentiment'] === 'Positive');
        } else if (e.target.value === 'nev') {
            list = reviews.filter((fb) => fb['sentiment'] === 'Negative');
        } else if (e.target.value === 'neu') {
            list = reviews.filter((fb) => fb['sentiment'] === 'Neutral');
        } else {
            list = reviews;
        }
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        setCurrentData(list.slice(firstPageIndex, lastPageIndex));
        setData(list);
    };
    return (
        <div>
            <div className="reviewtable_selection">
                <select name="" id="" value={filter} onChange={selectFilter}>
                    <option value="all">Tất cả</option>
                    <option value="pos">Tích cực</option>
                    <option value="nev">Tiêu cực</option>
                    <option value="neu">Trung tích</option>
                </select>
            </div>
            <table className="table_fb">
                <thead>
                    <tr>
                        <th>Tên người dùng</th>
                        <th>Nội dung</th>
                        <th>Số sao</th>
                        {/* <th>ID sản phẩm</th> */}
                        <th>Sắc thái</th>
                    </tr>
                </thead>
                <tbody>
                    {currentData.map((review, index) => (
                        <tr key={index}>
                            <td>{review.userName}</td>
                            <td>{review.contents}</td>
                            <td>
                                {review.star}
                                <i className="fas fa-star star_icon"></i>
                            </td>
                            {/* <td>{review.productId}</td> */}
                            <td>
                                {review.sentiment === 'Positive'
                                    ? 'Tích cực'
                                    : review.sentiment === 'Negative'
                                    ? 'Tiêu cực'
                                    : 'Trung tính'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination_line">
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={data.length}
                    pageSize={PageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
}

export default ReviewTable;
