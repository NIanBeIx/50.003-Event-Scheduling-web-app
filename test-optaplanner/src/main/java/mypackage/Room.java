package mypackage;
import java.util.Arrays;

public class Room {
	private String roomId;
	private String roomName;
	private int capacity;
	private String roomType;
	
	public Room() {}
	
	public Room(String roomId, String roomName, int capacity) {
		this.roomId = roomId;
		this.roomName = roomName;
		this.capacity = capacity;

	}
	
	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}
	
	public void setRoomId(String roomId) {
		this.roomId = roomId;
	}
	
	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}
	
	public void setRoomType(String roomType) {
		this.roomType = roomType;
	}
	
	public String getRoomId() {
		return roomId;
	}
	
	public String getRoomName() {
		return roomName;
	}	
	
	public int getCapacity() {
		return capacity;
	}
	
	public String getRoomType() {
		return roomType;
	}
	
}
