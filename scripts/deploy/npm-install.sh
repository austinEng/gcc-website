#!/bin/bash
source /home/ec2-user/.bash_profile
cd /home/gcc_website
npm install
npm run babel
npm run webpack
npm run test
npm run esdoc
