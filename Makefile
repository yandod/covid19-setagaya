install:
	docker compose run node npm install
run:
	docker compose run node npx ts-node --files ./src/update.ts
tweet:
	docker compose run node npx ts-node --files ./src/tweet.ts