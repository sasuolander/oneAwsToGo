*** Settings ***
Library    SeleniumLibrary
Test Setup    Test Setup
Test Teardown    Close Browser

*** Variables ***

#${APP URL}    http://localhost:3002
#${BROWSER}    firefox
${APP TITLE}    OneAWStoGo    

*** Test Cases ***

Test Valid Login
    Input Text    username-field    username
    Input Text    password-field    password
    Click Element    login-submit
    Element Should Be Visible    template-dropdown
    Go To    ${APP_URL}/main
    Element Should Be Visible    template-dropdown

Test Login Without Credentials    
    Click Element    login-submit
    Title Should Be     OneAWStoGo
    Element Should Not Be Visible    template-dropdown

Test Login Without Password   
    Input Text    username-field    username
    Click Element    login-submit
    Element Should Not Be Visible    template-dropdown

Test Login Without Username 
    Input Text    password-field    password
    Click Element    login-submit
    Element Should Not Be Visible    template-dropdown   

Test Logout   
    Input Text    username-field    username
    Input Text    password-field    password
    Click Element    login-submit
    Element Should Be Visible    template-dropdown
    Click Element    logout-link
    Element Should Be Visible    username-field
    Go To    ${APP_URL}/main
    Element Should Not Be Visible    template-dropdown

Access App Without Login
    Go To    ${APP_URL}/main
    Element Should Not Be Visible    template-dropdown

# Also checks that user can change selected template
# TC-RU-1
Test Template Selection
    Input Text    username-field    username
    Input Text    password-field    password
    Click Element    login-submit
    Element Should Be Visible    template-dropdown
    Click Element    template-dropdown
    Click Element       xpath://ul/li[contains(text(),'Website in S3 bucket')]
    Page Should Contain Element    xpath://h3[contains(text(),'Website in S3 bucket')]
    Click Element    template-dropdown
    Click Element       xpath://ul/li[contains(text(),'Wordpress site')]
    Page Should Contain Element    xpath://h3[contains(text(),'Wordpress site')]

*** Keywords ***

Test Setup
    Open Browser    ${APP_URL}    ${BROWSER}
    Title Should Be    ${APP_TITLE}