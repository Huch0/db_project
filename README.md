# db_project

## 프로젝트 실행방법

### 1. npm 패키지 설치

1.1. ./uniconnect-db-test 디렉토리로 이동

``` shell
cd ./uniconnect-db-test/
```

1.2. 패키지 설치

``` shell
npm install
```

### 2. 데이터베이스 생성

- DB 정보 :
  - database 이름 : db_projec
  - DB Admin 이름 : uniconnect_admin
  - DB Admin Password : mudBob-sykwu4-zitxij

2.1. Admin user 생성

``` SQL
CREATE USER uniconnect_admin with ENCRYPTED PASSWORD 'mudBob-sykwu4-zitxij';
```

2.2. tablespace 생성

``` SQL
create tablespace ts_db_project owner uniconnect_admin location 'tablespace경로';
```

2.3. db_project 생성

``` SQL
create database db_project owner uniconnect_admin tablespace ts_db_project;
```

### 3. 데이터베이스 초기 설정

3.1. 프로젝트 db 디렉토리로 이동

``` shell
cd ./db
```

3.2. Sequelize db migration 
- `/db/migrations/` 의 migration 코드로 Table들을 생성합니다.

``` shell
npx sequelize-cli db:migrate
```

3.3. Sequelize db seed 생성 
- `/db/seeders` 의 seeder 코드로 테스트용 tuple들을 데이터베이스 insert됩니다.

``` shell
npx sequelize-cli db:seed:all
```

아래의 명령어로 취소할 수 있습니다.

``` shell
npx sequelize-cli db:seed:undo:all
```

3.4. initial_db_setup.sql 실행
- user 생성, role 생성, 권한 부여 등의 작업을 수행하는 SQL 코드들이 담겨있습니다.


### 4. 웹 로컬 서버 실행

4.1. ./uniconnect-db-test 디렉토리로 이동

``` shell
cd ..
```

4.2. 웹 애플리케이션 실행

``` shell
npm run dev
```

### 5. 브라우저에서 확인

모든 기능들은 /main 에서 확인할 수 있습니다.
http://localhost:3000/main
