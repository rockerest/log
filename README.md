#log

A Public Log File

##Getting Started

Before you do anything in the repo:

- you will need to install [Node.js](http://nodejs.org/) **and** the [Node Package Manager](https://www.npmjs.com/).

    Sometimes NPM doesn't install alongside Node, sometimes it does. Your mileage may vary (typically depending on the mechanism by which you get Node).

    If you use \*nix, `node` is **not** the correct package in your [distribution's repositories](http://packages.ubuntu.com/lucid/node); you need to install `nodejs`.

    Sometimes the `node` command is not registered properly. This usually depends on the mechanism by which you installed Node. If `node -v` just isn't a command on your system, you can [try this](http://stackoverflow.com/a/18130296/597122). In most cases, all you need to do is `sudo ln -s /usr/bin/nodejs /usr/bin/node`. For Windows users, make sure the install directory for `node` is in your system `%PATH%`.

- you will need to install [Grunt](http://gruntjs.com/getting-started) globally  

    Run this command in your terminal:  
    `sudo npm install -g grunt-cli`

- you will need to install the application dependencies and manipulate them as needed  

    Run this command in your terminal:  
    `grunt setup`


## Building the log

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
