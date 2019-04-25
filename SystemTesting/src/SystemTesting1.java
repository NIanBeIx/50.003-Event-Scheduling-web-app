
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

public class SystemTesting1 {
	static String myName = "Edric";
	static String myEmail = "edricxy@mymail.sutd.edu.sg";
	static String myPassword = "SUTD@Singapore";
	static String myType = "instructor";
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
		wait.until(ExpectedConditions.elementToBeClickable(By.name("logout")));
		
		WebElement logout = driver.findElement(By.name("logout"));		
		logout.click();
		
		signup = driver.findElement(By.className("signup"));
		
		name = driver.findElement(By.name("name"));
		email = driver.findElement(By.name("email"));
		password = driver.findElement(By.name("password"));
		type = driver.findElement(By.name(myType));
		
		try {
			wait = new WebDriverWait(driver, 10);
			wait.until(ExpectedConditions.elementToBeClickable(By.name("message")));		
			System.out.println(1);	
		} catch (Exception NoSuchElementException) {
			System.out.println("login name invalid");
		}
		
		WebElement softconbutton = driver.findElement(By.name("softconstraints"));
		softconbutton.click();
		
		wait = new WebDriverWait(driver, 10);
		wait.until(ExpectedConditions.elementToBeClickable(By.id("MondayPeriod1")));
		
		Random rand = new Random();
		int num = rand.nextInt(softconstraintsnum);
		for (int i = 0; i < num; i++) {
			int value = rand.nextInt(24) + 1;
			int day = rand.nextInt(5);
			String softconstraintsid = Days[day] + "Period" + Integer.toString(value);
			System.out.println(softconstraintsid);
			WebElement softcon = driver.findElement(By.id(softconstraintsid));
			softcon.click();
		}
		
		WebElement send = driver.findElement(By.name("send"));
		send.click();
		
		WebElement viewschedbutton = driver.findElement(By.name("viewschedule"));
		viewschedbutton.click();
		
		
		//explicitly wait until the password field is present in the page
		/*try {
			WebDriverWait wait = new WebDriverWait(driver, 10);
			// wait only until the password element becomes visible
			wait.until(ExpectedConditions.elementToBeClickable(By.name("password")));		
			// now locate the password field in the current page
			WebElement password = driver.findElement(By.name("password"));		
			// send password 
			password.sendKeys(myPassword);
			// login and :)
			nextButton = driver.findElement(By.id("passwordNext"));		
			nextButton.click();
		} catch (Exception NoSuchElementException) {
			System.out.println("login name invalid");
		}*/
	}
}
