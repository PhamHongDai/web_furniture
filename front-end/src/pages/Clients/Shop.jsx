import React, { useEffect, useState } from "react";
import CommonSection from "../../components/UI/CommonSection";
import Helmet from "../../components/layout/Helmet";
import styled from "styled-components";
import { useSelector } from "react-redux";
import ProductList from "../../components/UI/ProductList";

const Container = styled.section`

  .content{
    padding: 0px 140px;
  }
  .x{
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
    font-size: .85rem;
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
  

  const convert_vi_to_en = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    str = str.replace(/  +/g, ' ');
    return str;
}

  const handleSearch = (e) => {
    const searchTerm =  convert_vi_to_en(e.target.value)  
    const searchProducts = products.filter(item => {
      let i = convert_vi_to_en(item.name)
      return i.toLowerCase().includes(searchTerm.toLowerCase()) 
    })
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
          <div className="content">
            <div className="x">
              <div className="y">
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

              <div className="y">
                {/* <div className="filter__widget">
                    <select onChange={handlePrice}>
                      <option value="default">Sắp xếp theo</option>
                      <option value="ascending">Tăng dần</option>
                      <option value="desceding">Giảm dần</option>
                    </select>
                  </div> */}
              </div>

              <div className="y">
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
            : 
            <ProductList data ={productData}/> 
          }
        </section>
      </Helmet>
    );
  }
  
export default Shop;
  