package com.Messenger.Messenger.info;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class MessengerUser {
	@Id
	String id;
	String password;
	String name;
	@Column(unique = true)
	String uuid;
	@OneToMany(mappedBy = "messengerUser", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<MessagePost> posts = new ArrayList<>();
	MessengerUser() {
	}
	public MessengerUser(String id, String password, String name, String uuid) {
		super();
		this.id = id;
		this.password = password;
		this.name = name;
		this.uuid = uuid;
	}
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

}
