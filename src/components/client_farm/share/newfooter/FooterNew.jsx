import { Col, Layout, Row } from 'antd';
import React from 'react';
import './footerNew.css';

const FooterNew = () => {
    return (
        <Layout style={{ height: '300px', backgroundColor: 'black', color: 'white', padding: '20px' }}>
            <Row style={{ justifyContent: 'center', display: 'flex' }}>
                <Col span={7} offset={2}>
                    <h4>ABOUT</h4>
                    <h4
                        style={{
                            fontWeight: 'normal',
                            fontSize: 16,
                            display: 'block',
                            margin: '0',
                            padding: '10px 10px',
                            lineHeight: 1.5,
                        }}
                    >
                        Scanfcode.com CODE WANTS TO BE SIMPLE is an initiative to help the upcoming programmers with the
                        code. Scanfcode focuses on providing the most efficient code or snippets as the code wants to be
                        simple. We will help programmers build up concepts in different programming languages that
                        include C, C++, Java, HTML, CSS, Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.
                    </h4>
                </Col>
                <Col span={4} offset={2}>
                    <h4>CATEGORIES</h4>
                    <ul style={{ display: 'block', textAlign: 'start', margin: '0', padding: '0' }}>
                        <li>Python</li>
                        <li>UI Design</li>
                        <li>SQL server</li>
                        <li>.Net</li>
                    </ul>
                </Col>
                <Col span={7} offset={2}>
                    <h4>QUICK LINKS</h4>
                    <ul style={{ display: 'block', textAlign: 'start', padding: '0' }}>
                        <li>About Us</li>
                        <li>Contact Us</li>
                        <li>Contribute</li>
                        <li>Privacy Policy</li>
                        <li>Sitemap</li>
                    </ul>
                </Col>
            </Row>
        </Layout>
    );
};

export default FooterNew;
