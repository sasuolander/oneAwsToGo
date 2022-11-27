*** Settings ***
Library    SeleniumLibrary
Library    String
Library    Collections

Test Setup    Open Login Page
Test Teardown    Close Browser

*** Variables ***

${APP TITLE}    OneAWStoGo    

*** Test Cases ***

# Also checks that user can change selected template
# TC-RU-1
Test Template Selection
    Login
    Click Element    template-dropdown
    Click Element       xpath://ul/li[contains(text(),'Website in S3 bucket')]
    Page Should Contain Element    xpath://h3[contains(text(),'Website in S3 bucket')]
    Click Element    template-dropdown
    Click Element       xpath://ul/li[contains(text(),'Wordpress site')]
    Page Should Contain Element    xpath://h3[contains(text(),'Wordpress site')]

# Note this deploys to aws but doesen't delete
# TC-RU-4
Test Deployment
    Login
    Deploy S3 Template    test-s3-deployment
    Wait Until Element Is Visible    info-card

# Note the success of this test requires the success of TC-RU-4
# TC-RU-6
Test Duplicate Deployment Error
    Login
    Deploy S3 Template    test-s3-deployment
    Wait Until Element Is Visible    info-card
    Wait Until Element Contains    info-card    Error: Stack [test-s3-deployment] already exists

# Other test for errors
# TC-RU-6
Test Invalid Deployment Name
    Login
    Deploy S3 Template     $invalid-deployment-name
    Wait Until Element Is Visible    info-card
    Wait Until Element Contains    info-card    Error: 1 validation error detected:

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

# TC-RU-10
# This deletes specific deployment
Delete Deployment
    Login
    Deploy S3 Template    testDelete
    Wait For Deployment To Succeed
    ${id}    ${stackId}=    Get Deployment Ids
    Open My Environments Page
    Delete Deployment    ${id}
    Wait Until Page Contains    Successfully removed environment with id ${id}!    15m

# TC-RU-10
# Note this deletes every deployment even ones outside of test cases
Delete All Deployments
    Login
    Open My Environments Page
    @{id_list}=    Create List
    ${row_count}=    Get Element Count    xpath://tr
    FOR    ${index}    IN RANGE    1    ${row_count}
        ${current_id}    Get Text    xpath://table/tbody/tr[${index}]/td[1]
        Append To List    ${id_list}    ${current_id}
    END
    FOR    ${id}    IN    @{id_list}
        Delete Deployment    ${id}
    END    

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
    Click Element       xpath://button[contains(text(),'Create')]

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
    Sleep    5s
    [Arguments]    ${id}    ${name}    ${stackId}    ${status}=${None}    ${check_status}=${false}   
    ${to_find}=    Set Variable If    ${check_status}    ${id} ${name} ${stackId} ${status}    ${id} ${name} ${stackId}    
    ${row}=    Get WebElement    row-${id}  
    ${row_text}=    Get Text    ${row}    
    ${found}=    Evaluate    "${to_find}" in """${row_text}"""
    Should Be True    ${found}

Delete Deployment
    [Arguments]    ${id}
    ${del_btn_id}=    Catenate    SEPARATOR=-    remove    ${id}
    Click Button    ${del_btn_id}
    Sleep    1s
