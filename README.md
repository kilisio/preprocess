# ABOUT

<!-- ## Homepage -->


## Description
This is a simple `JavaScript` HTML and CSS preprocessor.  
This was originally a fork of `https://github.com/krasimir/absurd.git` before I personalized it.


<!-- ## Features -->


<!-- ## Core Dependancies -->


<!-- ## Inspirations -->


<!-- ## Screen Shots -->


# INSTALLATION


<!-- ## Prerequisites -->


## Install
I do not intend to publish this package to the `npm` package registry. If you have `verdaccio` installed in your system simply:

```bash
    git clone -b forked_dev https://github.com/kilisio/preprocess.git
    cd preprocess
    npm install
    npm run dist
    npm run pub_lib
```

The above will publish the package to `verdaccio` if you have it configured as your default package publishing registry.  
Then simply install and add it to your project script:

```bash
    npm install @kilisio/preprocess
```

```javascript
    import preprocess from '@kilisio/preprocess';
```

The package scope `@kilisio` and other package details may be changed and configured in the `lib.config.js` script before building the library.


## Usage

```javascript
var test_html = {
    div: 'hello world'
};

var test_css = {
    div:{
        margin: 0,
        padding: 0,
        position: 'absolute',
        width: '224px',
        height: '30px',
		'background-color': '#1a0a00',
		'padding-left': '5px',
        '.ul_nav': {
			margin: 0,
			padding: 0,
			'list-style': 'none'
		},
        '.ul_nav li': {
			margin: 0,
			padding: 0,
			display: "inline"
		},
        '.link_group': {
            margin: 0,
            padding: 0,
            display: 'inline-block',
			':hover':{
                '.link_nav': {
                    color: '#ff6600'
                },
                '.nav_img': {
                    filter: 'invert(92%) sepia(13%) saturate(682%) hue-rotate(311deg) brightness(107%) contrast(101%)'
                },
                '.nav_img_bg': {
                    'background-color': '#1a0a00'
                }
			}
        },
        '.nav_img_bg': {
			margin: 0,
			padding: 0,
			width: '30px',
			height: '30px',
			'margin-right': '3px',
			'background-color': '#fff0e6',
			display: 'inline-block',
			'border-radius': '50%',
			'vertical-align': 'middle'
		},
        '.nav_img': {
			margin: '6px',
			padding: 0,
			width: '18px',
			height: '18px',
            filter: 'invert(6%) sepia(76%) saturate(641%) hue-rotate(345deg) brightness(95%) contrast(104%)'
		},
        '.link_nav': {
			margin: 0,
			padding: 0,
			'text-decoration': 'none',
			color: '#fff0e6',
			'font-family': 'forced_squaremedium',
			'font-size': '28px',
			'margin-right': '3px',
			'vertical-align': 'middle',
            outline: 'none',
            ':active :focus': {
                outline: 'none'
            }
		}
    }
};


// var test_component = {
//    html: test_html,
//    css: test_css
// };

preprocess(function(api){
    api.add(test_css).compile(function(err, result){
        console.log(result);
    });
    api.morph('html').add(test_html).compile(function(err, result){
        console.log(result);
    });
    // api.morph('component').add(test_component).compile(function(err, result){
    //     console.log(result);
    // });
});

```
output:  
```
div, div .ul_nav, div .ul_nav li, div .link_group, div .nav_img_bg, div .link_nav {
  margin: 0;
}
div, div .ul_nav, div .ul_nav li, div .link_group, div .nav_img_bg, div .nav_img, div .link_nav {
  padding: 0;
}
div {
  position: absolute;
  width: 224px;
  padding-left: 5px;
}
div, div .nav_img_bg {
  height: 30px;
}
div, div .link_group:hover .nav_img_bg {
  background-color: #1a0a00;
}
div .ul_nav {
  list-style: none;
}
div .ul_nav li {
  display: inline;
}
div .link_group, div .nav_img_bg {
  display: inline-block;
}
div .link_group:hover .link_nav {
  color: #ff6600;
}
div .link_group:hover .nav_img {
  filter: invert(92%) sepia(13%) saturate(682%) hue-rotate(311deg) brightness(107%) contrast(101%);
}
div .nav_img_bg {
  width: 30px;
  background-color: #fff0e6;
  border-radius: 50%;
}
div .nav_img_bg, div .link_nav {
  margin-right: 3px;
  vertical-align: middle;
}
div .nav_img {
  margin: 6px;
  width: 18px;
  height: 18px;
  filter: invert(6%) sepia(76%) saturate(641%) hue-rotate(345deg) brightness(95%) contrast(104%);
}
div .link_nav {
  text-decoration: none;
  color: #fff0e6;
  font-family: forced_squaremedium;
  font-size: 28px;
}
div .link_nav, div .link_nav:active :focus {
  outline: none;
}

<div>hello world</div>
```

<!-- # DOCUMENTATION -->


<!-- # CONTRIBUTION -->


<!-- ## Features, Issues and Fixes -->


<!-- ## Author -->


<!-- ## Contributors -->


<!-- ## Backers -->


<!-- ## Sponsors -->


<!-- # ATTRIBUTION -->


<!-- # SUPPORT -->


# LICENSE
Copyright © 2019 Patrick Kilisio.
This project is MIT licensed.

