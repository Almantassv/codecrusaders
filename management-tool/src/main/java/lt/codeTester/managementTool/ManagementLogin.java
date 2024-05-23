package lt.codeTester.managementTool;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class ManagementLogin extends BasePage{
    @FindBy(css = "[href='\\/login']")
    WebElement pressLoginButton;

    @FindBy(css = "[name='username']")
    WebElement inputName;
    @FindBy(css = "input#password")
    WebElement inputPassword;

    @FindBy(xpath = "/html//div[@id='root']//form/button[@type='submit']")
    WebElement pressLogin;

    @FindBy(css ="form .input-box:nth-child(2) .error-message")
    WebElement errorText;

    @FindBy(css = "h4")
    WebElement loggedUserName;

    public ManagementLogin(WebDriver driver) {
        super(driver);
    }

    public void pressLoginButtonOnNavBar(){
        pressLoginButton.click();
    }

    public void pasteNameToInput(String username) {
        inputName.sendKeys(username);
    }

    public void pastePasswordToInput(String userPassword) {
        inputPassword.sendKeys(userPassword);
    }

    public void pressLoginButton() {
        pressLogin.click();
    }

    public String alertMessageText() {
        return errorText.getText();
    }

    public String checkLoggedUserName() {
        return loggedUserName.getText();
    }


//    public String getErrorTextMessage() {
//        wait.until(ExpectedConditions.visibilityOf(errorText));
//        return errorText.getText();

}
