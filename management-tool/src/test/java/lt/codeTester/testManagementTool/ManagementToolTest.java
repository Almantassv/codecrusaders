package lt.codeTester.testManagementTool;

import jdk.jfr.Description;
import lt.codeTester.managementTool.ManagementLogin;
import lt.codeTester.managementTool.ManagementRegister;
import lt.codeTester.managementTool.ManegementProject;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvFileSource;


public class ManagementToolTest extends BaseTest {

    @Description("Login with invalid credentials")
    @ParameterizedTest
    @CsvFileSource(files = "src/main/resources/Book1.csv", numLinesToSkip = 1)
    void loginPageTest(String username, String userPassword, String expextedMessage) {
        ManagementLogin loginPage = new ManagementLogin(driver);
        loginPage.pressLoginButtonOnNavBar();
        loginPage.pasteNameToInput(username);
        loginPage.pastePasswordToInput(userPassword);
        loginPage.pressLoginButton();
        String actualAlertMessage = loginPage.alertMessageText();
        Assertions.assertEquals(expextedMessage, actualAlertMessage);
//        String loggedUserName = loginPage.checkLoggedUserName();
//        Assertions.assertEquals(username, loggedUserName);

    }

    @ParameterizedTest
    @CsvFileSource(files = "src/main/resources/Reg1.csv", numLinesToSkip = 1)
    void registerToPage(String username, String userEmail, String userPassword) throws InterruptedException {
        ManagementRegister registerPage = new ManagementRegister(driver);
        registerPage.pressRegisterButtonOnNavBar();
        registerPage.registerInputName(username);
        registerPage.registerInputEmail(userEmail);
        registerPage.registerInputPassword(userPassword);
        registerPage.registerInputConfPass(userPassword);
        Thread.sleep(3000);
        registerPage.pressRegisterBtn();

    }

    @ParameterizedTest
    @CsvFileSource(files = "src/main/resources/Project.csv", numLinesToSkip = 1)
    void createProjects(String projectName, String projectDescription) throws InterruptedException {
        ManegementProject project = new ManegementProject(driver);
        project.pressLoginButtonOnNavBar();
        String username = "Frankie1";
        project.pasteNameToInput(username);
        String userPassword = "Frankie1";
        project.pastePasswordToInput(userPassword);
        project.pressLoginButton();

        project.navigateToProjectCreation();
        project.enterProjectName(projectName);
        project.enterProjectDescription(projectDescription);
        project.submitProject();
        System.out.println("Created " + projectName);

//        String alertMessage = handle.Alert();
    }
}