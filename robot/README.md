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




