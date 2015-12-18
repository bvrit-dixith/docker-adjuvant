FROM node:4-onbuild

RUN cd ./public
RUN npm install
EXPOSE 8083
EXPOSE 8090


