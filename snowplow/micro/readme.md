B1: tạo một thư mục mới tên micro trong folder code của bạn, rồi đặt tất cả các file này trong folder đó

B2: chạy lệnh "docker run -d --mount type=bind,source=C:/Users/Acer/Code/IT4409_Web/snowplow/micro/config,destination=/config -p 9090:9090 --name tracker-shop snowplow/snowplow-micro:2.0.0 --collector-config /config/micro.conf --iglu /config/iglu.json "

- micro chạy ở cổng 9090

Enrich : docker run -p 9090:9090  --mount type=bind,source=C:/Users/Acer/Code/IT4409_Web/frontend/micro/config/my-enrichments,destination=/config/enrichments snowplow/snowplow-micro:2.0.0



docker run -it --rm -v enrich:/snowplow snowplow/snowplow-enrich-kafka:4.1.0 --enrichments /snowplow/enrichments --iglu-config /snowplow/resolver.json --config /snowplow/config.hocon


docker exec -it my-postgres psql -U postgres igludb
SELECT * FROM iglu_schemas;