import logging
from pyspark.sql import SparkSession
from pyspark.sql.functions import from_json, col
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, LongType, TimestampType

def create_spark_session():
    try:
        spark = SparkSession.builder \
            .appName("KafkaToMongoDB") \
            .master("local[*]") \
            .config("spark.jars.packages", "org.apache.spark:spark-sql-kafka-0-10_2.12:3.5.0,org.mongodb.spark:mongo-spark-connector_2.12:3.0.1") \
            .config("spark.mongodb.input.uri", "mongodb://localhost:27017/SparkDataStreaming") \
            .config("spark.mongodb.output.uri", "mongodb://localhost:27017/SparkDataStreaming") \
            .getOrCreate()
        
        spark.sparkContext.setLogLevel("ERROR")
        logging.info("Spark session created successfully!")
        return spark
    except Exception as e:
        logging.error(f"Couldn't create the Spark session due to exception: {e}")
        return None

def read_from_kafka(spark, topic):
    try:
        schema = StructType([
            StructField("key", StringType(), False),
            StructField("value", StringType(), False),
            StructField("topic", StringType(), False),
            StructField("partition", IntegerType(), False),
            StructField("offset", LongType(), False),
            StructField("timestamp", TimestampType(), False),
            StructField("timestampType", IntegerType(), False)
        ])
        
        kafka_df = spark.readStream \
            .format("kafka") \
            .option("kafka.bootstrap.servers", "localhost:29093,localhost:29092") \
            .option("subscribe", topic) \
            .option("startingOffsets", "earliest") \
            .load()
        
        kafka_df= kafka_df.select(col("value").cast("string"))
        kafka_df.printSchema()
        kafka_df.show()

        print("test")
        # query = kafka_df.select("CAST(key AS STRING)", "CAST(value AS STRING)") \
        #             .writeStream \
        #             .format("console") \
        #             .outputMode("append")\
        #             .start()
        # query.awaitTermination()

        # return query
    except Exception as e:
        logging.error(f"Error reading from Kafka: {e}")
        return None

def write_to_mongodb(df, collection_name):
    try:
        def write_mongo(batch_df, batch_id):
            batch_df.write \
                .format("mongo") \
                .mode("append") \
                .option("uri", "mongodb://localhost:27017") \
                .option("database", "SparkDataStreaming") \
                .option("collection", collection_name) \
                .save()
        
        df.writeStream \
            .foreachBatch(write_mongo) \
            .start() \
            .awaitTermination()
    except Exception as e:
        logging.error(f"Error writing to MongoDB: {e}")

if __name__ == "__main__":
    # Tạo Spark Session
    spark = create_spark_session()
    
    if spark:
        # Đọc dữ liệu từ Kafka
        kafka_topic = "enriched"
        kafka_df = read_from_kafka(spark, kafka_topic)
        
        # if kafka_df:
        #     # Ghi dữ liệu vào MongoDB
        #     mongodb_collection_name = "productEvent"
        #     write_to_mongodb(kafka_df, mongodb_collection_name)
        # else:
        #     logging.error("Failed to read data from Kafka.")
    else:
        logging.error("Failed to create Spark session.")
