app_name = flask-prod-app


build:
    docker build -t $(app_name) .


run:
    docker run --name $(app_name) --detach -p 9000:9000 $(app_name)


kill:
    docker stop $(app_name)
    docker container prune -f
    docker rmi -f $(app_name)
