package com.dl.functionalInterface;

@FunctionalInterface
interface login{
	void log();
}
public class Eg6 {
	public static void main(String[] args) {
		login login = new login() {
			
			@Override
			public void log() {
				System.out.println("Login() method invoke");
				
			}
		};
		login.log();
	}
}
