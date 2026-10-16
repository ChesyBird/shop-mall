import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { useEffect, useState } from "react";

const ProductInfo = () => {
    // url의 경로를 추출
    const {id} = useParams();
    const [product, setProduct] = useState(null);

    // 페이지 이동
    const navigate = useNavigate();

    // db에서 가져오기
    useEffect(()=>{
        const fetchProducts = async ()=>{
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.log("상품 상세 조회 에러", error);
            }
        }
        fetchProducts();
    }, [id]);

    return (
        <div className="product-info">
            <h2>상품 정보</h2>
            {product && (
                <div className="detail">
                    <p>상품 이름 : {product.product_name}</p>
                    <p>상품 가격 : {product.price}원</p>
                    <p>상품 등록일 : {product.created_at}</p>
                </div>
            )}
            
            <div>
                <button onClick={() => {navigate('/products')}}>목록 보기</button>
            </div>
        </div>
    )
}

export default ProductInfo;