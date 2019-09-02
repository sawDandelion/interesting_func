#images of nginx
FROM nginx
COPY ./dist /usr/share/nginx/html/
RUN chown -R 101:101 /usr/share/nginx/html
EXPOSE 80