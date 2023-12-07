# db_project

## 프로젝트 실행방법

### 1. 데이터베이스 생성

- DB 정보 :
database 이름 : db_projec
DB Admin 이름 : uniconnect_admin
DB Admin Password : mudBob-sykwu4-zitxij

1.1. Admin user 생성

``` SQL
CREATE USER uniconnect_admin with ENCRYPTED PASSWORD 'mudBob-sykwu4-zitxij';
```

1.2. tablespace 생성

``` SQL
create tablespace ts_db_project owner uniconnect_admin location 'tablespace경로';
```

1.3. db_project 생성

``` SQL
create database db_project owner uniconnect_admin tablespace ts_db_project;
```

1.4. initial_db_setup.sql 실행
user, role, privilege grant 코드들이 담겨있습니다.

### 2. 데이터베이스 seed 생성

2.1. 프로젝트 db 디렉토리로 이동

``` shell
cd ./uniconnect-db-test/db
```

2.2. db 시드 생성
미리 지정해놓은 tuple들이 데이터베이스 insert됩니다.

``` shell
npx sequelize-cli db:seed:all
```

아래의 명령어로 취소할 수 있습니다.

``` shell
npx sequelize-cli db:seed:undo:all
```

### 3. npm 패키지 설치

3.1. ./uniconnect-db-test 디렉토리로 이동

``` shell
cd ../uniconnect-db-test/
```

3.2. 패키지 설치

``` shell
npm install
```

### 4. 웹 로컬 서버 실행

``` shell
npm run dev
```

### 5. 브라우저에서 확인

모든 기능들은 /main 에서 확인할 수 있습니다.
http://localhost:3000/main
