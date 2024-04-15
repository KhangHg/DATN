import os
from kafka import KafkaConsumer
import json
KAFKA_BOOTSTRAP_SERVERS = os.environ.get("KAFKA_BOOTSTRAP_SERVERS", "localhost:29093")
KAFKA_TOPIC_TEST = os.environ.get("KAFKA_TOPIC_TEST", "bad")
KAFKA_API_VERSION = os.environ.get("KAFKA_API_VERSION", "7.3.1")

consumer = KafkaConsumer(
    KAFKA_TOPIC_TEST,
    bootstrap_servers=[KAFKA_BOOTSTRAP_SERVERS],
    api_version=KAFKA_API_VERSION,
    auto_offset_reset="earliest",
    enable_auto_commit=True,
)
for message in consumer:
    data = message
    data = message.value.decode("utf-8")
    data = json.dumps(data, indent=4)
    print("\n" + str(data))


