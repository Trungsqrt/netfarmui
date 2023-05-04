import { RightOutlined } from '@ant-design/icons';
import { Badge, Button, Col, Divider, Form, Image, Input, Radio, Row, Select, Space } from 'antd';
import Grid from 'antd/es/card/Grid';
import { Content } from 'antd/es/layout/layout';
import { Option } from 'antd/es/mentions';
import React from 'react';
import './test.css';

const Test = () => {
    return (
        <>
            <Grid style={{ height: '570px', padding: '40px' }} className="space-align-container">
                <Row>
                    <Col span={7} offset={5}>
                        <Grid>
                            <Space size={20}>
                                <h3>
                                    {' '}
                                    Giỏ hàng <RightOutlined /> Thông tin giao hàng <RightOutlined /> Phương thức thanh
                                    toán
                                </h3>
                            </Space>
                            <Space>
                                <h2 style={{ paddingTop: '20px' }}>Thông tin giao hàng</h2>
                            </Space>
                            <Grid className="form">
                                <Form style={{ maxWidth: 600 }} layout="vertical">
                                    <Form.Item>
                                        <Input placeholder="Họ và tên người nhận" />
                                    </Form.Item>
                                    <Row span={24}>
                                        <Col span={12}>
                                            <Form.Item>
                                                <Input placeholder="Email" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={11} offset={1}>
                                            <Form.Item>
                                                <Input placeholder="Số điện thoại" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item>
                                        <Input placeholder="Địa chỉ" />
                                    </Form.Item>
                                    <Form.Item name="radio-group" label="Hình thức thanh toán">
                                        <Radio.Group>
                                            <Radio value="a">item 1</Radio>
                                            <Radio value="b">item 2</Radio>
                                        </Radio.Group>
                                    </Form.Item>

                                    <Space>
                                        <Form.Item
                                            name="select"
                                            label="Tỉnh/ thành"
                                            // hasFeedback
                                            rules={[{ required: true, message: 'Please select your country!' }]}
                                        >
                                            <Select placeholder="tỉnh thành">
                                                <Option value="china">China</Option>
                                                <Option value="usa">U.S.A</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            name="select"
                                            label="Quận/ huyện"
                                            hasFeedback
                                            rules={[{ required: true, message: 'Please select your country!' }]}
                                        >
                                            <Select placeholder="chọn quận huyện">
                                                <Option value="china">China</Option>
                                                <Option value="usa">U.S.A</Option>
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            name="select"
                                            label="Phường/ xã"
                                            hasFeedback
                                            rules={[{ required: true, message: 'Please select your country!' }]}
                                        >
                                            <Select placeholder="chọn phường xã">
                                                <Option value="china">China</Option>
                                                <Option value="usa">U.S.A</Option>
                                            </Select>
                                        </Form.Item>
                                    </Space>
                                    <Form.Item>
                                        <Space>
                                            <Button danger> Quay lại giỏ hàng</Button>
                                            <Button type="primary">Thanh Toán</Button>
                                        </Space>
                                    </Form.Item>
                                </Form>
                            </Grid>
                        </Grid>
                    </Col>
                    <Col span={5} offset={3} style={{ background: '#FAFAFA', padding: '10px 20px' }}>
                        <Row align="middle" span={16} style={{marginBottom:'10px'}}>
                            <Col span={4}>
                                <Badge count={5}>
                                <Image
                                    width={60}
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />
                                </Badge>
                            </Col>
                            <Col span={8} offset={3}>
                                <Content>Giày Thể Thao Cao Cấp Nam Biti's Hunter </Content>
                            </Col>
                            <Col span={4} offset={3}>
                                500.000 VND
                            </Col>
                        </Row>
                        <Row align="middle" span={16} style={{marginBottom:'10px'}}>
                            <Col span={4}>
                                <Badge count={5}>
                                <Image
                                    width={60}
                                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                />
                                </Badge>
                            </Col>
                            <Col span={8} offset={3}>
                                <Content>Giày Thể Thao Cao Cấp Nam Biti's Hunter </Content>
                            </Col>
                            <Col span={4} offset={3}>
                                500.000 VND
                            </Col>
                        </Row>
                        <hr />
                        <Row span={24}>
                            <Form layout="inline">
                                <Col span={16}>
                                    <Form.Item>
                                        <Input placeholder="Mã giảm giá"></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item>
                                        <Button type="primary">Áp dụng</Button>
                                    </Form.Item>
                                </Col>
                            </Form>
                        </Row>
                        <Divider />
                        <Row align="middle" span={24} layout="inline">
                            <Col span={12} style={{ padding: '10px 0px' }}>
                                Tạm tính
                            </Col>
                            <Col span={12}>900.000 VND</Col>
                        </Row>
                        <Row align="middle" span={24}>
                            <Col span={12}>Phí vận chuyển</Col>
                            <Col span={12}>-</Col>
                        </Row>
                        <Divider />
                        <Row align="middle" span={24}>
                            <Col span={12}>
                                <h3>Tổng cộng</h3>
                            </Col>
                            <Col span={12}>900.000 VND</Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        </>
    );
};

export default Test;
