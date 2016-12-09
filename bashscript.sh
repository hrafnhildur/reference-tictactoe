#!/bin/bash

# - npm build
# - build a docker image which includes the build output - not including node-modules.
# - runs npm install for the server.

echo Cleaning...
rm -rf ./build 	#removes old build file

# on commit: fetches the commit-message and tags the image with it.
if [ -z "$GIT_COMMIT" ]; then
  export GIT_COMMIT=$(git rev-parse HEAD)
  export GIT_URL=$(git config --get remote.origin.url)
fi

# Remove .git from url in order to get https link to repo (assumes https url for GitHub)
export GITHUB_URL=$(echo $GIT_URL | rev | cut -c 5- | rev)


echo Building app
npm run build 	# run build....

rc=$?
if [[ $rc != 0 ]] ; then # if build fails, display message
    echo "Npm build failed with exit code " $rc
    exit $rc
fi

mkdir build # create a new build directory

# put the tag on last commit in a temporary txt-file
cat > ./build/githash.txt <<_EOF_
$GIT_COMMIT
_EOF_

mkdir build/public
cat > ./build/public/version.html << _EOF_ 	#html doc created
<!doctype html>
<head>
   <title>App version information</title>
</head>
<body>
   <span>Origin:</span> <span>$GITHUB_URL</span>
   <span>Revision:</span> <span>$GIT_COMMIT</span>
   <p>
   <div><a href="$GITHUB_URL/commits/$GIT_COMMIT">History of current version</a></div>
</body>
_EOF_

# copy the Dockerfile, package.json and the helperscript into the build dir
cp ./Dockerfile ./build/
cp ./package.json ./build/
cp docker-run.sh ./build/

cd build
echo Building docker image

sudo docker build -t hrafnhildurs/tictactoe . # build the docker image

rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker build failed " $rc #display message on failure
    exit $rc
fi

sudo docker push hrafnhildurs/tictactoe #push the image and display msg if failure
rc=$?
if [[ $rc != 0 ]] ; then
    echo "Docker push failed " $rc
    exit $rc
fi

echo "Done"
