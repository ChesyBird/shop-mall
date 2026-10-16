### MySQL : jsdb

create table product(<br>
	-- 컬럼명 자료형
    id int AUTO_INCREMENT PRIMARY key, -- 숫자형 <br>
    product_name varchar(30) not null, -- 문자형 필수 <br>
    price int not null,<br>
    created_at timestamp default CURRENT_TIMESTAMP
    <br>
);