FROM node:20-alpine

ENV TZ=Asia/Bangkok

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /app
COPY . /app/

WORKDIR /app
RUN yarn
RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start" ]