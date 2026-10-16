import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

// app객체 생성
const app = express();
const PORT = 8000;

// cors(Cross-Origin Resource Sharing) : 교차출처 리소스 공유 라이브러리
// 브라우저가 보안상의 이유로 api 요청을 차단하는 것을 방지
app.use(cors({
    origin: "http://localhost:5173"
}))

// MySQL연결설정
// host
const db = mysql.createConnection({
    host: "localhost",
    user: "jsuser",
    password: "pwjs",
    database: "jsdb"
});

// MySQL 연결
db.connect((err)=>{
    if(err){
        console.error("DB 연결 오류", err);
        return;
    }
    console.log("데이터베이스에 연결했습니다.")
    
});

// 기본 라우트 설정
app.get('/', (req, res)=>{
    res.send("<h1>API서버와 DB 연동</h1>")
})

// 상품목록 조회
// db.query(sql, 데이터, 콜백함수)
app.get("/api/products", (req, res)=>{
    const sql = "SELECT * FROM product";
    db.query(sql, (err, results)=>{
        if(err){
            console.log("상품 조회 오류", err);
            res.send("상품 조회 중 오류가 발생하였습니다.");
            return;
        }
        res.json(results); //json형태로 응답
    })
});

//  본문 요청 파싱
app.use(express.json());

// 상품 등록
app.post("/api/products", (req, res)=>{
    const {productName, price} = req.body; // 요청한 속성 데이터
    const sql = "INSERT INTO product(product_name, price) VALUES(?, ?)" //? : 동적 기호
    db.query(sql, [productName, price], (err, results)=>{
        if(err){
            console.log("상품 등록 오류", err);
            res.send("상품 등록 중 오류가 발생하였습니다.");
            return;
        }
        res.send("상품 등록 완료.");
    })
});

// 상품 상세보기(1건)
app.get("/api/products/:id", (req,res)=>{
    const productId = req.params.id;

    const sql = "SELECT * FROM product WHERE id = ?";

    db.query(sql, [productId], (err, results)=>{
        if(err){
            console.log("상품 조회 에러", err);
            res.send("상품 조회 중 오류가 발생하였습니다.");
            return;            
        }
        res.json(results[0]); // 1건(맨 앞)
    })
})

// 상품 삭제
// app.delete(URL경로, ()=>{})
app.delete("/api/products/:id", (req, res)=>{
    const productId = req.params.id;
    const sql = "DELETE FROM product WHERE id = ?";

    db.query(sql, [productId], (err, results)=>{
        if(err){
            console.log("상품 삭제 에러", err);
            res.send("상품 삭제 중 오류가 발생하였습니다.");
            return;            
        }
        res.send("상품이 성공적으로 삭제되었습니다.");
    })
})

// 상품 정보 수정
// app.put(URL경로, ()=>{})
app.put("/api/products/:id", (req, res)=>{
    // 수정하려면 이미 존재하는 상품(id)을 가져와야함
    const productId = req.params.id;
    const {productName, price} = req.body; // 수정된 데이터
    const sql = "UPDATE product SET product_name=?, price=? WHERE id = ?"
    
    db.query(sql, [productName, price, productId], (err, results)=>{
        if(err){
            console.log("상품 수정 에러", err);
            // 500 : 코드오류, 404 : 페이지 없음, 200 : 정상
            res.send("상품 수정 중 오류가 발생하였습니다."); // res.status(501).send()
            return;
        }
        res.send("상품이 성공적으로 수정되었습니다.");
    })
})

// 서버 실행
app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}에서 서버 실행중...`);
    
})
