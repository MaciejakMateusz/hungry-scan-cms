FROM node:18-alpine AS builder

WORKDIR /app

ARG REACT_APP_CORE_HOST
ENV REACT_APP_CORE_HOST=$REACT_APP_CORE_HOST

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

COPY default.conf.template /etc/nginx/templates/default.conf.template

CMD ["nginx", "-g", "daemon off;"]

LABEL authors="Mateusz Maciejak"