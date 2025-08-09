package com.Messenger.Messenger.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Messenger.Messenger.info.MessengerUser;

public interface MessengerUserRepository extends JpaRepository<MessengerUser, String> {

}
