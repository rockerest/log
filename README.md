#log    

A Public Log File

##Getting Started

Before you do anything in the repo:

- you will need to install the [Sass Rubygem](https://rubygems.org/gems/sass).  

    If you use *nix and Aptitude, this is sometimes as easy as `sudo apt-get install rubygems; sudo gem install sass`. It is unlikely it will be this easy for you.

    Some people like to use a [version manager](http://rvm.io/) to keep conflicting Ruby versions from interacting, and to install Ruby that way, then install Gems normally.

- you will need to install [Node.js](http://nodejs.org/) **and** the [Node Package Manager](https://www.npmjs.com/).

    Sometimes NPM doesn't install alongside Node, sometimes it does. Your mileage may vary (typically depending on the mechanism by which you get Node).
    
    If you use \*nix, `node` is **not** the correct package in your [distribution's repositories](http://packages.ubuntu.com/lucid/node); you need to install `nodejs`.
    
    Sometimes the `node` command is not registered properly. This usually depends on the mechanism by which you installed Node. If `node -v` just isn't a command on your system, you can [try this](http://stackoverflow.com/a/18130296/597122). In most cases, all you need to do is `sudo ln -s /usr/bin/nodejs /usr/bin/node`. For Windows users, make sure the install directory for `node` is in your system `%PATH%`.
    
- you will need to install Bower and Grunt globally  

    Run these commands in your terminal:  
    `sudo npm install -G grunt`  
    `sudo npm install -G grunt-cli`  
    `sudo npm install -G bower`  

- you will need to install the application dependencies and manipulate them as needed  

    Run these commands in your terminal:  
    `npm install`  
    `grunt setup`


## Building the log

As it is, log comes with exactly one post, with nothing in it.  
The following steps are necessary to compile the application:  
`grunt parsePosts`

## Writing content

Writing a new post requires three easy steps:  

1. Write the content  
  - Posts are stored in `src/content/posts`
  - Posts are written in HTML
2. Update the index
  - The application needs index information for each post
  - The index is located at `src/content/data/index.json`
  - The fields required are `title`, `safeTitle`, `published`, `author`, and `link`
    - `safeTitle` should match the filename of the HTML post and be URL friendly.
    - `published` can be in the future and the post will not appear in the application until the designated time.
    - `link` is a link relating to the author. Clicking on the author will take a user to the link.
3. Rebuild the application with the new content
  - re-run the parse command: `grunt parsePosts`

Generally, the Grunt task to build the post content and compile the application will halt the build if a major error is detected with content or the index. Harmless mismatches will be reported without causing failure, and breaking issues will cause the task to fail.
