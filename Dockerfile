FROM node:latest


RUN apt update -y && apt install -y bash && apt install -y iputils-ping && npm rebuild bcrypt --build-from-source


WORKDIR /home/app

COPY . .
COPY package.json ./
#ARG user
#ENV user_docker $user
#ADD add_user.sh /datos1
#RUN /datos1/add_user.sh


CMD ["npm","start"]


EXPOSE 3000