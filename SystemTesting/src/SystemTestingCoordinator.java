
import java.util.Random;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class SystemTesting2 {
	static String myName = "Edric";
	static String myEmail = "edricba@mymail.sutd.edu.sg";
	static String myPassword = "SUTD@Singapore";
	static String myType = "coordinator";
	static String[] Days = {"Monday", "Tuesday", "Wednesday", "Thursday", "Friday"};
	static int softconstraintsnum = 5;
	
	public static void main(String[] args) throws InterruptedException {		

		System.setProperty("webdriver.gecko.driver","C:\\Users\\edric\\Desktop\\geckodriver.exe");
		WebDriver driver = new FirefoxDriver();
		
		driver.get("http://localhost:4200/signup");
		//driver.get("http://10.12.23.219:4200/login");
		
		// get the user email and password field of the login page
		WebElement name = driver.findElement(By.name("name"));
		WebElement email = driver.findElement(By.name("email"));
		WebElement password = driver.findElement(By.name("password"));
		WebElement type = driver.findElement(By.name(myType));
		
		// send my email and password to fill in the fields
		name.sendKeys(myName);
		email.sendKeys(myEmail);
		password.sendKeys(myPassword);
		type.click();
		
		// locate the "login" button in the login page
		WebElement signup = driver.findElement(By.name("signup"));		
		signup.click();
		
		WebDriverWait wait = new WebDriverWait(driver, 10);
		wait.until(ExpectedConditions.elementToBeClickable(By.name("login")));
		
		WebElement logout = driver.findElement(By.name("logout"));		
		logout.click();

		System.out.println(3);
		
		wait = new WebDriverWait(driver, 10);
		wait.until(ExpectedConditions.elementToBeClickable(By.name("learnmore")));
		
		WebElement signUpPage = driver.findElement(By.name("signuppage"));		
		signUpPage.click();
		
		wait = new WebDriverWait(driver, 10);
		wait.until(ExpectedConditions.elementToBeClickable(By.name("signup")));
		
		name = driver.findElement(By.name("name"));
		email = driver.findElement(By.name("email"));
		password = driver.findElement(By.name("password"));
		type = driver.findElement(By.name(myType));
		
		name.sendKeys(myName);
		email.sendKeys(myEmail);
		password.sendKeys(myPassword);
		type.click();
		
		WebElement signup1 = driver.findElement(By.name("signup"));
		
		signup1.click();
		
		try {
			wait = new WebDriverWait(driver, 10);
			wait.until(ExpectedConditions.elementToBeClickable(By.name("login")));		
		} catch (Exception NoSuchElementException) {
			System.out.println("sign up fails");
		}
		
		WebElement loginPage = driver.findElement(By.name("loginpage"));
		loginPage.click();
		
		wait = new WebDriverWait(driver, 10);
		wait.until(ExpectedConditions.elementToBeClickable(By.name("login")));
		
		email = driver.findElement(By.name("email"));
		password = driver.findElement(By.name("password"));
		
		System.out.println(myEmail);
		Thread.sleep(100);
		email.sendKeys(myEmail);
		password.sendKeys(myPassword);
		
		WebElement login = driver.findElement(By.name("login"));
		login.click();
		
		try {
			WebElement viewschedbutton = driver.findElement(By.name("viewschedule"));
			viewschedbutton.click();
			
			WebElement genschedbutton = driver.findElement(By.name("generateschedulepage"));
			genschedbutton.click();
			
			try {
				wait = new WebDriverWait(driver, 10);
				wait.until(ExpectedConditions.elementToBeClickable(By.name("courseId")));
			}
			catch (Exception NoSuchElementException){
				System.out.println("access denied");
			}
		} catch (Exception NoSuchElementException) {
			System.out.println("login name invalid");
		}
	}
}
