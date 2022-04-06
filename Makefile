install:
	docker compose run node npm install
run:
	docker compose run node npx ts-node ./src/update.ts