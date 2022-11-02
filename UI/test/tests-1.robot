*** Settings ***
Documentation     Inital UI testing using SeleniumLibrary.
Library           SeleniumLibrary
Library           ReactLibrary
Library           RESTLibrary

*** Variables ***
${MAIN URL}      http://localhost:3000
${BROWSER}        Chrome

*** Test Cases ***
Verify Login
    Open Browser To Login Page
    Welcome Page Should Be Open
    Input Text    username-field    'demo-user'
    Input Text    password-field    'password'
    Click Element    login-submit
    Title Should Be     OneAWStoGo

Verify Available Templates
    Make HTTP Request   get all templates   http://localhost:3000/api/templates  expectedResponseBody=${EXECDIR}/templates.json
   
Verify Deployment
    Title Should Be     OneAWStoGo
    Click Element       template-dropdown
    Click Element       xpath://ul/li[contains(text(),'Website in S3 bucket')] 
    Page Should Contain Element     xpath://h2[contains(text(), "Create an environment")]
    Input Text  formGroupExampleInput  test-s3-deployment
    Click Element       xpath://button[contains(text(),'Submit')]


*** Keywords ***
Open Browser To Login Page
    Open Browser    ${MAIN URL}    ${BROWSER}
    Title Should Be    OneAWStoGo

Submit Form  
    Click Button form-submit

Welcome Page Should Be Open
    Title Should Be    OneAWStoGo