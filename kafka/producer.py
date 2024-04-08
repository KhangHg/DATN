import os
import time
import random
import json
from kafka import KafkaProducer

def define_producer():   
    KAFKA_BOOTSTRAP_SERVERS = os.environ.get("KAFKA_BOOTSTRAP_SERVERS", "localhost:29092")
    KAFKA_TOPIC_TEST = os.environ.get("KAFKA_TOPIC_TEST", "test")
    KAFKA_API_VERSION = os.environ.get("KAFKA_API_VERSION", "7.3.1")
    producer = KafkaProducer(
        bootstrap_servers=[KAFKA_BOOTSTRAP_SERVERS],
        api_version=KAFKA_API_VERSION,
    )
    curr_time = time.time()
    last_event_time = 0
    while True :
        # if time.time() > curr_time + 60: #1 minute
        #     print("Time out")
        #     break
        event_time = get_event_time()
        if event_time > last_event_time:
            data = get_data()
            producer.send(
                KAFKA_TOPIC_TEST,
                json.dumps(data).encode("utf-8")
            )
            producer.flush()
            last_event_time = event_time

def get_data():
    import requests

    res = requests.get("http://localhost:9090/micro/good")
    res = res.json()
    # print(res)
    return res
def get_event_time():
    import requests

    res = requests.head("http://localhost:9090/micro/good")
    event_time = res.headers.get("Last-Modified")
    if event_time:
        return time.mktime(time.strptime(event_time, "%a, %d %b %Y %H:%M:%S %Z"))
    else:
        return 0

def format_data(res):
    data = []
    for item in res :
        print("test")



if __name__ == '__main__':
    define_producer()
    