default:
	python get-ip-address.py $(IP)
	make build
	make run $(IP)

build:
	docker-compose build

run:
	python get-ip-address.py $(IP)
	docker-compose up
	docker-compose exec front bash -c "yarn; bash"


down:
	docker-compose down

stop:
	make down