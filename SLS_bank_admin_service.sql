select * from loan_applications
/
update loan_applications set status = 'APPROVED' where id in (2,5)
/
update loan_applications set status = 'REJECTED' where id in (3)
/
CREATE TABLE loan_applications (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    student_name VARCHAR2(100) NOT NULL,
    loan_amount NUMBER(15,2) NOT NULL,
    status VARCHAR2(20) DEFAULT 'PENDING' NOT NULL,
    application_date DATE DEFAULT SYSDATE NOT NULL
)
/
drop table loan_applications
/
INSERT INTO loan_applications (student_name, loan_amount, status, application_date)  
VALUES 
    ('Alice Johnson', 15000.00, 'PENDING', TO_DATE('2024-03-01', 'YYYY-MM-DD')),
    ('Bob Smith', 20000.00, 'APPROVED', TO_DATE('2024-02-15', 'YYYY-MM-DD')),
    ('Charlie Brown', 18000.00, 'REJECTED', TO_DATE('2024-02-20', 'YYYY-MM-DD')),
    ('David Lee', 22000.00, 'PENDING', TO_DATE('2024-03-05', 'YYYY-MM-DD')),
    ('Emma Davis', 25000.00, 'APPROVED', TO_DATE('2024-01-30', 'YYYY-MM-DD'));

/
CREATE TABLE loan_applications (
    id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    applicant_id NUMBER NOT NULL,
    requested_amount NUMBER(15,2) NOT NULL,
    status VARCHAR2(20) DEFAULT 'PENDING' NOT NULL,
    sanctioned_amount NUMBER(15,2)
)
delete from loan_applications where id = 2

INSERT INTO loan_applications (student_name, loan_amount, status, application_date) 
VALUES ('Alice Johnson', 15000.00, 'PENDING', TO_DATE('2024-03-01', 'YYYY-MM-DD'));

INSERT INTO loan_applications (student_name, loan_amount, status, application_date) 
VALUES ('Bob Smith', 20000.00, 'APPROVED', TO_DATE('2024-02-15', 'YYYY-MM-DD'));

INSERT INTO loan_applications (student_name, loan_amount, status, application_date) 
VALUES ('Charlie Brown', 18000.00, 'REJECTED', TO_DATE('2024-02-20', 'YYYY-MM-DD'));

INSERT INTO loan_applications (student_name, loan_amount, status, application_date) 
VALUES ('David Lee', 22000.00, 'PENDING', TO_DATE('2024-03-05', 'YYYY-MM-DD'));

INSERT INTO loan_applications (student_name, loan_amount, status, application_date) 
VALUES ('Emma Davis', 25000.00, 'APPROVED', TO_DATE('2024-01-30', 'YYYY-MM-DD'));

------------------------------------------------------------------------------------------

INSERT INTO loan_applications (STUDENT_NAME, LOAN_AMOUNT, STATUS, APPLICATION_DATE)
VALUES ('Michael Scott', 30000.00, 'APPROVED', TO_DATE('2024-02-28', 'YYYY-MM-DD'));

INSERT INTO loan_applications (STUDENT_NAME, LOAN_AMOUNT, STATUS, APPLICATION_DATE)
VALUES ('Jim Halpert', 40000.00, 'APPROVED', TO_DATE('2024-01-25', 'YYYY-MM-DD'));

INSERT INTO loan_applications (STUDENT_NAME, LOAN_AMOUNT, STATUS, APPLICATION_DATE)
VALUES ('Pam Beesly', 18000.00, 'REJECTED', TO_DATE('2024-02-10', 'YYYY-MM-DD'));

INSERT INTO loan_applications (STUDENT_NAME, LOAN_AMOUNT, STATUS, APPLICATION_DATE)
VALUES ('Dwight Schrute', 35000.00, 'REJECTED', TO_DATE('2024-03-03', 'YYYY-MM-DD'));

SELECT * FROM loan_applications 

SELECT * FROM loan_applications WHERE STATUS = 'APPROVED' AND APPLICATION_DATE <= SYSDATE - INTERVAL '15' DAY;

INSERT INTO loan_applications (STUDENT_NAME, LOAN_AMOUNT, STATUS, APPLICATION_DATE) 
VALUES ('Grey Matter', 53000.00, 'APPROVED', TO_DATE('2025-03-10', 'YYYY-MM-DD'));

INSERT INTO loan_applications (STUDENT_NAME, LOAN_AMOUNT, STATUS, APPLICATION_DATE) 
VALUES ('Peter Parker', 15000.00, 'APPROVED', TO_DATE('2025-03-08', 'YYYY-MM-DD'));

INSERT INTO loan_applications (STUDENT_NAME, LOAN_AMOUNT, STATUS, APPLICATION_DATE) 
VALUES ('John Snow', 35000.00, 'APPROVED', TO_DATE('2025-03-12', 'YYYY-MM-DD'));

ALTER TABLE loan_applications 
ADD PURPOSE VARCHAR2(100);

ALTER TABLE loan_applications 
ADD TERM NUMBER;

ALTER TABLE loan_applications 
ADD INTEREST_RATE NUMBER(5,2);

INSERT INTO loan_applications (STUDENT_NAME, LOAN_AMOUNT, STATUS, APPLICATION_DATE, PURPOSE, TERM, INTEREST_RATE) 
VALUES ('Oscar Martinez', 30000.00, 'PENDING', TO_DATE('2024-03-05', 'YYYY-MM-DD'), 'Postgraduate Degree', 24, 5.75);

INSERT INTO loan_applications (STUDENT_NAME, LOAN_AMOUNT, STATUS, APPLICATION_DATE, PURPOSE, TERM, INTEREST_RATE) 
VALUES ('Meredith Palmer', 40000.00, 'APPROVED', TO_DATE('2024-03-02', 'YYYY-MM-DD'), 'Graduate Degree', 36, 6.25);

INSERT INTO loan_applications (STUDENT_NAME, LOAN_AMOUNT, STATUS, APPLICATION_DATE, PURPOSE, TERM, INTEREST_RATE) 
VALUES ('Ryan Howard', 25000.00, 'REJECTED', TO_DATE('2024-03-10', 'YYYY-MM-DD'), 'PhD', 12, 5.00);

select * from loan_applications

SELECT * FROM loan_applications WHERE status='PENDING'

UPDATE loan_applications set status = 'PENDING' where id in (1,5)

-- Update 5 students with 'Postgraduate Degree'
UPDATE loan_applications 
SET PURPOSE = 'Postgraduate Degree', TERM = 24, INTEREST_RATE = 5.75
WHERE STUDENT_NAME IN ('Alice Johnson', 'Bob Smith', 'Michael Scott', 'Pam Beesly', 'Kevin Malone');

-- Update 5 students with 'Graduate Degree'
UPDATE loan_applications 
SET PURPOSE = 'Graduate Degree', TERM = 36, INTEREST_RATE = 6.25
WHERE STUDENT_NAME IN ('David Lee', 'Jim Halpert', 'Emma Davis', 'Stanley Hudson', 'Grey Matter');

-- Update 5 students with 'PhD'
UPDATE loan_applications 
SET PURPOSE = 'PhD', TERM = 48, INTEREST_RATE = 4.95
WHERE STUDENT_NAME IN ('Peter Parker', 'John Snow', 'Ryan Howard', 'Angela Martin', 'Dwight Schrute');


CREATE TABLE bank_data (
    portfolio_amount NUMBER(20,2)
)

select * from bank_data

insert into bank_data (portfolio_amount) values (5500000)
truncate table bank_data


















