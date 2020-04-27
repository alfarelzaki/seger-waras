import React from "react";
import { app } from "../firebase";
import './Home.css';
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd';
import { Card } from 'antd';
import { Button, Tooltip } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;
const { Meta } = Card;

const cardData = [
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
  render(){
    return (
      <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '100px', fontWeight:'bold'}}
        >
          <Menu.Item key="1">MEN</Menu.Item>
          <Menu.Item key="2"><Link to='/'>WOMEN</Link></Menu.Item>
          <Menu.Item key="3"><Link to='/'>KIDS</Link></Menu.Item>
          <button onClick={() => app.auth().signOut()}>Sign out</button>
        </Menu>
      </Header>
      <Content className="content">
      <div className="App">
                    
      </div>
      <div className="text-highlight">
          <h1 style={{fontSize:'30pt', marginTop:'0', color:'white'}}>Healthy Living</h1>
          <h3 style={{color:'white', fontSize:'20pt'}}>To keep the body in good health is a duty, otherwise we shall not be able to keep our mind strong and clear.</h3>
         </div>

      <div className="site-card-wrapper">
        <hr/>
        <h1 style={{textAlign:'left',color:'black'}}>Ini Lagi Trending Loh</h1>
            <Row justify="center">
              {cardData.map(data=> 
              <Card
                style={{ width: 300, margin: 8, textAlign:'left'}}
                cover={<img alt="example" src={data.image} />}>
                <Meta title={data.title} description={data.describe} />
              </Card>
             )}
            </Row>
      </div>

      <div className="content-text">
      <hr/>
      <h1 style={{textAlign:'left',color:'black'}}>Ini Penting Banget</h1>
        <Row>
          <Col span={16}>
                <Row>
                  <Col span={8}>
                    {cardData.map(data=> 
                    <div>
                      <img style={{width:200, margin: 10}} src={data.image} />
                    </div>
                    )}
                  </Col>
                  <Col span={16}>
                    {cardData.map(data=>
                      <Meta title={data.title} description={data.describe} />
                      )}
                  </Col>
                </Row>
          </Col>
          <Col span={8} className="side-news">
            
          </Col>
        </Row>
      </div>

      {/* <div className="content-discount">
        <Row>
          <Col span={12} className="discount-text" style={{textAlign:'left', paddingLeft:'330px'}}>
            <h2 style={{fontSize:'23pt', margin:'0', color:'white', fontWeight:'bold'}}>JOIN CREATOR & GET <br/>15% DISCOUNT</h2>
          </Col>
          <Col span={12} style={{paddingTop:'30px', textAlign:'left'}}>
          <Button type="dark" style={{width:'125px', height:'50px',  color:'white', backgroundColor:'black'}}>
              SIGN UP
              
            </Button>
          </Col> 
        </Row>
      </div> */}

      {/* <div className="content-footer">
        <Row>
          <Col span={10} style={{textAlign:'right'}}>
            <h3>TRENDING</h3>
            <p>Black Friday<br/>Cyber Monday<br/>Casual Shoes<br/>Slip On Shoes<br/>Camo Clothing<br/>Burgundy Shoes<br/>Leather Sneakers</p>
          </Col>
          <Col span={4}>
          <h3>CUSTOMER SUPPORT</h3>
          <p>Get Help<br/>Track Order<br/>Return and Refunds<br/>Promotions<br/>How to Clean<br/>Store Locator<br/>Site Map</p>
          </Col>
          <Col span={10}style={{textAlign:'left'}}>
          <h3>COMPANY INFO</h3>
          <p>About Us<br/>Careers<br/>Press<br/>Military Discount<br/>Student Discount<br/>Mobile Apps<br/>Creator Clubs Adadas Stories</p>
            
          </Col>
        </Row>

      </div> */}
        
    </Content>
    </Layout>
      );
  }
}


export default Home;
