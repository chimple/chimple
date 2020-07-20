### bahama
 
For setting up:
mkdir -p sdcard/bahama
cd sdcard/bahama
git clone https://github.com/chimple/hi.git
git clone https://github.com/chimple/hi-maths.git
git clone https://github.com/chimple/en.git
git clone https://github.com/chimple/en-maths.git

Install node.js from https://nodejs.org/en/
npm install http-server

In assets/scripts/lib/globals.js,
change:
    window.SIMULATOR_ROOT_DIR = '/sdcard/bahama/'

    to

    window.SIMULATOR_ROOT_DIR = 'your_directory/sdcard/bahama/'


When you start Cocos Creator:
cd sdcard/bahama
http-server -p 8901


Some common operations:
for i in *.jpg; do echo "${i}"; sips -s format png "${i}" --out "${i%jpg}png"; done
for i in *.png; do echo "${i}"; sips --resampleHeight 273  "${i}"; done
for i in *.png; do echo "${i}"; sips --cropToHeightWidth 273 370  "${i}"; done
for i in en/*/res/*.json; do echo $i; sed 's/^[[:space:]]*\[//g' $i | sed 's/[[:space:]]*\],*$//g' > ~/Downloads/bahama-xx/`basename $i`; done
for i in *.json; do mv $i "${i%json}csv"; done

To zip files:
for i in *(en|hi|en-maths|hi-maths); do cd $i; git checkout master; git pull origin master; cd ..; done
for i in *(en|hi|en-maths|hi-maths); do cd $i; for j in */; do zip -r "${j%?}" "${j%?}"; done; cd ..; done
for i in *(en|hi|en-maths|hi-maths); do mkdir -p hosting/public/$i; mv $i/*.zip hosting/public/$i; done

To copy subpackages:
for i in *(en|hi|en-maths); do mkdir -p bahama/build/jsb-default/subpackages/$i; cp -R $i/* bahama/build/jsb-default/subpackages/$i; done


To debug on device:
adb forward tcp:6086 tcp:6086
devtools://devtools/bundled/inspector.html?v8only=true&ws=127.0.0.1:6086/00010002-0003-4004-8005-000600070008

To hot update:
Click on Build->Build
node version_generator.js -v 1 -u http://localhost:8901/bahama/hot-update/ -s build/jsb-default -d hot-update/
cp -R build/jsb-default/res hot-update
cp -R build/jsb-default/src hot-update

To run debug and test hot update:
adb reverse tcp:8901 tcp:8901
for i in *(en|hi|en-maths); do for j in $i/*/; do node version_generator.js -v 2 -u http://localhost:8901/$j -s $j -d $j -f res; done; done
//find . -name project.manifest | cpio -pdm bahama/build/jsb-default/subpackages 

To hot update (in prod/test):
Click on Build->Build

set -k
setopt INTERACTIVE_COMMENTS
# set constants
lang='hi'
env='stage'
langs="(en|en-maths|$lang)"
# srvr='https://chimple-ee1ed.web.app'
srvr="https://bahama-${lang}-${env}.web.app"
hotupd='content/hot-update'
content='content'
courses='courses'
# web='../hosting/public'
web="../lang/bahama-${lang}-${env}/public"
# generate hot update for build-stage-b2c
node scripts/version_generator.js -u $srvr/hot-update/ -s build-stage-b2c/jsb-default -d $hotupd
cp -R build-stage-b2c/jsb-default/res $hotupd
cp -R build-stage-b2c/jsb-default/src $hotupd
# generate hot update for content
cd $content
for i in courses/${=~langs}; do for j in $i/*/; do node ../scripts/version_generator.js -u $srvr/$j -s $j -d $j -f res; done; done
#for i in courses/${=~langs}/story; do for j in $i/*/; do node ../scripts/version_generator.js -u $srvr/$j -s $j -d $j -f res; done; done
# zip content files
for i in courses/${=~langs}; do cd $i; for j in */; do if [ $j != "story/" ]; then echo "${j%?}"; rm "${j%?}.zip"; zip -r "${j%?}" "${j%?}"; fi; done; cd ../..; done
#for i in courses/${=~langs}/story; do cd $i; for j in */; do rm "${j%?}.zip"; zip -r "${j%?}" "${j%?}"; done; cd ../../..; done
cd ..
# copy hot update and zip content to hosting
rm -rf $web/hot-update; mkdir -p $web/hot-update; cp -R $hotupd $web
cd $content
for i in courses/${=~langs}; do mkdir -p ../$web/$i; for j in $i/*/; do cp -R ${j%?} ../$web/$i; done; done
#for i in courses/${=~langs}/story; do mkdir -p ../$web/$i; for j in $i/*/; do cp -R ${j%?} ../$web/$i; done; done
for i in courses/${=~langs}; do cp $i/*.zip ../$web/$i; done
#for i in courses/${=~langs}/story; do cp $i/*.zip ../$web/$i; done
cd ..

For school mode:
for i in content/courses/(en|hi|en-maths); do mkdir -p build/jsb-default/subpackages/`basename $i`; for j in $i/*/; do cp -R ${j%?} build/jsb-default/subpackages/`basename $i`; done; done

For web mode:
In globals.js, COURSES_URL='https://chimple-ee1ed.web.app/courses/' 
Build 'web-desktop' 
cp -R build/web-desktop/* $web/

For prod build:
mkdir -p build/jsb-default/subpackages/en
cp -R content/courses/en/common build/jsb-default/subpackages/en
cp -R content/courses/en/drawshape build/jsb-default/subpackages/en
cp -R content/courses/en/letterpair build/jsb-default/subpackages/en
cp -R content/courses/en/pictureboard build/jsb-default/subpackages/en

mkdir -p build/jsb-default/subpackages/hi
cp -R content/courses/hi/common build/jsb-default/subpackages/hi
cp -R content/courses/hi/drawshape build/jsb-default/subpackages/hi
cp -R content/courses/hi/letterpair build/jsb-default/subpackages/hi
cp -R content/courses/hi/pictureboard build/jsb-default/subpackages/hi

mkdir -p build/jsb-default/subpackages/en-maths
cp -R content/courses/en-maths/common build/jsb-default/subpackages/en-maths
cp -R content/courses/en-maths/taprise build/jsb-default/subpackages/en-maths
cp -R content/courses/en-maths/matchingcard build/jsb-default/subpackages/en-maths
cp -R content/courses/en-maths/numberpair build/jsb-default/subpackages/en-maths
cp -R content/courses/en-maths/shapetractor build/jsb-default/subpackages/en-maths

Prod build only essentials
mkdir -p build/jsb-default/subpackages/en
cp -R content/courses/en/common build/jsb-default/subpackages/en
cp -R content/courses/en/drawshape build/jsb-default/subpackages/en
cp -R content/courses/en/letterpair build/jsb-default/subpackages/en
cp -R content/courses/en/pictureboard build/jsb-default/subpackages/en

mkdir -p build/jsb-default/subpackages/hi
cp -R content/courses/hi/common build/jsb-default/subpackages/hi

mkdir -p build/jsb-default/subpackages/en-maths
cp -R content/courses/en-maths/common build/jsb-default/subpackages/en-maths

Renaming:
from='wordwindow'
to='questionboard'
mv common/res/icons/${from}.png common/res/icons/${to}.png
mv ${from}/res/${from}.json ${from}/res/${to}.json
mv ${from} ${to}