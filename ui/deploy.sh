sudo ng build --prod --aot

sudo aws s3 rm s3://andrewpossardt.com --recursive

sudo aws s3 cp ./dist/ui s3://andrewpossardt.com --recursive --acl public-read
