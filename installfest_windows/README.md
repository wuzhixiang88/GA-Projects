# Installfest (For Windows)

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

## Installing Git
Run the following commands in order in a WSL terminal.

- `sudo apt-get install git`

   >**Note**: You also may want to <a href="https://git-scm.com/download/win">**install Git for Windows**</a> if you haven't already.
- `git config --global credential.helper cache` This will cache your git credentials for a short time after you enter it.
- If you wish to extend the amount of time for which your git credentials are cached, run `nano ~/.gitconfig` and edit the line `helper = cache` to `helper = cache --timeout=86400`. The number after `--timeout=` refers to the cache duration in seconds, so the previous line would cache your credentials for 1 day.

## Git config file setup

To set up your Git config file, open a command line for the distribution you're working in and set your name with this command (replacing "Your Name" with your preferred username):

```
git config --global user.name "Your Name"
```

Set your email with this command (replacing "youremail<span>@</span>domain.com" with the email you prefer):
```
git config --global user.email "youremail@domain.com"
```

If you don't yet have a GitHub account, you can <a href="https://github.com/join">**sign-up for one on GitHub**</a>. If you've never worked with Git before, <a href="https://guides.github.com/">**GitHub Guides**</a> can help you get started. If you need to edit your Git config, you can do so with a built-in text editor like nano: `nano ~/.gitconfig`.

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

    <p><img src="https://docs.microsoft.com/en-us/windows/images/nvm-no-node.png" /></p>
    
6. Install the current release of Node.js (for testing the newest feature improvements, but more likely to have issues): `nvm install node`

7. Install the latest stable LTS release of Node.js (recommended): `nvm install --lts`

8. List what versions of Node are installed: `nvm ls` ...now you should see the two versions that you just installed listed.

    <p><img src="https://docs.microsoft.com/en-us/windows/images/nvm-node-installed.png" /></p>

9. Verify that Node.js is installed and the currently default version with: `node --version`. Then verify that you have npm as well, with: `npm --version` (You can also use `which node` or `which npm` to see the path used for the default versions).

10. To change the version of Node.js you would like to use for a project, create a new project directory `mkdir NodeTest`, and enter the directory `cd NodeTest`, then enter `nvm use node` to switch to the Current version, or `nvm use --lts` to switch to the LTS version. You can also use the specific number for any additional versions you've installed, like `nvm use v8.2.1`. (To list all of the versions of Node.js available, use the command: `nvm ls-remote`).

If you are using NVM to install Node.js and NPM, you should not need to use the SUDO command to install new packages.

## Install Visual Studio Code
To install VS Code and the Remote-Development Extension Pack:

1. <a href="https://code.visualstudio.com/">**Download and install VS Code for Windows**</a>. VS Code is also available for Linux, but Windows Subsystem for Linux does not support GUI apps, so we need to install it on Windows. Not to worry, you'll still be able to integrate with your Linux command line and tools using the Remote - WSL Extension.

2. Install the <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack">**Remote-Development Extension Pack**</a> on VS Code. This allows you to use WSL as your integrated development environment and will handle compatibility and pathing for you. The <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack">**Remote-Development Extension Pack**</a> includes three extensions. <a href="https://code.visualstudio.com/docs/remote/remote-overview">**Learn more**</a>.

    >**Important**
    >
    >If you already have VS Code installed, you need to ensure that you have the <a href="https://code.visualstudio.com/updates/v1_35">**1.35 May release**</a> or later in order to install the Remote - WSL Extension. We do not recommend using WSL in VS Code without the Remote - WSL extension as you will lose support for auto-complete, debugging, linting, etc.

    We recommend using Visual Studio Code with the <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack">**Remote-Development Extension Pack**</a> for Node.js projects. This splits VS Code into a “client-server” architecture, with the client (the VS Code user interface) running on your Windows operating system and the server (your code, Git, plugins, etc) running "remotely" on your WSL Linux distribution.

    >**Note**
    >
    >This “remote” scenario is a bit different than you may be accustomed to. WSL supports an actual Linux distribution where your project code is running, separately from your Windows operating system, but still on your local machine. The Remote-WSL extension connects with your Linux subsystem as if it were a remote server, though it’s not running in the cloud… it’s still running on your local machine in the WSL environment that you enabled to run alongside Windows.

    - Linux-based Intellisense and linting is supported.
    - Your project will automatically build in Linux.
    - You can use all your extensions running on Linux (<a href="https://marketplace.visualstudio.com/items?itemName=waderyan.nodejs-extension-pack">**ES Lint, NPM Intellisense, ES6 snippets, etc.**</a>).
      
## Open a remote folder or workspace
**FROM THE WSL TERMINAL**
      
Opening a folder inside the Windows Subsystem for Linux in VS Code is very similar to opening up a Windows folder from the command prompt or PowerShell.

1. Open a WSL terminal window (using the start menu item or by typing `wsl` from a command prompt / PowerShell).

2. Navigate to a folder you'd like to open in VS Code (including, but not limited to, Windows filesystem mounts like `/mnt/c`)

3. Type `code .` in the terminal. When doing this for the first time, you should see VS Code fetching components needed to run in WSL. This should only take a short while, and is only needed once.
    >**Note**: If this command does not work, you may need to restart your terminal or you may not have added VS Code to your path when it was installed.

4. After a moment, a new VS Code window will appear, and you'll see a notification that VS Code is opening the folder in WSL.
      
   <p><img src="https://code.visualstudio.com/assets/docs/remote/wsl/wsl-starting-notification.png" /></p>
     
   VS Code will now continue to configure itself in WSL and keep you up to date as it makes progress.
     
5. Once finished, you now see a WSL indicator in the bottom left corner, and you'll be able to use VS Code as you would normally!
     
   <p><img src="https://code.visualstudio.com/assets/docs/remote/wsl/wsl-statusbar-indicator.png" /><p>
  
That's it! Any VS Code operations you perform in this window will be executed in the WSL environment, everything from editing and file operations, to debugging, using terminals, and more.
  
**FROM VS CODE**

Alternatively, you can open a Remote WSL window directly from VS Code:

1. Start VS Code.
2. Press `F1`, select **Remote-WSL: New Window** for the default distro or **Remote-WSL: New Window using Distro** for a specific distro.
3. Use the File menu to open your folder.
  
If you already have a folder open, you can also use the **Remote-WSL: Reopen in WSL** command. You will be prompted which distro to use.

If you are in a WSL window and want to open the current input in a local window, use **Remote-WSL: Reopen in Windows**.
  
**FROM THE WINDOWS COMMAND PROMPT**

To open a WSL window directly from a Windows prompt use the `--remote` command line parameter:
  
`code --remote wsl+<distro name> <path in WSL>`
  
for example: `code --remote wsl+Ubuntu /home/jim/projects/c`

We need to do some guessing on whether the input path is a file or a folder. If it has a file extension, it is considered a file.
  
To force that a folder is opened, add slash to the path or use:
  
`code --folder-uri vscode-remote://wsl+Ubuntu/home/ubuntu/folder.with.dot`

To force that a file is opened add `--goto` or use:
  
`code --file-uri vscode-remote://wsl+Ubuntu/home/ubuntu/fileWithoutExtension`

## Opening a terminal in WSL
Opening a terminal in WSL from VS Code is simple. Once folder is opened in WSL, **any terminal window** you open in VS Code (**Terminal > New Terminal**) will automatically run in WSL rather than locally.

You can also use the `code` command line from this same terminal window to perform a number of operations such as opening a new file or folder in WSL. Type `code --help` to see what options are available from the command line.
  
<p><img src="https://code.visualstudio.com/assets/docs/remote/wsl/code-command-in-terminal.png" /></p>

## Managing extensions
VS Code runs extensions in one of two places: locally on the UI / client side, or in WSL. While extensions that affect the VS Code UI, like themes and snippets, are installed locally, most extensions will reside inside WSL.

If you install an extension from the Extensions view, it will automatically be installed in the correct location. Once installed, you can tell where an extension is installed based on the category grouping. There will be **Local - Installed** category and one for WSL.
  
<p><img src="https://code.visualstudio.com/assets/docs/remote/wsl/wsl-installed-remote-indicator.png" /></p>
<p><img src="https://code.visualstudio.com/assets/docs/remote/wsl/wsl-local-installed-extensions.png" /></p>

Local extensions that actually need to run remotely will appear dimmed and disabled in the **Local - Installed category**. Select **Install** to install an extension on your remote host.
  
<p><img src="https://code.visualstudio.com/assets/docs/remote/wsl/wsl-disabled-extensions.png" /></p>
  
You can also install all locally installed extensions inside WSL by going to the Extensions view and selecting **Install Local Extensions in WSL: [Name]** using the cloud button at the right of the **Local - Installed** title bar. This will display a dropdown where you can select which locally installed extensions to install in your WSL instance.
  
<p><img src="https://code.visualstudio.com/assets/docs/remote/wsl/install-all-extn-wsl.png" /></p>
  
## Helpful VS Code Extensions
While VS Code comes with many features for Node.js development out of the box, there are some helpful extensions to consider installing available in the <a href="https://marketplace.visualstudio.com/items?itemName=waderyan.nodejs-extension-pack">**Node.js Extension Pack**</a>. Install them all or pick and choose which seem the most useful to you.

To install the Node.js extension pack:

1. Open the **Extensions** window (Ctrl+Shift+X) in VS Code.

    The Extensions window is now divided into three sections (because you installed the Remote-WSL extension).
    - "Local - Installed": The extensions installed for use with your Windows operating system.
    - "WSL:Ubuntu-18.04-Installed": The extensions installed for use with your Ubuntu operating system (WSL).
    - "Recommended": Extensions recommended by VS Code based on the file types in your current project.

    <p><img src="https://docs.microsoft.com/en-us/windows/images/vscode-extensions-local-remote.png" /></p>
    
2. In the search box at the top of the Extensions window, enter: Node Extension Pack (or the name of whatever extension you are looking for). The extension will be installed for either your Local or WSL instances of VS Code depending on where you have the current project opened. You can tell by selecting the remote link in the bottom-left corner of your VS Code window (in green). It will either give you the option to open or close a remote connection. Install your Node.js extensions in the "WSL:Ubuntu-18.04" environment.

   <p><img src="https://docs.microsoft.com/en-us/windows/images/wsl-remote-extension.png" /></p>
   
A few additional extensions you may want to consider include:

- <a href="https://code.visualstudio.com/blogs/2016/02/23/introducing-chrome-debugger-for-vs-code">**Debugger for Chrome**</a>: Once you finish developing on the server side with Node.js, you'll need to develop and test the client side. This extension integrates your VS Code editor with your Chrome browser debugging service, making things a bit more efficient.
- <a href="https://marketplace.visualstudio.com/search?target=VSCode&category=Keymaps&sortBy=Relevance">**Keymaps from other editors**</a>: These extensions can help your environment feel right at home if you're transitioning from another text editor (like Atom, Sublime, Vim, eMacs, Notepad++, etc).
- <a href="https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync">**Settings Sync**</a>: Enables you to synchronize your VS Code settings across different installations using GitHub. If you work on different machines, this helps keep your environment consistent across them.

## VS Code as Git editor [OPTIONAL]
  
When you launch VS Code from the command line, you can pass the `--wait` argument to make the launch command wait until you have closed the new VS Code instance. This can be useful when you configure VS Code as your Git external editor so Git will wait until you close the launched VS Code instance.

Here are the steps to do so:
  
1. Make sure you can run `code --help` from the command line and you get help. If you do not see help, make sure you selected **Add to PATH** during the installation.
  
2. From the command line, run `git config --global core.editor "code --wait"`
  
Now you can run `git config --global -e` and use VS Code as editor for configuring Git.
  
## VS Code as Git diff tool [OPTIONAL]
  
Add the following to your Git configurations to use VS Code as the diff tool:
  
```
[diff]
    tool = default-difftool
[difftool "default-difftool"]
    cmd = code --wait --diff $LOCAL $REMOTE
```
  
This leverages the `--diff` option you can pass to VS Code to compare two files side by side.

To summarize, here are some examples of where you can use VS Code as the editor:
- `git rebase HEAD~3 -i` do interactive rebase using VS Code
- `git commit` use VS Code for the commit message
- `git add -p` followed by e for interactive add
- `git difftool <commit>^ <commit>` use VS Code as the diff editor for changes
