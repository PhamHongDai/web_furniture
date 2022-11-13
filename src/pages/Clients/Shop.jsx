import React, { useEffect, useState } from "react";
import CommonSection from "../../components/UI/CommonSection";
import Helmet from "../../components/layout/Helmet";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ProductList from "../../components/UI/ProductList";

const Container = styled.section`

  .container{
    padding: 0px 140px;
  }
  .row{
    display: grid;
    grid-template-columns: 30% 30% 40%;
  }
  .filter__widget select{
    padding: 8px 20px;
    border: 1px solid #111;
    border-radius: 5px;
    background: #331929;
    color:#fff;
    font-size: .9rem;
  }
  .filter__widget select:focus{
    outline: none !important;
  }
  .filter__widget select option{
    font-size: .8rem;
  }
  .search__box{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #331929;
    border-radius: 5px;
    padding-right: 10px;
    padding-left: 2px;
    cursor: pointer;
  }
  .search__box input{
    width: 100%;
    border: none;
    outline: none;
    padding: 8px 10px;
  }
  .search__box span i{
    color: #331929;
  }
`
const Shop = () => {
  const { products } = useSelector((state) => state.product);
  const [productData, setProductData] = useState([]);
  const { categories } = useSelector((state) => state.category);
  let filterValue = "default"

  const handleFilter = (e) => {
  filterValue = e.target.value
    {
      categories.map((catag) => {
        if (filterValue === "default"){
          setProductData(products);
        }
        else if(filterValue === catag.name){
          const filteredProducts = products.filter(
            (item) => item.category.name === catag.name
          );
          setProductData(filteredProducts)
        }
      })
    }
  }

  const handleSearch = (e) => {
    const searchTerm =  e.target.value  
    const searchProducts = products.filter(item => item.name.
      toLowerCase().includes(searchTerm.toLowerCase()))
    setProductData(searchProducts)
  }
  useEffect(() => {
    if(products)
    {
      setProductData(products);
    };
  },[products])

    return (
      <Helmet title="Shop">
        <CommonSection title='Sản phẩm'/>

        <Container>
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="filter__widget">
                  <select onChange={handleFilter}>
                    <option value="default">Lọc theo danh mục</option>
                    {
                      categories.map((item,index) => {
                        return (
                          <option key={index} value={item.name}>{item.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>

              <div className="col">
                <div className="filter__widget">
                    <select>
                      <option>Sắp xếp theo</option>
                      <option value="ascending">Tăng dần</option>
                      <option value="desceding">Giảm dần</option>
                    </select>
                  </div>
              </div>

              <div className="col">
                <div className="search__box">
                  <input type="text" placeholder="Tìm kiếm ..." onChange={handleSearch}/>
                  <span>
                    <i className="ri-search-line"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <section>
          {
            productData.length === 0 ? <h1 style={{textAlign: "center", fontSize: "1.5rem"}}>Không tìm thấy sản phẩm!</h1>
            : <ProductList data ={productData}/> 
          }
        </section>
      </Helmet>
    );
  }
  
export default Shop;
  