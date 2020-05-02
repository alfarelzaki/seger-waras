import React from "react";
import { app, db } from "../firebase";
import './Home.css';
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd';
import { Card } from 'antd';
import { Button, Tooltip } from 'antd';
import { Layout, Menu, Breadcrumb } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { Carousel } from 'antd';


const { Header, Content, Footer } = Layout;
const { Meta } = Card;

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

const cardTerbaru=[
  {
    imageUrl:"https://i0.wp.com/mojok.co/wp-content/uploads/2020/04/prediksi-covid-19-di-indonesia-260x170.jpg",
    title:"Beberapa Prediksi tentang Kapan Wabah Corona di Indonesia Akan Berakhir",
    content:"Semoga cepat berakhir."
  },
  {
    imageUrl:"https://i0.wp.com/mojok.co/wp-content/uploads/2020/04/prediksi-covid-19-di-indonesia-260x170.jpg",
    title:"Beberapa Prediksi tentang Kapan Wabah Corona di Indonesia Akan Berakhir",
    content:"Semoga cepat berakhir."
  },
  {
    imageUrl:"https://i0.wp.com/mojok.co/wp-content/uploads/2020/04/prediksi-covid-19-di-indonesia-260x170.jpg",
    title:"Beberapa Prediksi tentang Kapan Wabah Corona di Indonesia Akan Berakhir",
    content:"Semoga cepat berakhir."
  },
  {
    imageUrl:"https://i0.wp.com/mojok.co/wp-content/uploads/2020/04/prediksi-covid-19-di-indonesia-260x170.jpg",
    title:"Beberapa Prediksi tentang Kapan Wabah Corona di Indonesia Akan Berakhir",
    content:"Semoga cepat berakhir."
  },
  {
    imageUrl:"https://i0.wp.com/mojok.co/wp-content/uploads/2020/04/prediksi-covid-19-di-indonesia-260x170.jpg",
    title:"Beberapa Prediksi tentang Kapan Wabah Corona di Indonesia Akan Berakhir",
    content:"Semoga cepat berakhir."
  },
]

const cardPopuler=[
  {
    image:"https://i0.wp.com/post.healthline.com/wp-content/uploads/2020/03/Female_Grocery_Store_Coronavirus_732x549-thumbnail-732x549.jpg?w=514",
    title:"Here’s How to Clean Your Groceries During the COVID-19 Outbreak",
    describe:"Shopping for groceries carries extra risk during the COVID-19 outbreak. Not only are you near other people, but many of the…"
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
      
        <Row>
          <Col span={17}>
                <Row>
                  {this.state.articleData.map(data=> 
                    <div>
                      <Row style={{marginTop: 20, paddingRight:20}}>
                        <Col span={9}>
                          <div>
                            <img style={{width:220}} src={data.imageUrl} />
                          </div>
                        </Col>
                        <Col span={15}>
                          <div style={{textAlign:'left'}}>
                            <Meta title={data.title} description={data.content} />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  )}         
                </Row>
          </Col>
          <Col span={7} className="side-news">
            <h1 style={{textAlign:'center', textDecoration:'underline', fontWeight:'bold'}}>Ini Populer</h1>
            {cardPopuler.map(data=>
            <div>
              <img style={{width:220, textAlign:'center'}} src={data.image} />
              <Meta title={data.title}/>
            </div>
              )}
          </Col>
        </Row>
      </div>
              
    </Content>
    <Footer className="footer">
      <div className="content-footer">
        <Row>
          <Col span={10} style={{textAlign:'center'}}>
            <h3>INI TRENDING</h3>
            <p>Black Friday<br/>Cyber Monday<br/>Casual Shoes<br/>Slip On Shoes<br/>Camo Clothing<br/>Burgundy Shoes<br/>Leather Sneakers</p>
          </Col>
          <Col span={4}>
          <h3>INI TERBARU</h3>
          <p>Get Help<br/>Track Order<br/>Return and Refunds<br/>Promotions<br/>How to Clean<br/>Store Locator<br/>Site Map</p>
          </Col>
          <Col span={10}style={{textAlign:'center'}}>
          <h3>INI POPULER</h3>
          <p>About Us<br/>Careers<br/>Press<br/>Military Discount<br/>Student Discount<br/>Mobile Apps<br/>Creator Clubs Adadas Stories</p>
          </Col>
        </Row>
      </div>
      <div>
        <h1 className="judul-footer">Seger Waras</h1>
        <h1 className="font-cabin">Alfarelzaki / farizalbab / MRizal</h1>
        <h3 className="font-cabin">© 2020 SEGER WARAS - ALL RIGHTS RESERVED.</h3>
      </div>

    </Footer>
    </Layout>
      );
  }
}


export default Home;
