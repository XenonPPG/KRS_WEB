URL = https://raw.githubusercontent.com/XenonPPG/KRS_JWT/refs/heads/master/app/docs/swagger.json

DOC_DIR = docs

SWAGGER_FILE = swagger.json
SWAGGER_PATH = $(DOC_DIR)/$(SWAGGER_FILE)

DOC_FILE = swagger.md
DOC_PATH = $(DOC_DIR)/$(DOC_FILE)

generate-api:
	if not exist $(DOC_DIR) mkdir $(DOC_DIR)
	curl -fSL -o $(SWAGGER_PATH) $(URL)
	npx swagger-typescript-api generate -p $(SWAGGER_PATH) -o ./src/api/gen

make-readme:
	if not exist tmp mkdir tmp
	widdershins $(SWAGGER_PATH) -o $(DOC_PATH)
	npx node ./utils/MakeReadME.js $(DOC_PATH) ./README.md 24

.PHONY: generate-api, make-readme