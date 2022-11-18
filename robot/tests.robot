*** Settings ***
Library    SeleniumLibrary
Library    String

Test Setup    Open Login Page
Test Teardown    Close Browser

*** Variables ***

${APP TITLE}    OneAWStoGo    

*** Test Cases ***

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

# Note this deploys to aws but doesen't delete
# TC-RU-4
Test Deployment
    Input Text    username-field    username
    Input Text    password-field    password
    Click Element    login-submit
    Element Should Be Visible    template-dropdown
    Click Element       template-dropdown
    Click Element       xpath://ul/li[contains(text(),'Website in S3 bucket')] 
    Page Should Contain Element     xpath://h2[contains(text(), "Create an environment")]
    Input Text  formGroupExampleInput  test-s3-deployment
    Click Element       xpath://button[contains(text(),'Submit')]
    Wait Until Element Is Visible    info-card

# Note the success of this test requires the success of TC-RU-4
# TC-RU-6
Test Duplicate Deployment Error
    Input Text    username-field    username
    Input Text    password-field    password
    Click Element    login-submit
    Element Should Be Visible    template-dropdown
    Click Element       template-dropdown
    Click Element       xpath://ul/li[contains(text(),'Website in S3 bucket')] 
    Page Should Contain Element     xpath://h2[contains(text(), "Create an environment")]
    Input Text  formGroupExampleInput  test-s3-deployment
    Click Element       xpath://button[contains(text(),'Submit')]
    Page Should Contain Element    info-card
    Wait Until Element Is Visible    info-card
    Element Should Be Visible    info-card
    Element Should Contain    info-card    Error: Stack [test-s3-deployment] already exists

# TC-RU-11
Verify Deployment From UI
    Login
    ${deployment_name}=    Generate Random String    8    [LETTERS]
    Deploy S3 Template    ${deployment_name}
    Wait For Deployment To Succeed
    ${id}    ${stackId}=    Get Deployment Ids
    Open My Environments Page
    Find Deployment    ${id}    ${deployment_name}    ${stackId}


# TC-RU-8
Verify Completed Creation From UI 
    Login
    ${deployment_name}=    Generate Random String    8    [LETTERS]
    Deploy S3 Template    ${deployment_name}
    Wait For Deployment To Succeed
    ${id}    ${stackId}=    Get Deployment Ids
    Open My Environments Page
    Find Deployment    ${id}    ${deployment_name}    ${stackId}    CREATE_COMPLETE    ${true}

*** Keywords ***

Open Login Page
    Open Browser    ${APP_URL}    ${BROWSER}
    Title Should Be    ${APP_TITLE}

Login    
    Input Text    username-field    username
    Input Text    password-field    password
    Click Element    login-submit
    Element Should Be Visible    template-dropdown

Wait For Deployment To Succeed
    Wait Until Element Is Visible    info-card
    Wait Until Element Contains    info-card    Successfully created an environment    15m

Deploy S3 Template
    [Arguments]    ${deployment_name}
    Click Element       template-dropdown
    Click Element       xpath://ul/li[contains(text(),'Website in S3 bucket')]
    Input Text          formGroupExampleInput  ${deployment_name}
    Click Element       xpath://button[contains(text(),'Submit')]

Get Deployment Ids
    ${text}=    Get Text    info-card    
    ${parts1}=    Split String    ${text}    and stackId
    ${parts2}=    Split String    ${parts1}[0]    id
    ${id}=    Strip String    ${parts2}[1]
    ${stackId}=    Strip String    ${parts1}[1]
    RETURN    ${id}    ${stackid}   

Open My Environments Page     
    Click Element    envs-link
    Element Should Be Visible    my-envs-title

Find Deployment
    [Arguments]    ${id}    ${name}    ${stackId}    ${status}=${None}    ${check_status}=${false}   
    ${to_find}=    Set Variable If    ${check_status}    ${id} ${name} ${stackId} ${status}    ${id} ${name} ${stackId}    
    ${trows}=    Get WebElements   xpath://tbody/tr
    ${found}=    Set Variable    ${false}
    FOR    ${trow}    IN    @{trows}
        ${row_text}=    Get Text    ${trow}
        ${found}=    Evaluate    "${to_find}" in """${row_text}"""
        Exit For Loop If    ${found} == ${true} 
    END
    Should Be True    ${found}