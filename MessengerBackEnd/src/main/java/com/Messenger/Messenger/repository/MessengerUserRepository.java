package com.Messenger.Messenger.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Messenger.Messenger.info.MessengerUser;

public interface MessengerUserRepository extends JpaRepository<MessengerUser, String> {
	Optional<MessengerUser> findByUuid(String uuid);
	Optional<MessengerUser> findByName(String name);
	boolean existsByUuid(String uuid);

}
