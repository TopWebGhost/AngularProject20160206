Make sure your sass command available, otherwise take help from this link
http://sass-lang.com/install

Change directory to styles\
>cd ....styles

For development and watch continuously:
>sass --watch sass/base.scss:app.css --style compressed

For compressed css in production:
>sass sass/base.scss:app.css --style compressed