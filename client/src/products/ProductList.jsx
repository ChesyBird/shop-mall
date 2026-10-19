import { Link } from "react-router-dom";
import api from "../api/api";
import { useEffect, useState } from "react";

const ProductList = () => {
    const [ products, setProducts ] = useState([]);

    // 검색 키워드 상태 관리
    const [ searchKeyword, setSearchKeyword] = useState("");

    // db에서 데이터 가져오기
    useEffect(()=>{
        const fetchProducts = async ()=>{
            try {
                // 'http://localhost:8000/api/products'
                const response = await api.get('/products');
                setProducts(response.data) // data 속성을 불러줘야함
            } catch (error) {
                console.log("상품 목록 조회 에러 : ", error);
                                
            }
        }
        fetchProducts(); // 함수 호출해야 실행
    }, []); // 최초 1회 렌더링

    // 검색된 상품(목록) 필터링 구현
    const filterProducts = products.filter(product => 
        product.product_name.toLowerCase().includes(searchKeyword.toLocaleLowerCase())
    );

    return (
        <div className="product-list">
            {/* 검색 기능 */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="상품명으로 검색"
                    onChange={(e)=> setSearchKeyword(e.target.value)}
                />
            </div>

            {/* 상품 목록 */}
            <table>
                <thead>
                    <tr>
                        <th>번호</th><th>상품명</th><th>가격</th>
                    </tr>
                </thead>
                <tbody>
                    {filterProducts.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                                <Link to={`/products/${product.id}`}>{product.product_name}</Link>
                            </td>
                            <td>{product.price}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="btn-add">
                <Link to="/products/new">
                <button type="button">상품 등록</button>
                </Link>
            </div>
        </div>
    )
}

export default ProductList;