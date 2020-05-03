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

const cardTrending = [
  {
    image : "https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/03/mom-woman-kid-face-mask-hospital-732x549-thumbnail-732x549.jpg?w=514",
    title : "How to Use a Face Mask Correctly",
    describe : "Surgical masks may protect against larger airborne particles whereas N95 respirators provide better protection against…"
  },
  {
    image :"https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/03/family-kids-dad-dinner-eating-home-732x549-thumbnail-732x549.jpg?w=514",
    title : "A 1-Week Meal Plan and Shopping List for Your Family of 4 (or More!)",
    describe : "If you're looking to limit your outings to the grocery store but still have plenty of food to cook for your family, it can be…"
  },
  {
    image : "https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/03/Male_Laptop_732x549-thumbnail-1-732x549.jpg?w=514",
    title : "7 Tips for Making the Most of Online Therapy During the COVID-19 Outbreak",
    describe : "Online therapy can feel awkward. But it doesn't have to."
  }
]

class Home extends React.Component{
  constructor (props) {
    super(props)
    this.state = {
      articleData: cardTerbaru
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
          <Row>
            <Col span={23}>
              <BookOutlined style={{fontSize:'40px', paddingRight:'10px', paddingTop:'12px'}} />
            </Col>
            <Col span={1}>
              <Button style={{height:'40px', width:'90px', textAlign:'center', fontWeight:'bold'}} onClick={() => app.auth().signOut()}>Sign out</Button>
            </Col>
          </Row>
        </div>
          <h1 className="judul">Seger Waras</h1>
      </Header>
      <Content className="content">
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
              {cardTrending.map(data=> 
              <Card
                style={{ width: 301, margin: 9, textAlign:'center'}}
                cover={<img alt="example" src={data.image} />}>
                <Meta title={data.title} description={data.describe} />
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
      <div>
        <b>ant design</b> footer part
      </div>
    }
    renderItem={item => (
      <List.Item
        key={item.title}
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
      </div>      
    </Content>
    <Footer className="footer">
      <div className="content-footer">   
        <Row>
              <Col span={12} className="app-text">
                <h1 style={{fontSize:'30pt', margin:'0'}}>CREATE YOUR OWN ARTICLE NOW!</h1>
                <p>Get 30% off full price and sale with promo code MARCH30 at checkout. Excludes Yeezy, Pharrell Williams, and Gift Cards</p>
                <Button type="dark" style={{width:'100px', height:'50px',  color:'white', backgroundColor:'black', fontWeight:'bold'}}>
                   CREATE
                </Button>
              </Col>
              <Col span={12}>
                <img className="img-footer" src="https://houseofheat.co/app/uploads/2019/09/Air-Jordan-34-22Blue-Void22-AR3240-400-1.jpg"></img>
              </Col> 
        </Row>
      </div>
      <div className="footer-about">
        <h1 className="font-cabin">Created by</h1>
        <h1 className="font-cabin">Alfarelzaki / farizalbab / Rizal Miftah</h1>
        <h3 className="font-cabin">© 2020 SEGER WARAS - ALL RIGHTS RESERVED.</h3>
      </div>

    </Footer>
    </Layout>
      );
  }
}


export default Home;
