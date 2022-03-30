FROM node:17-alpine3.14

#RUN apt update -y && apt install -y bash && apt install -y iputils-ping && npm rebuild bcrypt --build-from-source


WORKDIR /home/app

COPY . .


#RUN npm run run:seeds

#ARG user
#ENV user_docker $user
#ADD add_user.sh /datos1
#RUN /datos1/add_user.sh


CMD ["npm","start"]


EXPOSE 3000