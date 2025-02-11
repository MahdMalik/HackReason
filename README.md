Autis(CASP) is a friendly, easy-to-use AI chatbot that gives people 24/7 access to a autism screening tool 
to best estimate their case of autism and where they lie on the spectrum based on 7 criteria 
as outlines by "The Diagnostic and Statistical Manual of Mental Disorders, Fifth Edition".

To run this repository:  
To run, install next.js, pull the github repo to a repository, 
and run "npm install @mui/material @emotion/react @emotion/styled @mui/icons-material @google/generative-ai" and other dependencies.

Now, run "pip install flask" and "pip install flask-cors" and then the python file sCaspHandler.py 
(one way to do this is to navigate to the file, and click the run button at the top right in vs code).

Next, run "npm run dev" in the terminal, and open localhost.[http://localhost:3000/]

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

Note: If using windows, it may be needed to install WSL, and then install ciao and s(CASP) into WSL, because the python code relies on running s(CASP) commands from the terminal.

Update Note: Currently, the website has all the features, but it takes time (approx. 5-10 sec)
