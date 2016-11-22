# d2-ui-dist
As npm is capable of pulling stuff from github, we are using this as a workaround to create a npm registry and host the artifact.  
All this repo has is transpiled d2-ui, there is no devlopment happening in this repo.  
Transpile msf-oca-his/d2-ui/ (es5Compatibility branch) and place the lib output folder in this repo and commit.  
Do npm install in the custom app repos and they should get the latest lib from here.  
