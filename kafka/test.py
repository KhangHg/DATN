# Import necessary PySpark modules
import pyspark
from pyspark.sql import SparkSession
from pyspark import SparkConf
from pyspark.sql.functions import col, when

# Create a Spark session
spark = SparkSession.builder \
    .appName("PySpark Example") \
    .getOrCreate()

# Sample data (you can replace this with your own dataset)
data = [
    ("Alice", 34),
    ("Bob", 51),
    ("Charlie", 29),
    ("David", 62),
    ("Eva", 41)
]

# Define the schema for the DataFrame
schema = ["name", "age"]

# Create a DataFrame from a list of tuples and schema
df = spark.createDataFrame(data, schema)

# Show the content of the DataFrame
print("Original DataFrame:")
df.show()

# Example operations:
# 1. Filtering data based on a condition
filtered_df = df.filter(df["age"] > 40)
print("Filtered DataFrame:")
filtered_df.show()

# 2. Adding a new column based on a condition
df_with_category = df.withColumn("category", when(df["age"] < 40, "Young").otherwise("Old"))
print("DataFrame with category column:")
df_with_category.show()

# 3. Aggregating data using groupBy and performing a count
age_counts = df.groupBy("category").count()
print("Age counts by category:")
age_counts.show()

# Stop the Spark session
spark.stop()
