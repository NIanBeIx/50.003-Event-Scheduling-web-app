package mypackage;

import java.util.ArrayList;
import java.util.List;

public class test {
	public static void main(String[] args) {
		List<Room> roomListA = new ArrayList<Room>();
		List<Room> roomListB = new ArrayList<Room>();
		
		roomListA.add(new Room("1", "testName", 50));
		roomListA.add(new Room("2", "testName", 50));
		roomListA.add(new Room("3", "testName", 50));
		
		for (Room room: roomListA) {
			roomListB.add(room);
			room.setCapacity(10);
		}
		
		for (Room room: roomListB) {
			System.out.println(room.getCapacity());
		}
	}
}
