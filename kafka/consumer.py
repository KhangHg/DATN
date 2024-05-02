import os
from kafka import KafkaConsumer
import json
KAFKA_BOOTSTRAP_SERVERS = os.environ.get("KAFKA_BOOTSTRAP_SERVERS", "localhost:29093")
KAFKA_TOPIC_TEST = os.environ.get("KAFKA_TOPIC_TEST", "enriched")
KAFKA_API_VERSION = os.environ.get("KAFKA_API_VERSION", "7.3.1")


consumer = KafkaConsumer(
    KAFKA_TOPIC_TEST,
    bootstrap_servers=[KAFKA_BOOTSTRAP_SERVERS],
    api_version=KAFKA_API_VERSION,
    auto_offset_reset="earliest",
    enable_auto_commit=True,
)
def replace_tabs_with_spaces(input_string):
    # Sử dụng phương thức replace để thay thế '\t' bằng ' '
    modified_string = input_string.replace('\t', ' ')
    return modified_string

for message in consumer:
    data = message
    data = message.value.decode("utf-8")
    data = replace_tabs_with_spaces(data)
    print("\n" + data)


