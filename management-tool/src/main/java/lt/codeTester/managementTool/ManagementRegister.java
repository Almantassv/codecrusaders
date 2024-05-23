package lt.codeTester.managementTool;

import org.openqa.selenium.Alert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.ExpectedConditions;

public class ManagementRegister extends ManagementLogin {
    @FindBy(xpath = "//div[@id='root']//nav[@class='navbar']//a[@href='/register']")
    WebElement pressRegister;

    @FindBy(xpath = "/html//input[@id='username']" )
    WebElement inputName;

    @FindBy(xpath = "/html//input[@id='email']" )
    WebElement inputEmail;

    @FindBy(xpath = "/html//input[@id='password']")
    WebElement inputPassword;

    @FindBy(xpath = "/html//input[@id='confirmPassword']")
    WebElement inputConfPass;

    @FindBy(xpath = "/html//div[@id='root']//form/button[@type='submit']")
    WebElement pressRegisterBtn;

    public ManagementRegister(WebDriver driver) {
        super(driver);
    }
    public void pressRegisterButtonOnNavBar() {
        pressRegister.click();
    }
    public void registerInputName(String username) {
        inputName.sendKeys(username);
    }
    public void registerInputEmail(String userEmail) {
        inputEmail.sendKeys(userEmail);
    }

    public void registerInputPassword(String userPassword) {
        inputPassword.sendKeys(userPassword);
    }

    public void registerInputConfPass(String userPassword) {
        inputConfPass.sendKeys(userPassword);
    }

    public void pressRegisterBtn() {
        pressRegisterBtn.click();
    }


}
