FROM node
WORKDIR /code
COPY package.json .
COPY . .
RUN npm install --silent
EXPOSE 3000
ENV NODE_PATH .
CMD ["./docker-run.sh"]