SWAGGER_URL = https://raw.githubusercontent.com/XenonPPG/KRS_JWT/refs/heads/master/app/docs/swagger.json
COMMON_MD_URL = https://raw.githubusercontent.com/XenonPPG/KRS_CONTRACTS/refs/heads/master/common/common.md

DIR = ./tmp

SWAGGER_FILE = swagger.json
SWAGGER_PATH = $(DIR)/$(SWAGGER_FILE)

COMMON_MD_FILE = common.md
COMMON_MD_PATH = $(DIR)/$(COMMON_MD_FILE)
DESCRIPTION_MD = ./res/description.md

SWAGGER_PATH_W = $(subst /,\,$(SWAGGER_PATH))
COMMON_MD_PATH_W = $(subst /,\,$(COMMON_MD_PATH))
DESCRIPTION_MD_W = $(subst /,\,$(DESCRIPTION_MD))
DIR_W = $(subst /,\,$(DIR))

generate-api:
	if not exist $(DIR_W) mkdir $(DIR_W)
	curl -fSL -o $(SWAGGER_PATH) $(SWAGGER_URL)
	npx swagger-typescript-api generate -p $(SWAGGER_PATH) -o ./src/api/gen

make-readme:
	if not exist $(DIR_W) mkdir $(DIR_W)
	curl -fSL -o $(COMMON_MD_PATH) $(COMMON_MD_URL)
	copy /b $(DESCRIPTION_MD_W) + $(COMMON_MD_PATH_W) README.md
	del $(COMMON_MD_PATH_W)


.PHONY: generate-api, make-readme