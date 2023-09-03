FROM python:alpine3.7


COPY requirements.txt /
RUN pip3 install -r /requirements.txt


COPY . /loan_management
WORKDIR /loan_management

ENV FLASK_APP=loan_management


ENTRYPOINT ["./gunicorn_starter.sh"]