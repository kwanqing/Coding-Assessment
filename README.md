## Progress: Describe the tasks you've completed, highlighting each enhancement and refactoring

-  I have used the Composition API's setup function to handle the logic.
- The data, methods, and computed from Vue 2 have been replaced by ref, computed, and normal functions inside setup.
- Moved all the methods inside the setup function for clarity.
- Used the value property of refs when accessing or modifying their values.
- I have removed the methods object since we're now defining functions directly inside setup
- I am able to complete all the tasks above except for creating manageable single functionality components. 
- I tried to work on the implementation of search bar to filter rows based on specific criteria, but due to time constraint, I am not able to finish it. 


### Decisions: Explain the reasoning behind your code choices, technologies used, and any challenges faced
- Install the Vue 3 plugin for Vite
- Update your Vite configuration:
- Replace @vitejs/plugin-vue2 with @vitejs/plugin-vue and update the plugins array 
- Challenges that I faced is that I am actually a novice in Vue.js so it took me some time to get familiar with it.

### Local Setup: Provide step-by-step instructions on how to run the application locally.
- First of all, I duplicated the repository from the link given and mirrored it to my repository. 

```sh
git clone https://github.com/rayyach/dashboard-sla.git
cd REPOSITORY-TO-MIRROR
git remote set-url --push origin https://github.com/kwanqing/Coding-Assessment.git
git fetch -p origin
git push --mirror
```

- Next, basically just open the folder in vs code and work on it and commit to the github
```sh
git status              // check the status for example, which branch are you on right now, what files have been modified and so on.
git add --all           // add all the changes to update what will be commited \
git commit -m "message" // goi
git push origin main
```

- Another option is to use github desktop which is be more straight forward but I am more used to use command line for this. 

