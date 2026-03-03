URL = https://raw.githubusercontent.com/XenonPPG/KRS_JWT/refs/heads/master/app/docs/swagger.json
DOC_FILE = swagger_temp.json

generate-api:
	@echo "Downloading swagger spec..."
	mkdir -p tmp
	curl -fSL -o tmp/$(DOC_FILE) $(URL)
	npx swagger-typescript-api -p $(DOC_FILE) -o ./src/api
	rm $(DOC_FILE)

.PHONY: generate-api