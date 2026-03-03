URL = https://raw.githubusercontent.com/XenonPPG/KRS_JWT/refs/heads/master/app/docs/swagger.json
DOC_FILE = swagger_temp.json
DOC_PATH = tmp/$(DOC_FILE)

generate-api:
	if not exist tmp mkdir tmp
	curl -fSL -o $(DOC_PATH) $(URL)
	npx swagger-typescript-api generate -p $(DOC_PATH) -o ./src/scripts/api
	del /f /q tmp\$(DOC_FILE)

.PHONY: generate-api