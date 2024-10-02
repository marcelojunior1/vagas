FROM tensorflow/tensorflow:2.16.2-gpu
COPY ./api/requirements.txt /api/requirements.txt
WORKDIR /api
RUN pip install -r requirements.txt
EXPOSE 8000
CMD  uvicorn main:app --host 0.0.0.0 --env-file .env
