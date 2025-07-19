package com.dl.functionalInterface;

@FunctionalInterface
interface Signin{
	void login();
} 
class UserOne implements Signin{

	@Override
	public void login() {
		System.out.println("Login() method invoke");
	}
	
}
public class Eg5 {
	public static void main(String[] args) {
		//inheritance
		UserOne userOne = new UserOne();
		userOne.login();
		
		//polymorphism
		Signin in=new UserOne();
		in.login();
	}

}
