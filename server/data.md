### MySQL : jsdb

create table product(
	-- 컬럼명 자료형
    id int AUTO_INCREMENT PRIMARY key, -- 숫자형
    product_name varchar(30) not null, -- 문자형 필수
    price int not null,
    creatd_at timestamp default CURRENT_TIMESTAMP
);