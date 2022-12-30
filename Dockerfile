FROM python:3.8

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

COPY . .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN chmod +x /run.sh
ENTRYPOINT ["./run.sh"]