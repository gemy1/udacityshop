# pipeline config

- create a a file named .circleci
- create a file named config.yml inside the .circleci directory

# content of config.yml

`version: 2.1
orbs:
  node: circleci/node@5.0.2
  aws-cli: circleci/aws-cli@3.1.1
  eb: circleci/aws-elastic-beanstalk@2.0.1
jobs:
  build:
    docker:
      - image: "cimg/base:stable"
    steps:
      - node/install
      - checkout
      - aws-cli/setup
      - eb/setup
      - run:
          name: Front-End Install
          command: |
            npm run frontend:install
      - run:
          name: Back-End Install
          command: |
            npm run backend:install
      - run:
          name: Front-End Build
          command: |
            npm run frontend:build
      - run:
          name: Back-End Build
          command: |
            npm run backend:build
      - run:
          name: Deploy frontend
          command: |
            npm run frontend:deploy
      - run:
          name: Deploy backend
          command: |
            npm run backend:deploy
`

# Explenation

- First is the version of circelci
- Second is the orbs needed to prepare the environment
- Third is the jops
- create the environment with dependencies
- then run the command from the main package.json
- install the dependencies for the frontend
- install the dependencies for the backend
- build the frontend for production
- build the backend for production
- deploy the frontend to AWS S3
- deploy the backend to AWS Elastic Beanstalk
