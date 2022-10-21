import React from 'react';
import Header from '../share/header/Header';
import Footer from '../share/footer/Footer';
import Newspapers from '../article/newspaper/Newspapers';
import Menuleft from '../share/menu/Menuleft'
import "./InforPage.css"
const InforPage = () => {
    return (
        <div>
            <div>
                <Header></Header>
                <div className='infor_main'>
                    <div className='menu'><Menuleft></Menuleft></div>
                    <div className="container">
                    <div className="row">
                        <div className="col-2">
                            kiến thức nông nghiệp
                        </div>
                        <div className="col-2">
                            HUONG DAN OW DAY
                        </div>
                    </div>
                    <div className='row'>
                        lich nong vu ở đây
                    </div>
                    <div className='row'> 
                    <Newspapers></Newspapers>
                    </div>

                </div>
                </div>
                
                <Footer></Footer>
            </div>
        </div>
    );
};

export default InforPage;
