import React from "react";
import { app, db } from "../firebase";
import './Home.css';
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd';
import { Card } from 'antd';
import { Button, Tooltip } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';


const { Header, Content, Footer } = Layout;
const { Meta } = Card;
const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);



class Home extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      articleData: []
    }
  }

  componentDidMount() {
    db.collection('articles')
    .get()
    .then(collection => {
       const articles = collection.docs.map(doc => doc.data())
       this.setState({ articleData: articles })
   })
  }

  render(){
    return (
      <Layout className="layout">
      <Header>
        <div className="logo">
          <Link to='/readPost'><Button style={{height:'40px', width:'110px', textAlign:'center', fontWeight:'bold', color:'#227575', marginRight:20}}>My Articles</Button></Link>  
          <Button style={{height:'40px', width:'90px', textAlign:'center', fontWeight:'bold', color:'#227575'}} onClick={() => app.auth().signOut()}>Sign out</Button>
        </div>
          <h1 className="judul"><Link to='/' style={{ color: '#227575' }}>Seger Waras</Link></h1>
      </Header>
      <Content className=  "content">
      <div className="App"></div>
      <div className="text-highlight">
        <h1 style={{fontSize:'30pt', marginTop:'0', color:'white'}}>Healthy Living</h1>
        <h3 style={{color:'white', fontSize:'20pt'}}>To keep the body in good health is a duty, otherwise we shall not be able to keep our mind strong and clear.</h3>
      </div>
      <div className="site-card-wrapper">
          <Row>
              <Col span={5}>
              <h1 style={{textAlign:'left',color:'black', fontWeight:'bold'}}>Ini Lagi Trending</h1>
              </Col>
              <Col span={19} style={{marginTop:'10px'}}>
                  <hr/>
              </Col>
            </Row>
            <Row justify="center">
              {this.state.articleData.slice(0, 3).map(data=> 
              <Card
                style={{width: 301, margin: 9, textAlign:'center'}}
                cover={<img alt="example" src={data.imageUrl}/>}>
                <Meta title={data.title} description={data.content} />
              </Card>
             )}
            </Row>
      </div>

      <div className="content-terbaru">
        <Row>
          <Col span={3}>
              <h1 style={{textAlign:'left',color:'black', fontWeight:'bold'}}>Ini Terbaru</h1>
          </Col>
          <Col span={21} style={{marginTop:'10px'}}>
              <hr/>
          </Col>
        </Row>
        <List
    itemLayout="vertical"
    size="large"
    dataSource={this.state.articleData}
    footer={
      <div className="content-footer">   
        <Row>
          <Col span={11} className="app-text">
            <h1 style={{fontSize:'24pt', margin:'0'}}>CREATE YOUR OWN ARTICLE NOW!</h1>
            <p>Create health articles that are useful for others by clicking the button below.</p>
            <Link to='/createPost'>
              <Button type="dark" style={{width:'100px', height:'50px',  color:'white', backgroundColor:'black', fontWeight:'bold'}}>
                CREATE
              </Button>  
            </Link> 
          </Col>
          <Col span={13}>
            <img className="img-footer" src="https://iu.co.id/wp-content/uploads/2019/10/healthy-lifestyle.jpeg"></img>
          </Col> 
        </Row>
      </div>
    }
    renderItem={item => (
      <List.Item
        key={item.title}
        extra={
          <img
            width={275}
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
      </div>      
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
      );
  }
}


export default Home;
