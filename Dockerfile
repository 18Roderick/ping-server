FROM node:lts


WORKDIR /home/app

COPY package*.json .
COPY . .
RUN npm install 

RUN npx prisma generate




#RUN npm run run:seeds

#ARG user
#ENV user_docker $user
#ADD add_user.sh /datos1
#RUN /datos1/add_user.sh


CMD ["npm","start"]


EXPOSE 3000