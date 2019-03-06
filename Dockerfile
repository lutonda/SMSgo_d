FROM nginx:stable-alpine

WORKDIR /opt/app

RUN rm -rf /usr/share/nginx/html
RUN ln -s /opt/app /usr/share/nginx/html


RUN echo chmod -R 755 /opt/app >> /boot.sh
#RUN echo 'nginx -g "daemon off;"' >> /usr/bin/start.sh

CMD sh /boot.sh && nginx -g "daemon off;"
