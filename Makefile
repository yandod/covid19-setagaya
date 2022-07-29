install:
	docker compose run node npm install
	docker compose run python pip install japanize-matplotlib pandas --user
run:
	docker compose run node npx ts-node --files ./src/update.ts
tweet:
	docker compose run node npx ts-node --files ./src/tweet.ts
charts:
	docker compose run python python ./src/chart.py