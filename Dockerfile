FROM node:16.14.2 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx","-g","daemon off;"]
