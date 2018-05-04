FROM node:8.9.4 as builder

WORKDIR /usr/src/frontend
COPY package.json package.json
copy public public
copy src src

RUN yarn install
RUN yarn run build

CMD ["yarn", "start"]


FROM nginx:alpine

COPY --from=builder /usr/src/frontend/build /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
