default:
	python get-ip-address.py $(IP)
	make run $(IP)

build:
	docker-compose build

run:
	python get-ip-address.py $(IP)
	docker-compose up

down:
	docker-compose down

stop:
	make down