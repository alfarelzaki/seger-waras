import React, { useCallback } from "react";
import '../App.css'
import { app, db } from "../firebase";
import { Button, Layout, Card, Col, Row, Modal, Form, Input } from 'antd';
import { List, Avatar, Space } from 'antd';
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined, BookOutlined, FileAddOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

const validateMessages = {
    required: '${label} is required!',
};

let articles;

class ReadPost extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          articleData: [],
          modalVisible: [],
          loading: false
        }
    }

    setModalVisible(visibility, index) {
        let arrayVisibility = [...this.state.modalVisible]
        arrayVisibility[index] = visibility
        this.setState({modalVisible: arrayVisibility})
    }

    updateArticle = (values) => {
        const user = app.auth().currentUser;
        
        db.collection('articles').doc(values.id).update({
            title: values.title,
            imageUrl: values.imageUrl,
            content: values.content,
        });  
        
        console.log(values)

        let updatedData = this.state.articleData
        updatedData.map(data => {
            if (data.id == values.id) {
                data.title = values.title
                data.imageUrl = values.imageUrl
                data.content = values.content
            }
        })

        this.setState({
            articleData: updatedData
        })
    };
    
    async componentDidMount() {
        try {
            await db
            .collection('articles')
            .get()
            .then(collection => {
                articles = collection.docs.map(doc => doc.data())
                const ids = collection.docs.map(doc => doc.id)

                articles = articles.filter(article => {
                    return article.uid == app.auth().currentUser.uid
                })

                const modal = new Array(articles.length).fill(false)

                articles.map((article, index) => {
                    article.id = ids[index]
                    article.index = index
                })

                this.setState({ 
                    articleData: articles,
                    modalVisible: modal
                })

                console.log(this.state.articleData)
            })
        } catch (error) {
            alert(error);
        }
    }

    handleOk = () => {
        const visibility = new Array(articles.length).fill(false)

        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false, modalVisible: visibility });
        }, 1000);
    };
    
    handleCancel = (index) => {
        const visibility = new Array(articles.length).fill(false)
        this.setState({ modalVisible: visibility });
    };

    render() {
        const deleteArticle = e => {
            const id = e.target.parentElement.parentElement.dataset.id;
            const index = e.target.parentElement.parentElement.dataset.index;
            db.collection('articles').doc(id).delete();
            console.log(e.target.parentElement.parentElement.dataset.id);

            let arrayData = [...this.state.articleData];
            let arrayVisibility = [...this.state.modalVisible];
            arrayData.splice(index, 1)
            arrayVisibility.splice(index, 1)

            this.setState({
                articleData: arrayData,
                modalVisible: arrayVisibility
            })
        }

        const {loading} = this.state

        return (
            <Layout className="layout">
                <Header>
                 <div className="logo">
                    <Button style={{height:'40px', width:'90px', textAlign:'center', fontWeight:'bold', color:'#227575'}} onClick={() => app.auth().signOut()}>Sign out</Button>
                </div>
                    <h1 className="judul"><Link to='/' style={{ color: '#227575' }}>Seger Waras</Link></h1>
                </Header>
                <Content className="content">
                
                <Row>
                    <Col span={21}>
                        <h1 style={{ textAlign: 'left', color: 'black', fontWeight:'bold' }}>Your articles</h1>
                    </Col>
                    <Col span={3}>
                    <Link to='/createPost'>
                        <Button className="float-left" type="primary" icon={<FileAddOutlined />}>
                            Add article
                        </Button>
                    </Link>
                    </Col>
                </Row>
                <hr/>

                <section className="codeBoxDemo">
                    <List
                        itemLayout="vertical"
                        size="large"
                        dataSource={this.state.articleData}
                        renderItem={item => (
                        <List.Item
                            key={item.title}
                            actions={[
                                <div onClick={() => this.setModalVisible(true, item.index)}><EditOutlined /></div>,
                                <div data-id={item.id} data-index={item.index} onClick={deleteArticle}><DeleteOutlined/></div>                                
                            ]}
                            extra={
                            <img 
                                width={272}
                                alt="logo"
                                src={item.imageUrl}
                            />
                            }
                        >
                            <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                            description={item.description}
                            />
                            {item.content}

                            <Modal
                                data-id={item.id}
                                centered
                                visible={this.state.modalVisible[item.index]}
                                onOk={() => this.setModalVisible(false, item.index), this.updateArticle}
                                onCancel={() => this.setModalVisible(false, item.index)}
                                footer={[
                                    <Button key="back" onClick={this.handleCancel}>
                                      Return
                                    </Button>,
                                    <Button key="submit" form="update-data" type="primary" htmlType="submit" loading={loading} onClick={this.handleOk}>
                                      Submit
                                    </Button>,
                                  ]}
                            >
                                <Form
                                    onFinish={this.updateArticle}
                                    method="get"
                                    id="update-data"
                                    initialValues = {{
                                        id: item.id,
                                        title: item.title,
                                        imageUrl: item.imageUrl,
                                        content: item.content,
                                    }}
                                >
                                    <Form.Item name="id" type="hidden">
                                        <Input type="hidden"/>
                                    </Form.Item>
                                    <Form.Item name="title" label="Title">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="imageUrl" label="Image URL">
                                        <Input />
                                    </Form.Item>
                                    <Form.Item name="content" label="Content">
                                        <Input.TextArea />
                                    </Form.Item>                         
                                </Form>
                                
                            </Modal>
                        </List.Item>
                        )}
                    />
                </section>
                </Content>
                <Footer className="footer">
                <div className="footer-about">
                    <h1 className="judul-footer">Seger Waras</h1>
                    <h1 className="font-cabin">Created by</h1>
                    <h1 className="font-cabin">Alfarelzaki ~ farizalbab ~ Rizal Miftah</h1>
                    <h3 className="font-cabin">© 2020 SEGER WARAS - ALL RIGHTS RESERVED.</h3>
                </div>
                </Footer>
            </Layout>

        )
    }
}

export default ReadPost