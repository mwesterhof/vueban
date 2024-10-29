PROFILE = vue
BUCKET = s3://vue-muckery

clean:
	rm -rf dist

use:
	nvm use 20.18.0

serve:
	yarn serve

build:
	yarn build

deploy: build
	cd dist; aws s3 cp --acl public-read --profile ${PROFILE} --recursive . ${BUCKET}
