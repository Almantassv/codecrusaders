package lt.codeTester.managementTool;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class ManegementProject extends ManagementRegister{


    @FindBy(css = ".new-project-btn")
    WebElement createNewProjectButton;

    @FindBy(css = "input")
    WebElement projectName;

    @FindBy(css = "textarea")
    WebElement projectDescription;

    @FindBy(css = ".form-container > button[type='submit']")
    WebElement submitProjectBtn;
    public ManegementProject(WebDriver driver) {
        super(driver);
    }


    public void navigateToProjectCreation() {
        createNewProjectButton.click();
    }

    public void enterProjectName(String name) {
        projectName.sendKeys(name);
    }

    public void enterProjectDescription(String description) {
        projectDescription.sendKeys(description);
    }

    public void submitProject() {
        submitProjectBtn.click();
    }
}
