import React, { useCallback } from "react";
import '../App.css'
import { app, db } from "../firebase";
import { Button, Layout, Card, Col, Row } from 'antd';
import { List, Avatar, Space } from 'antd';
import { Link } from 'react-router-dom'
import { EditOutlined, DeleteOutlined, BookOutlined, FileAddOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

class ReadPost extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          articleData: []
        }
    }
    
    async componentDidMount() {
        try {
            await db
            .collection('articles')
            .get()
            .then(collection => {
                const articles = collection.docs.map(doc => doc.data())
                const ids = collection.docs.map(doc => doc.id)

                articles.map((article, index) => {
                    article.id = ids[index] 
                })

                this.setState({ articleData: articles })
            })
        } catch (error) {
            alert(error);
        }
    }

    render() {
        const deleteArticle = e => {
            const id = e.target.parentElement.parentElement.dataset.id;
            db.collection('articles').doc(id).delete();
            console.log(e.target.parentElement.parentElement.dataset.id);

            if (id != null) this.componentDidMount()
        }

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
                    <Button className="float-left" type="primary" icon={<FileAddOutlined />}>
                            Add article
                        </Button>
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
                                <EditOutlined />,
                                <div data-id={item.id} onClick={deleteArticle}><DeleteOutlined/></div>                                
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