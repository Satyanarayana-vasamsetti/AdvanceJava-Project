package com.dl.doublecolon;

interface StudentIn{
	Student id(int id,String name);
}
class Student{
	public Student(int id,String name) {
		System.out.println(id +" "+ name);
	}
}
public class Eg4 {
	public static void main(String[] args) {
		StudentIn ref = Student::new;
		ref.id(1,"Bunny");
		ref.id(2, "Satya");
	}
}
