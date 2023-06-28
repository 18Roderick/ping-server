FROM node:lts


WORKDIR /home/app

COPY package*.json .
COPY . .

RUN npm install -g pnpm
RUN npm install -g nodemon

RUN pnpm install

RUN pnpm run build
RUN pnpm prisma generate

#RUN npm run run:seeds

#ARG user
#ENV user_docker $user
#ADD add_user.sh /datos1
#RUN /datos1/add_user.sh
# Copy the production dependencies from the deps stage and also
# the built application from the build stage into the image.
# COPY --from=deps /home/app/node_modules ./node_modules
# COPY --from=build /home/app/src ./src

EXPOSE 3000

CMD pnpm run dev


