# Windows Installfest

## Installing the Windows Subsystem for Linux (WSL)
- Press the Windows key and search for `Windows features` and select `Turn Windows features on and off`.

- Scroll down and find `Windows Subsystem for Linux` and make sure it's checked, then press OK. Restart the system when prompted to.

- Next, go to the Windows store and search for `Ubuntu` and install it.

- Launch Ubuntu from the start menu. Enter your Linux username and password, and make a note of it (they are needed later). Under no circumstances should you leave these blank or cancel the process, as this will run your Linux installation as a root user which causes permission warnings later on and also poses a significant security risk to your system.
  - Do not forget your Linux password. It is needed for admin operations in the WSL environment.
  
- Note: Right-clicking on the WSL window pastes whatever is in your clipboard. This can save you some time when running the longer commands here.

## Symlinking a Windows workspace folder into your WSL home
- **Warning**: Your WSL files are stored in a separate file system managed by WSL with a different, stricter and more fine-grained permission system than Windows. You should never edit any WSL files from Windows itself, as there is a non-trivial risk of corrupting your entire WSL installation. However, editing Windows files from WSL is perfectly fine. Thus, we can integrate the two systems (WSL and Windows) by making sure that your working folders live in Windows and are conveniently accessible from WSL.

- Create a `projects` folder from your Windows user account home directory. For example, go to `C:\Users` in Explorer and go into the folder corresponding to your user name. Create a folder named `projects` here. For example, if your home directory is C:\Users\Bobby Tan, create the directory `C:\Users\Bobby Tan\projects`. All projects should be created in this folder so that you can safely browse or edit the files from both WSL and Windows.

- Next, symlink it by opening a WSL window and running the following commands in order
  - `cd ~`
  - `ln -s /mnt/c/Users/Bobby\ Tan/projects ./projects`

- From now on, you will be able to access the projects folder in your WSL installation as if it were a directory in it.

## Github
Run the following commands in order in a WSL terminal.

- `sudo apt install git`
- `git config --global credential.helper cache` This will cache your git credentials for a short time after you enter it.
- If you wish to extend the amount of time for which your git credentials are cached, run `nano ~/.gitconfig` and edit the line `helper = cache` to `helper = cache --timeout=86400`. The number after `--timeout=` refers to the cache duration in seconds, so the previous line would cache your credentials for 1 day.

## Install nvm, node.js, and npm
Besides choosing whether to install on Windows or WSL, there are additional choices to make when installing Node.js. We recommend using a version manager as versions change very quickly. You will likely need to switch between multiple versions of Node.js based on the needs of different projects you're working on. Node Version Manager, more commonly called nvm, is the most popular way to install multiple versions of Node.js. We will walk through the steps to install nvm and then use it to install Node.js and Node Package Manager (npm).

>**Important**
>
>It is always recommended to remove any existing installations of Node.js or npm from your operating system before installing a version manager as the different types of >installation can lead to strange and confusing conflicts. For example, the version of Node that can be installed with Ubuntu's `apt-get` command is currently outdated. For help >with removing previous installations, see <a href="https://askubuntu.com/questions/786015/how-to-remove-nodejs-from-ubuntu-16-04">**How to remove nodejs from ubuntu**</a>.)

1. Open your Ubuntu 18.04 command line.

2. Install cURL (a tool used for downloading content from the internet in the command-line) with: `sudo apt-get install curl`

3. Install nvm, with: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`
    - **Note**: At the time of publication, NVM v0.35.3 was the most recent version available. You can check the GitHub project page for the latest release of NVM, and adjust the above command to include the newest version. Installing the newer version of NVM using cURL will replace the older one, leaving the version of Node you've used NVM to install intact. For example: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.36.0/install.sh | bash`

4. To verify installation, enter: `command -v nvm` ...this should return 'nvm', if you receive 'command not found' or no response at all, close your current terminal, reopen it, and try again. Learn more in the nvm github repo.

5. List which versions of Node are currently installed (should be none at this point): `nvm ls`

    <img src="https://docs.microsoft.com/en-us/windows/images/nvm-no-node.png" />
    
6. Install the current release of Node.js (for testing the newest feature improvements, but more likely to have issues): `nvm install node`

7. Install the latest stable LTS release of Node.js (recommended): `nvm install --lts`

8. List what versions of Node are installed: `nvm ls` ...now you should see the two versions that you just installed listed.

    <img src="https://docs.microsoft.com/en-us/windows/images/nvm-node-installed.png" />

9. Verify that Node.js is installed and the currently default version with: `node --version`. Then verify that you have npm as well, with: `npm --version` (You can also use `which node` or `which npm` to see the path used for the default versions).

10. To change the version of Node.js you would like to use for a project, create a new project directory `mkdir NodeTest`, and enter the directory `cd NodeTest`, then enter `nvm use node` to switch to the Current version, or `nvm use --lts` to switch to the LTS version. You can also use the specific number for any additional versions you've installed, like `nvm use v8.2.1`. (To list all of the versions of Node.js available, use the command: `nvm ls-remote`).

If you are using NVM to install Node.js and NPM, you should not need to use the SUDO command to install new packages.

## Install Visual Studio Code
To install VS Code and the Remote-WSL Extension:

1. <a href="https://code.visualstudio.com/">Download and install VS Code for Windows</a>. VS Code is also available for Linux, but Windows Subsystem for Linux does not support GUI apps, so we need to install it on Windows. Not to worry, you'll still be able to integrate with your Linux command line and tools using the Remote - WSL Extension.

2. Install the <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl">Remote - WSL Extension</a> on VS Code. This allows you to use WSL as your integrated development environment and will handle compatibility and pathing for you. <a href="https://code.visualstudio.com/docs/remote/remote-overview">Learn more</a>.

>**Important**
>
>If you already have VS Code installed, you need to ensure that you have the <a href="https://code.visualstudio.com/updates/v1_35">1.35 May release</a> or later in order to install the <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-wsl">Remote - WSL Extension</a>. We do not recommend using >WSL in VS Code without the Remote-WSL extension as you will lose support for auto-complete, debugging, linting, etc. Fun fact: This WSL extension is installed in $HOME/.vscode->server/extensions.

We recommend using Visual Studio Code with the <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack">Remote-development extension pack</a> for Node.js projects. This splits VS Code into a “client-server” architecture, with the client (the VS Code user interface) running on your Windows operating system and the server (your code, Git, plugins, etc) running "remotely" on your WSL Linux distribution.

>**Note**
>
>This “remote” scenario is a bit different than you may be accustomed to. WSL supports an actual Linux distribution where your project code is running, separately from your >Windows operating system, but still on your local machine. The Remote-WSL extension connects with your Linux subsystem as if it were a remote server, though it’s not running in >the cloud… it’s still running on your local machine in the WSL environment that you enabled to run alongside Windows.

  - Linux-based Intellisense and linting is supported.
  - Your project will automatically build in Linux.
  - You can use all your extensions running on Linux (<a href="https://marketplace.visualstudio.com/items?itemName=waderyan.nodejs-extension-pack">ES Lint, NPM Intellisense, ES6 snippets, etc.</a>).









