# digram overview

               +------------------------+
               |       AWS S3 (UI)       |
               |    React Front-end App  |
               +------------------------+
                          |
                          | HTTP Requests/Responses
                          |
               +------------------------+
               |    AWS Elastic Beanstalk|
               |    Node.js Back-end App |
               +------------------------+
                          |
                          | Database Queries
                          |
               +------------------------+
               |   AWS RDS (PostgreSQL)  |
               |     Database Instance   |
               +------------------------+

# frontend

- react `npx create-react-app my-app`

## frontend Hosted on AWS S3 Bucket

# backend

- node with express

## backend Hosted on AWS Elastic Beanstalk

# database

- postgresql

## database Hosted on AWS RED
