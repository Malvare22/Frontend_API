FROM arm32v7/node:18.16.0 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM arm32v7/nginx:stable
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx","-g","daemon off;"]
