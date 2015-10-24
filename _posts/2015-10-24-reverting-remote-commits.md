---
layout: post
title: "Reverting a commit on a remote."
date: 2015-10-24 11:40:00
categories: 
---

### Resetting remote commits - then Recovering Reset Hard commit
If you want to remove a commit on remote, because you've reset --hard to an earlier commit, 

You want to discard all changes done after commit `<commit-hash>` do:

`git reset --hard <commit-hash>`
` git push -f origin master`

You're going to lose your local commits if you've already committed. To recover recently deleted commits before garbage collection gets it, use:

`git fsck --cache --no-reflogs --lost-found --unreachable  HEAD`

Now you want to checkout the state of each file using:

`git show <commit-hash>`

Now you want to `reset --hard` to the `<commit-hash>` that you found. Push your changes to remote.