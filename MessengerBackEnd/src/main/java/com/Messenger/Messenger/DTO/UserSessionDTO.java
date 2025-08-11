package com.Messenger.Messenger.DTO;

import java.io.Serializable;

public class UserSessionDTO implements Serializable {
	private static final long serialVersionUID = 1L;

	private String uuid;
	private String name;
	private String role;

	public UserSessionDTO(String uuid, String name, String role) {
		super();
		this.uuid = uuid;
		this.name = name;
		this.role = role;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}


	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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
