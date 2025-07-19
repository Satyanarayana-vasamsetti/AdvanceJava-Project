package com.dl.defaultmethod;
interface A{
	default void m1() {
		System.out.println("default method ");
	}
}
public class Eg1 implements A{
	@Override
	public void m1() {
		System.out.println("Override");
	}
	public static void main(String[] args) {
		A eg1 = new Eg1();
		eg1.m1();
	}
}
