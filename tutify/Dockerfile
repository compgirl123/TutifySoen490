# docker image build -t tutify:1.0 .
# docker run -it -p 3000:3000 --detach --name tutify tutify:1.0
# go to localhost:3000

FROM node   
RUN mkdir /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN npm install    
COPY . .

CMD [ "npm", "start" ] 