FROM mongo:8.0

ENV MONGO_INITDB_ROOT_USERNAME=root \
    MONGO_INITDB_ROOT_PASSWORD=root

RUN mkdir -p /etc/mongo && \
    chmod 700 /etc/mongo && \
    chown mongodb:mongodb /etc/mongo

COPY keyfile.txt /etc/mongo/mongo-keyfile
COPY init-cosmosound.js /docker-entrypoint-initdb.d/init-cosmosound.js

RUN chmod 400 /etc/mongo/mongo-keyfile && \
    chown mongodb:mongodb /etc/mongo/mongo-keyfile

CMD ["mongod", "--replSet", "rs0", "--bind_ip_all", "--keyFile", "/etc/mongo/mongo-keyfile"]
