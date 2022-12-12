import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Helmet from "../../components/layout/Helmet";
import heroImg from "../../images/bannerImg.png";
import { Link } from "react-router-dom";
import Services from "../../components/services/Services";
import ProductList from "../../components/UI/ProductList";
import { useSelector } from "react-redux";


const HeroSection = styled.section`
  background: #EEC0C6;
`
const HeroBanner = styled.div`
  display: flex;
  padding: 0px 120px;
  .hero__content h2{
    color: #111;
    font-size: 2.3rem;
    font-weight: 600;
    margin: 20px 0px;
  }

  .hero__content p{
    color: #111;
    line-height: 28px;
  }

  .buy__btn{
    border: none;
    outline: none;
    padding: 10px 20px;
    margin: 20px 7px;
    border-radius: 5px;
    background: #331929;
    color: #c2c1c1;
    cursor: pointer;
    font-size: .9rem;
  }
  .buy__btn:hover{
    color: #fff;
  }
  .hero__img img{
    width: auto;
    height: 350px;
    padding: 40px 100px;
  }
`
const TrendingProduct = styled.section`
  display: flex;
  align-items: center;
  justify-content: center; 
`
const TrendingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .section__title{
    color: #0D324D;
    font-size: 1.7rem;
    font-weight: 600;
  }
`

const Home = () => {
  const [listProduct, setListProduct] = useState([]);
  const { products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    if(products)
    {
      const filteredTrendingProducts = products.filter(
        (item) => item.category.name === "Ghế"
      ).slice(0, 8);
      setListProduct(filteredTrendingProducts);
    };
  },[products])
    const year = new Date().getFullYear();
    return (
      <Helmet title={"Home"}>
        <HeroSection>
          <HeroBanner>
            <div className="hero__content">
                <p className="hero_subtitle">Sản phẩm hot năm {year}</p>
                <h2>Làm cho nội thất của bạn tối giản và hiện đại hơn</h2>
                <p>
                  Mang đến cho ngôi nhà của bạn một phong cách mới. 
                  Sống tốt hơn, thiết kế độc đáo, đáp ứng nhu cầu của bạn!
                </p>
                <Link to="/shop">
                  <motion.button whileHover={{ scale:1.1 }} className="buy__btn">
                    MUA NGAY
                  </motion.button>
                </Link>
              </div>
              <div className="hero__img">
                <img src={heroImg} alt="hero banner"/>
              </div>
          </HeroBanner>
        </HeroSection>
        <Services/>
        <TrendingProduct>
          <TrendingContainer>
            <h2 className="section__title">Sản phẩm thịnh hành</h2>
            {
              loading ? (
                <>loading</>
              ) : (
                <ProductList data={listProduct}/>
              )
            }
          </TrendingContainer>
        </TrendingProduct>
      </Helmet>
    );
  }
  
export default Home;
  