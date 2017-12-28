# github初使用

git基本命令行[参考这里](https://www.jianshu.com/p/fb5864582b59)

## clone远程已有的仓库到本地
clone时选择ssh协议，https协议需要每次输入账号密码，[ssh key生成以及常见问题](https://help.github.com/articles/connecting-to-github-with-ssh/)，配置好ssh key之后打开终端进行操作。

*参考命令行如下*
```
git clone <ssh协议的github项目地址>  克隆项目
```
*ssh协议的github项目地址*在github要clone的项目页面复制

```
git status  查看当前git状态
git add .  提交所有修改到暂存区
git add -u  提交修改和删除的文件，不提交新文件(git add --update的缩写)
git add -A 提交所有变化(git add --all的缩写)

git checkout -- <file>  撤销对file文件的修改
git checkout -- . 撤销上次commit之后所有的修改

git pull  把远程仓库的更新合并到本地仓库，可以在本地push前执行。当别人和自己修改同一个文件的同一个地方后执行git pull的时候会出现冲突，需手动解决。

git commit -am "add" 将暂存区文件提交到本地仓库，也可以分开写-a -m，已经被追踪的(tracked)文件再次修改后commit时，可以不用加-a，不加-m会自动用vim打开一个文件用以填写注释，-m "xxx"引号中的文字即为注释。注释不写会提示Aborting commit due to empty commit message.
git reset HEAD <file>  将已存入暂存区的file文件unstage
git reset HEAD .  将已存入暂存区的所有文件unstage
git push origin master  将本地仓库push到远程仓库，origin为远程仓库地址的别名，可通过git remote自定义，master为远程仓库origin的master分支
```

## 本地创建仓库和文件推送到远程空项目中
1. 在线上先创建一个新项目，用于获取线上仓库地址
2. 在本地常见文件夹，并初始化为git仓库
3. 使用线上仓库地址在本地仓库中添加远程仓库标签，用于推送本地仓库到线上
4. 使用git命令在本地仓库中创建文件
5. 推送本地仓库到线上

*参考命令行如下*
```
git init  将新建的仓库文件夹初始化本地git仓库
git remote add <远程仓库地址别名> <远程仓库地址>  给远程仓库的地址起一个别名，起完别名之后用git push命令将本地库推送到远程库，不起别名直接用远程库的地址也是可以的
git remote -v  查看本地仓库存储的远程库的地址信息
git remote remove origin  删除origin标签(别名)，也即删除本地仓库的origin对应的远程仓库的地址
git remote set-url origin <远程仓库地址>  修改origin对应的远程仓库的地址
git remote rename origin <新别名>  重命名origin标签

git branch <分支名>  创建一个新的分支
git checkout -b <分支名>  创建并切换到新创建的分支
git checkout <分支名>  切换到分支
git merge <分支名>  例如当前所在分支为master，<分支名>为a，命令含义为：把a分支上的内容合并到master分支上来。
```
