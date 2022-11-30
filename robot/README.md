First install Python, Robot Framework and SeleniumLibrary. Copy browser drivers of your choice in this folder.

Installation instructions at:
https://robotframework.org/
https://robotframework.org/SeleniumLibrary/

To run the tests:
1. Using a command line interface, change the working directory to this folder.
2. Run the following command: 
   robot --variable APP_URL:*url* --variable BROWSER:*browser* tests.robot

   NOTE: You need to replace *url* with your app URL and *browser* with the browser of your choice (without asterisks).

   For example, to run the test in localhost:3000 and in Firefox, one would run the following command:
   robot --variable APP_URL:http://localhost:3000 --variable BROWSER:firefox tests.robot

To run only one test use command:
- robot --variable APP_URL:*url* --variable BROWSER:*browser* -t *"Test name"* tests.robot

   - NOTE: some tests deploy to AWS but don't delete deployments. Deployment deletion tests are run after such deployment tests when running all of the tests. Thus when running tests manually one might need to delete AWS deployments manually.

   - For example, to run test for template selection in Chrome and in localhost:300 one would use the following command:
   robot  --variable APP_URL:http://localhost:3000 --variable BROWSER:chrome -t "Test Template Selection" tests.robot   
