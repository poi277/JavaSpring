package com.Messenger.Messenger.DTO;

import java.io.Serializable;

public class UserSessionDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private String id;
	private String role;

	public UserSessionDTO(String id, String role) {
		super();
		this.id = id;
		this.role = role;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	// 생성자, getter, setter
}
