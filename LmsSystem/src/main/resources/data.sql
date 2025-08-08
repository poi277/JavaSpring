INSERT INTO PROFESSOR_INFO(PROFESSOR_ID,PASSWORD,PROFESSOR_NAME,EMAIL,OFFICE_LOCATION,PHONE_NUMBER,POSITION,DEPARTMENT) 
VALUES (1,'$2a$10$iEha8WnqgiKOeHoVzxiQ7.ovy1dC.OMLLwOv8TPicJ3n7hg9b1/u6','김길동','asd@naver.com','w18호','010-1111-2222','정교수','사회학과'),
		 (2,'$2a$10$iEha8WnqgiKOeHoVzxiQ7.ovy1dC.OMLLwOv8TPicJ3n7hg9b1/u6','홍길동','wsd@naver.com','a5호','010-3232-3333','정교수','미디어학과'),
		 (3,'$2a$10$iEha8WnqgiKOeHoVzxiQ7.ovy1dC.OMLLwOv8TPicJ3n7hg9b1/u6','신길동','gozongminbabo@naver.com','e5호','010-3232-3232','정교수','디자인학과');

INSERT INTO SUBJECT_INFO (SUBJECT, PROFESSOR_ID, DEPARTMENT_CLASS, START_HOUR, END_HOUR, GRADE_HOUR, CLASSDAY,CURRENT_STUDENTS_COUNT, MAXIMUM_STUDENTS_COUNT,SUBJECT_YEAR,SEMESTER,SUBJECT_STATUS )
VALUES ('유아학개론', 1, 'w18', 9, 11, 7, '월', 29, 29,2025,'FIRST','OPEN'),
('사진촬영', 2, 'w18', 9, 11, 7, '화', 0, 30,2025,'FIRST','OPEN'),
('포토샵', 3, 'w18', 9, 11, 7, '수', 0, 30,2025,'FIRST','OPEN'),
('청소년심리', 1, 'w18', 9, 11, 7, '월', 0, 30,2025,'FIRST','OPEN'),
('기초수학', 2, 'w18', 9, 11, 7, '화', 0, 30,2025,'FIRST','OPEN'),
('일러스트레이션기초', 3, 'w18', 9, 11, 7, '수', 0,30,2025,'FIRST','OPEN'),
('경제이론', 1, 'w18', 9, 11, 7, '월', 0,30 ,2025,'FIRST','OPEN'),
('심리학이론', 2, 'w18', 9, 11, 7, '화', 0, 30,2025,'FIRST','OPEN'),
('인체학개론', 3, 'w18', 9, 11, 7, '수', 0, 30,2025,'FIRST','OPEN');


INSERT INTO STDUENTS_INFO (STUDENT_ID ,PASSWORD, Department, STUDENT_NAME,MAX_GRADE_HOUR,PHONE_NUMBER,email) VALUES ('11','$2a$10$iEha8WnqgiKOeHoVzxiQ7.ovy1dC.OMLLwOv8TPicJ3n7hg9b1/u6', 'a', 'qwe',18,'010','naver');
INSERT INTO STDUENTS_INFO (STUDENT_ID ,PASSWORD, Department, STUDENT_NAME,MAX_GRADE_HOUR,PHONE_NUMBER,email) VALUES ('22','$2a$10$iEha8WnqgiKOeHoVzxiQ7.ovy1dC.OMLLwOv8TPicJ3n7hg9b1/u6', 'a', 'poi',18,'010','naver');
INSERT INTO STDUENTS_INFO (STUDENT_ID ,PASSWORD, Department, STUDENT_NAME,MAX_GRADE_HOUR,PHONE_NUMBER,email) VALUES ('33','$2a$10$iEha8WnqgiKOeHoVzxiQ7.ovy1dC.OMLLwOv8TPicJ3n7hg9b1/u6', 'a', 'as',18,'010','naver');
INSERT INTO SUBJECT_POST(POST_ID,STUDENT_ID,SUBJECT_ID,CREATED_DATE,CATEGORY,TITLE,CONTENT) 
VALUES (1, '11', 2, '2025-07-12T15:20:00', '일반', '안녕', '안녕'),
		(2, '22', 2, '2025-07-12T15:20:00', '일반', '안녕2', '안녕2');
		

		
INSERT INTO ADMIN(ID,NAME,PASSWORD) VALUES('ADMIN','ADMIN','$2a$10$iEha8WnqgiKOeHoVzxiQ7.ovy1dC.OMLLwOv8TPicJ3n7hg9b1/u6')

