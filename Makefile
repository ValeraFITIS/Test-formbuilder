.PHONY: up build-prod test down clean-docker

up:
	docker-compose up -d && docker-compose logs -f react_app

build-prod: 
	docker-compose run --rm react_app npm run prod

test:
	docker-compose run --rm react_app npm run test

down:
	docker-compose stop

clean-docker:
	docker system prune --all --volumes