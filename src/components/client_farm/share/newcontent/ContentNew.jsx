import React, { useState } from "react";
import "./content.css";

const ContentNew = () => {
    const [searchContent, setSearchContent] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
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
                </div>
            </div>
        </>
    );
};

export default ContentNew;
