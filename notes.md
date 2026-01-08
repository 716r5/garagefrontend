Hi, read this ad description.md before starting off editing this codebase. It is a collection of things to be careful of or to utilise as you embark on this website. Hopefully, this is helpful to you and you are a little less lost than me about the code base as compared to when I saw this for the first time. I like to think the information on here is all accurate but a bunch of things espeically about the use of certain softwares or pratices are my thoughts rather than the best pratices because I did not actively try to stay neutral in here.

General testing metrics
- npm run build 2>&1 | head -50
usually erros are on the last few lines so we check last 50 lines to see if any error pops out 

Using AI on this codebase
- Feel free to use it, however we do have a backend and there is a log in page being implemented which means data leakage is an issue, you need to ensure basic practices to ensure the site wont be hacked i.e. no data breaches, data loss, or security concerns for your clients or the systems.
- AI creates a lot of components via scratch which is pretty counter-intutive when you have tech like chakra ui, gsap, FxTS, stencilJS, animejs and so many many more, if you wanna know what we use check out description.md
- Also imagine trying to write a book in a language you don't know, then using a translator to translate the words back to english to cross check that the contents are correctly written, the concept works doesn't it? but if you have ever tried it out, you know how many things the translator doesn't account for - such as the grammer, punctuation, hieracchy, context and so much more - yeah, that's what it is like writting code with AI and only relying on the website to see what it looks like.
- I generally assume my team is competent and am aware of their issues over call/delegating tasks


Websites to chekc out, if you want to implement a new feature and don't want to do it via scratch 
- https://bestofjs.org/
- https://kinsta.com/blog/javascript-libraries/ 

Stuff you should know but won't know if this is your first time with a website 
- do not push node modules (huge repo size, slow pulls and pushes, horrible merges)
- it's ok to not understand th dev docs, yes they don't make sense at first but if you push through the first 5 chapters/components, things start to piece together after which you generally know what to look for to solve your specific probelms, don't read the docs like a book though - that is counter productive (lol!)

things i'd do differently if i were doing this code base all over again 
- break the pr into meaningful commits which clearly display the authors intent. the commits should build up like a story and the commit messages give a meaningful description of intent for each chapter. (copied off of the internet but sometimes when i didn't like the changes made to the website it was hard to fix bc 20+ files had been touched each push)