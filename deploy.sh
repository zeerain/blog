#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# deploy to github
# 如果是发布到自定义域名
echo 'blogs.zeerain.cn' > CNAME
if [ -z "$GITHUB_TOKEN" ]; then
  git config --global user.name "zeerain"
  git config --global user.email "zhaorui125@qq.com"
  msg='deploy'
  githubUrl=git@github.com:zeerain/blog.git
else
  msg='来自github action的自动部署'
  githubUrl=https://zeerain:${GITHUB_TOKEN}@github.com/zeerain/blog.git
  git config --global user.name "zeerain"
  git config --global user.email "zhaorui125@qq.com"
fi

git init
git add -A
git commit -m "${msg}"

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f $githubUrl master:gh-pages # 推送到github

cd -
rm -rf docs/.vuepress/dist