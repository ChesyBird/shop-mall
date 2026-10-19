import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

// 해당 아이디로 상품을 수정
const UpdateProduct = () => {
    const {id} = useParams();

    const [ formData, setFormData ] = useState({
        productName: "",
        price: "",
        description: ""
    })

    const { productName, price, description } = formData;

    const navigate = useNavigate();
    
    // 수정할 상품 가져오기
    useEffect(()=>{
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setFormData({
                    // 필드네임속성(name): value(db의 칼럼값)
                    productName: response.data.product_name,
                    price: response.data.price,
                    description: response.data.description
            })
            } catch (error) {
                alert("상품 조회 중 에러 발생", error);
            }
        }
        fetchProduct();
    }, [id])

    // 입력값 변경
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    // 폼 처리
    const handleSubmit = async (e) => {
        e.preventDefault();

        // 수정된 데이터를 서버로 보내기
        try {
            await api.put(`/products/${id}`, formData);
            alert("상품이 성공적으로 수정되었습니다.");
            navigate(`/products/${id}`); // 수정 후 상세 페이지로 이동
        } catch (error) {
            alert("상품 수정 중 오류가 발생하였습니다.", error);
        }
    }

    // 취소 버튼을 클릭 시 초기화
    const handleCancel = () => {
        setFormData({
            productName: "",
            price: "",
            description: ""
        });
    }

    return (
        <div className="update-product">
            <h2>상품 수정</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productName">상품명</label>
                    <input
                        type="text"
                        name="productName"
                        id="productName"
                        value={productName}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="price">가격</label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={price}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">설명</label>
                    <textarea
                        name="description"
                        id="description"
                        rows={5}
                        value={description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <button type="submit">수정</button>
                    <button type="button" onClick={handleCancel}>취소</button>
                </div>
            </form>
        </div>
    )
}
export default UpdateProduct;